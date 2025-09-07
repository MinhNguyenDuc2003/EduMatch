package com.minh.location.service;

import com.minh.exception.BusinessException;
import com.minh.location.data.entity.StateOrProvince;
import com.minh.location.data.mapper.StateOrProvinceMapper;
import com.minh.location.data.repository.CountryRepository;
import com.minh.location.data.repository.StateOrProvinceRepository;
import com.minh.location.viewmodel.stateorprovince.StateOrProvinceAndCountryGetNameVm;
import com.minh.location.viewmodel.stateorprovince.StateOrProvinceListGetVm;
import com.minh.location.viewmodel.stateorprovince.StateOrProvincePostVm;
import com.minh.location.viewmodel.stateorprovince.StateOrProvinceVm;
import com.minh.model.ApiMessageCore;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StateOrProvinceService {

    private final StateOrProvinceRepository stateOrProvinceRepository;
    private final CountryRepository countryRepository;

    private final StateOrProvinceMapper stateOrProvinceMapper;

    public StateOrProvinceService(StateOrProvinceRepository stateOrProvinceRepository,
                                  CountryRepository countryRepository, StateOrProvinceMapper stateOrProvinceMapper) {
        this.stateOrProvinceRepository = stateOrProvinceRepository;
        this.countryRepository = countryRepository;
        this.stateOrProvinceMapper = stateOrProvinceMapper;
    }

    /**
     * handle business and create state or province.
     *
     * @param stateOrProvincePostVm The state or province post Dto
     * @return StateOrProvince
     */
    @Transactional
    public StateOrProvince createStateOrProvince(final StateOrProvincePostVm stateOrProvincePostVm) {
        final Long countryId = stateOrProvincePostVm.countryId();
        final boolean isCountryExisted = countryRepository.existsById(countryId);
        if (!isCountryExisted) {
            throw new BusinessException(ApiMessageCore.COUNTRY_NOT_FOUND);
        }

        if (stateOrProvinceRepository.existsByNameIgnoreCaseAndCountryId(stateOrProvincePostVm.name(), countryId)) {
            throw new BusinessException(ApiMessageCore.NAME_ALREADY_EXITED);
        }

        final StateOrProvince stateOrProvince = StateOrProvince.builder()
                .name(stateOrProvincePostVm.name())
                .code(stateOrProvincePostVm.code())
                .type(stateOrProvincePostVm.type())
                .country(countryRepository.getReferenceById(countryId))
                .build();

        return stateOrProvinceRepository.save(stateOrProvince);
    }

    /**
     * Handle business and update state or province.
     *
     * @param stateOrProvincePostVm The state or province post Dto
     * @param id                    The id of stateOrProvince need to update
     */
    @Transactional
    public void updateStateOrProvince(final StateOrProvincePostVm stateOrProvincePostVm,
                                      final Long id) {
        final StateOrProvince stateOrProvince = stateOrProvinceRepository
                .findById(id)
                .orElseThrow(
                        () -> new BusinessException(ApiMessageCore.STATE_OR_PROVINCE_NOT_FOUND));

        //For the updating case we don't need to check for the state or province being updated
        if (stateOrProvinceRepository.existsByNameIgnoreCaseAndCountryIdAndIdNot(
                stateOrProvincePostVm.name(), stateOrProvince.getCountry().getId(), id)) {
            throw new BusinessException(ApiMessageCore.NAME_ALREADY_EXITED);
        }

        stateOrProvince.setName(stateOrProvincePostVm.name());
        stateOrProvince.setCode(stateOrProvincePostVm.code());
        stateOrProvince.setType(stateOrProvincePostVm.type());

        stateOrProvinceRepository.save(stateOrProvince);
    }

    @Transactional
    public void delete(final Long id) {
        final boolean isStateOrProvinceExisted = stateOrProvinceRepository.existsById(id);
        if (!isStateOrProvinceExisted) {
            throw new BusinessException(ApiMessageCore.STATE_OR_PROVINCE_NOT_FOUND);
        }
        stateOrProvinceRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public StateOrProvinceVm findById(final Long id) {
        final StateOrProvince stateOrProvince = stateOrProvinceRepository
                .findById(id)
                .orElseThrow(() -> new BusinessException(ApiMessageCore.STATE_OR_PROVINCE_NOT_FOUND));
        return stateOrProvinceMapper.toStateOrProvinceViewModelFromStateOrProvince(stateOrProvince);
    }

    @Transactional(readOnly = true)
    public List<StateOrProvinceAndCountryGetNameVm> getStateOrProvinceAndCountryNames(
            final List<Long> stateOrProvinceIds) {
        List<StateOrProvince> stateOrProvinces = stateOrProvinceRepository.findByIdIn(stateOrProvinceIds);

        return stateOrProvinces.stream()
                .map(StateOrProvinceAndCountryGetNameVm::fromModel)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<StateOrProvinceVm> findAll() {
        return stateOrProvinceRepository
                .findAll()
                .stream()
                .map(stateOrProvinceMapper::toStateOrProvinceViewModelFromStateOrProvince)
                .toList();
    }

    /**
     * Handle business and paging list of state or provinces.
     *
     * @param pageNo    The number of page
     * @param pageSize  The number of row on every page
     * @param countryId The country Id which  state or province belong
     * @return StateOrProvince
     */
    @Transactional(readOnly = true)
    public StateOrProvinceListGetVm getPageableStateOrProvinces(int pageNo, int pageSize,
                                                                Long countryId) {
        final Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.ASC, "name"));
        final Page<StateOrProvince> stateOrProvincePage =
                stateOrProvinceRepository.getPageableStateOrProvincesByCountry(
                        countryId, pageable);
        final List<StateOrProvince> stateOrProvinceList = stateOrProvincePage.getContent();

        final List<StateOrProvinceVm> stateOrProvinceVms = stateOrProvinceList.stream()
                .map(StateOrProvinceVm::fromModel)
                .toList();

        return new StateOrProvinceListGetVm(
                stateOrProvinceVms,
                stateOrProvincePage.getNumber(),
                stateOrProvincePage.getSize(),
                (int) stateOrProvincePage.getTotalElements(),
                stateOrProvincePage.getTotalPages(),
                stateOrProvincePage.isLast()
        );
    }

    public List<StateOrProvinceVm> getAllByCountryId(Long countryId) {
        return stateOrProvinceRepository.findAllByCountryIdOrderByNameAsc(countryId).stream()
                .map(stateOrProvinceMapper::toStateOrProvinceViewModelFromStateOrProvince)
                .toList();
    }
}
