package com.minh.customer.service;

import com.minh.constants.CoreMessageCode;
import com.minh.customer.data.entity.UserAddress;
import com.minh.customer.data.repository.UserAddressRepository;
import com.minh.customer.viewmodel.address.ActiveAddressVm;
import com.minh.customer.viewmodel.address.AddressDetailVm;
import com.minh.customer.viewmodel.address.AddressPostVm;
import com.minh.customer.viewmodel.address.AddressVm;
import com.minh.customer.viewmodel.useraddress.UserAddressVm;
import com.minh.exception.BusinessException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserAddressService {
    private final UserAddressRepository userAddressRepository;
    private final LocationService locationService;

    public UserAddressService(UserAddressRepository userAddressRepository, LocationService locationService) {
        this.userAddressRepository = userAddressRepository;
        this.locationService = locationService;
    }

    public List<ActiveAddressVm> getUserAddressList() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        if (userId.equals("anonymousUser")) {
            throw new BusinessException(CoreMessageCode.UNAUTHENTICATED);
        }

        List<UserAddress> userAddressList = userAddressRepository.findAllByUserId(userId);
        List<AddressDetailVm> addressVmList = locationService.getAddressesByIdList(
                userAddressList.stream().map(UserAddress::getAddressId).collect(Collectors.toList()));

        List<ActiveAddressVm> addressActiveVms = userAddressList.stream().flatMap(userAddress -> addressVmList.stream()
                        .filter(addressDetailVm -> userAddress.getAddressId().equals(addressDetailVm.id())).map(
                                addressDetailVm -> new ActiveAddressVm(addressDetailVm.id(), addressDetailVm.contactName(),
                                        addressDetailVm.phone(), addressDetailVm.addressLine1(), addressDetailVm.city(),
                                        addressDetailVm.zipCode(), addressDetailVm.districtId(), addressDetailVm.districtName(),
                                        addressDetailVm.stateOrProvinceId(), addressDetailVm.stateOrProvinceName(),
                                        addressDetailVm.countryId(), addressDetailVm.countryName(), userAddress.getIsActive())))
                .toList();

        //sort by isActive
        Comparator<ActiveAddressVm> comparator = Comparator.comparing(ActiveAddressVm::isActive).reversed();
        return addressActiveVms.stream().sorted(comparator).collect(Collectors.toList());
    }

    public AddressDetailVm getAddressDefault() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        if (userId.equals("anonymousUser")) {
            throw new BusinessException(CoreMessageCode.UNAUTHENTICATED);
        }

        UserAddress userAddress = userAddressRepository.findByUserIdAndIsActiveTrue(userId)
                .orElseThrow(() -> new BusinessException(CoreMessageCode.USER_ADDRESS_NOT_FOUND));

        return locationService.getAddressById(userAddress.getAddressId());
    }

    public UserAddressVm createAddress(AddressPostVm addressPostVm) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        // Fetch all existing addresses for the user
        List<UserAddress> userAddressList = userAddressRepository.findAllByUserId(userId);
        boolean isFirstAddress = userAddressList.isEmpty();

        AddressVm addressGetVm = locationService.createAddress(addressPostVm);
        UserAddress userAddress =
                UserAddress.builder().userId(userId).addressId(addressGetVm.id()).isActive(isFirstAddress).build();

        return UserAddressVm.fromModel(userAddressRepository.save(userAddress), addressGetVm);

    }

    public void deleteAddress(Long id) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        UserAddress userAddress = userAddressRepository.findOneByUserIdAndAddressId(userId, id);
        if (userAddress == null) {
            throw new BusinessException(CoreMessageCode.USER_ADDRESS_NOT_FOUND);
        }
        userAddressRepository.delete(userAddress);
    }

    public void chooseDefaultAddress(Long id) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        List<UserAddress> userAddressList = userAddressRepository.findAllByUserId(userId);
        for (UserAddress userAddress : userAddressList) {
            userAddress.setIsActive(Objects.equals(userAddress.getAddressId(), id));
        }
        userAddressRepository.saveAll(userAddressList);
    }
}
