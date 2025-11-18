package com.minh.customer.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minh.constants.CoreMessageCode;
import com.minh.customer.configuration.KeycloakPropsConfig;
import com.minh.customer.data.vo.ApplicantProfileVo;
import com.minh.customer.data.vo.AuthenticationVo;
import com.minh.customer.data.vo.CustomerVo;
import com.minh.customer.data.vo.ProviderProfileVo;
import com.minh.customer.feign.ApplicantProfileFeign;
import com.minh.customer.feign.ProviderProfileFeign;
import com.minh.customer.viewmodel.customer.*;
import com.minh.exception.BusinessException;
import com.minh.model.ApiResponse;
import com.minh.model.dto.profile.ProviderProfileDto;
import com.minh.service.base.BaseService;
import com.minh.utils.SecurityUtil;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.ForbiddenException;
import jakarta.ws.rs.core.Response;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.validator.routines.EmailValidator;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Collections;
import java.util.List;

@Service
public class CustomerService extends BaseService {

    private static final String ERROR_FORMAT = "%s: Client %s don't have access right for this resource";
    private static final int USER_PER_PAGE = 10;
    private static final String GUEST = "GUEST";
    private final Keycloak keycloak;
    private final KeycloakPropsConfig keycloakPropsConfig;

    @Autowired
    private ApplicantProfileFeign profileFeign;
    @Autowired
    private ProviderProfileFeign providerFeign;
    @Autowired

    public CustomerService(Keycloak keycloak, KeycloakPropsConfig keycloakPropsConfig) {
        this.keycloak = keycloak;
        this.keycloakPropsConfig = keycloakPropsConfig;
    }

    public static CredentialRepresentation createPasswordCredentials(String password) {
        CredentialRepresentation passwordCredentials = new CredentialRepresentation();
        passwordCredentials.setTemporary(false);
        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
        passwordCredentials.setValue(password);
        return passwordCredentials;
    }

    public CustomerListVm getCustomers(int pageNo) {
        try {
            List<CustomerAdminVm> result = keycloak.realm(keycloakPropsConfig.getRealm()).users()
                    .search(null, pageNo * USER_PER_PAGE, USER_PER_PAGE).stream()
                    .filter(UserRepresentation::isEnabled)
                    .map(CustomerAdminVm::fromUserRepresentation)
                    .toList();
            int totalUser = result.size();

            return new CustomerListVm(totalUser, result, (totalUser + USER_PER_PAGE - 1) / USER_PER_PAGE);
        } catch (ForbiddenException exception) {
            throw new AccessDeniedException(
                    String.format(ERROR_FORMAT, exception.getMessage(), keycloakPropsConfig.getResource()));
        }
    }

    @Transactional(rollbackOn = Exception.class)
    public void updateCustomer(String id, CustomerProfileRequestVm requestVm) {
        UserRepresentation userRepresentation =
                keycloak.realm(keycloakPropsConfig.getRealm()).users().get(id).toRepresentation();
        if (userRepresentation != null) {
            userRepresentation.setFirstName(requestVm.firstName());
            userRepresentation.setLastName(requestVm.lastName());
            userRepresentation.setEmail(requestVm.email());
            RealmResource realmResource = keycloak.realm(keycloakPropsConfig.getRealm());
            UserResource userResource = realmResource.users().get(id);
            userResource.update(userRepresentation);
        } else {
            throw new BusinessException(CoreMessageCode.USER_NOT_FOUND);
        }
    }

    @Transactional(rollbackOn = Exception.class)
    public void deleteCustomer(String id) {
        UserRepresentation userRepresentation =
                keycloak.realm(keycloakPropsConfig.getRealm()).users().get(id).toRepresentation();
        if (userRepresentation != null) {
            RealmResource realmResource = keycloak.realm(keycloakPropsConfig.getRealm());
            UserResource userResource = realmResource.users().get(id);
            userRepresentation.setEnabled(false);
            userResource.update(userRepresentation);
        } else {
            throw new BusinessException(CoreMessageCode.USER_NOT_FOUND);
        }
    }

    public CustomerAdminVm getCustomerByEmail(String email) {
        try {
            if (EmailValidator.getInstance().isValid(email)) {
                List<UserRepresentation> searchResult =
                        keycloak.realm(keycloakPropsConfig.getRealm()).users().search(email, true);
                if (searchResult.isEmpty()) {
                    throw new BusinessException(CoreMessageCode.USER_WITH_EMAIL_NOT_FOUND);
                }
                return CustomerAdminVm.fromUserRepresentation(searchResult.getFirst());
            } else {
                throw new BusinessException(CoreMessageCode.WRONG_EMAIL_FORMAT);
            }
        } catch (ForbiddenException exception) {
            throw new AccessDeniedException(
                    String.format(ERROR_FORMAT, exception.getMessage(), keycloakPropsConfig.getResource()));
        }
    }

    public CustomerVm getCustomerById(String userId) {
        return CustomerVm.fromUserRepresentation(
                keycloak.realm(keycloakPropsConfig.getRealm()).users().get(userId).toRepresentation());
    }

    public CustomerVo getCustomerProfile(String userId) {
        try {
            CustomerVo vo = new CustomerVo();

            CustomerVm customerVm = CustomerVm.fromUserRepresentation(
                    keycloak.realm(keycloakPropsConfig.getRealm()).users().get(userId).toRepresentation());
            vo.setCustomer(customerVm);

            ApplicantProfileVo profileVo = this.parseResponse(profileFeign.getOneByUserId(userId));
            vo.setApplicantProfile(profileVo);
            return vo;
        } catch (ForbiddenException exception) {
            throw new AccessDeniedException(
                    String.format(ERROR_FORMAT, exception.getMessage(), keycloakPropsConfig.getResource()));
        }
    }

    @Transactional(rollbackOn = Exception.class)
    public GuestUserVm createGuestUser() {
        // Get realm
        RealmResource realmResource = keycloak.realm(keycloakPropsConfig.getRealm());
        String randomGuestName = generateSafeString();
        String guestUserEmail = randomGuestName + "_guest@yas.com";
        CredentialRepresentation credential = createPasswordCredentials(GUEST);

        // Define user
        UserRepresentation user = new UserRepresentation();
        user.setUsername(guestUserEmail);
        user.setFirstName(GUEST);
        user.setLastName(randomGuestName);
        user.setEmail(guestUserEmail);
        user.setCredentials(Collections.singletonList(credential));
        user.setEnabled(true);
        Response response = realmResource.users().create(user);

        // get new user
        String userId = CreatedResponseUtil.getCreatedId(response);
        UserResource userResource = realmResource.users().get(userId);
        RoleRepresentation guestRealmRole = realmResource.roles().get(GUEST).toRepresentation();

        // Assign realm role GUEST to user
        userResource.roles().realmLevel().add(Collections.singletonList(guestRealmRole));

        return new GuestUserVm(userId, guestUserEmail, GUEST);
    }

    private String generateSafeString() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[12];
        random.nextBytes(bytes);
        Base64.Encoder encoder = Base64.getUrlEncoder().withoutPadding();
        return encoder.encodeToString(bytes);
    }

    @Transactional(rollbackOn = Exception.class)
    public CustomerVm create(CustomerPostVm customerPostVm) {
        // Get realm
        RealmResource realmResource = keycloak.realm(keycloakPropsConfig.getRealm());

        if (checkUsernameExists(realmResource, customerPostVm.username())) {
            throw new BusinessException(CoreMessageCode.USERNAME_ALREADY_EXITED);
        }
        if (checkEmailExists(realmResource, customerPostVm.email())) {
            throw new BusinessException(CoreMessageCode.USER_WITH_EMAIL_ALREADY_EXITED);
        }

        // Define user
        UserRepresentation user = new UserRepresentation();
        user.setUsername(customerPostVm.username());
        user.setFirstName(customerPostVm.firstName());
        user.setLastName(customerPostVm.lastName());
        user.setEmail(customerPostVm.email());
        CredentialRepresentation credential = createPasswordCredentials(customerPostVm.password());
        user.setCredentials(Collections.singletonList(credential));
        user.setEnabled(true);
        Response response = realmResource.users().create(user);

        // get new user
        String userId = CreatedResponseUtil.getCreatedId(response);
        UserResource userResource = realmResource.users().get(userId);

        // Assign realm role to user
        RoleRepresentation realmRole = realmResource.roles().get(customerPostVm.role()).toRepresentation();
        userResource.roles().realmLevel().add(Collections.singletonList(realmRole));

        return CustomerVm.fromUserRepresentation(user);
    }

    private boolean checkUsernameExists(RealmResource realmResource, String username) {
        // Search for users by username
        List<UserRepresentation> users = realmResource.users().search(username, true);
        return !users.isEmpty();
    }

    private boolean checkEmailExists(RealmResource realmResource, String email) {
        // Search for users by email
        List<UserRepresentation> users = realmResource.users().search(null, null, null, email, 0, 1);
        return !users.isEmpty();
    }

    @Transactional(rollbackOn = Exception.class)
    public CustomerVo createCustomerProfile(CustomerVo customerVo) {
        profileFeign.create(customerVo.getApplicantProfile());
        return customerVo;
    }

    @Transactional(rollbackOn = Exception.class)
    public CustomerVo updateCustomerProfile(CustomerVo customerVo) {
        profileFeign.update(customerVo.getApplicantProfile());
        return customerVo;
    }

    @Transactional(rollbackOn = Exception.class)
    public CustomerVo createProviderProfile(CustomerVo profile, MultipartFile logo, MultipartFile banner) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        ProviderProfileDto providerProfileDto = this.parseResponse(providerFeign.create(objectMapper.writeValueAsString(profile.getProviderProfile()), logo, banner));
        return profile;
    }

    @Transactional(rollbackOn = Exception.class)
    public CustomerVo updateProviderProfile(CustomerVo customerVo, MultipartFile logo, MultipartFile banner) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        providerFeign.update(objectMapper.writeValueAsString(customerVo.getProviderProfile()), logo, banner);
        return customerVo;
    }

    public CustomerVo getProviderProfile() {
        CustomerVo vo = new CustomerVo();
        ProviderProfileVo providerProfileVo = this.parseResponse(providerFeign.getMyProviderInfo());
        vo.setProviderProfile(providerProfileVo);
        return vo;
    }
}
