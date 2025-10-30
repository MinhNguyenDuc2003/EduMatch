'use client';

import apiClientService from '@/common/services/ApiClientService';
import { IProfileForm, schemas } from '@/lib/schemas';
import { GenCtx } from '@/provider/GeneralContext';
import { sStore } from '@/stores';
import { onSetLoading } from '@/utils/eventBus';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { API_ENDPOINTS, DEFAULT_PROFILE_FORM_VALUES } from '../constants';

export default GenCtx({
  useLogic() {
    const ss = sStore();
    const methods = useForm<IProfileForm>({
      reValidateMode: 'onSubmit',
      mode: 'onChange',
      resolver: zodResolver(schemas.Profile),
      defaultValues: DEFAULT_PROFILE_FORM_VALUES,
    });

    // Fetch profile data
    const onGetData = useCallback(async () => {
      onSetLoading(true);
      try {
        const response = await apiClientService.get(API_ENDPOINTS.CUSTOMER_PROFILE);
        return ss.setApplicantProfileData(response.data);
      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        onSetLoading(false);
      }
    }, [ss]);

    // Fetch countries
    const onGetCountry = useCallback(async () => {
      try {
        const data = await apiClientService.get(API_ENDPOINTS.COUNTRIES);
        return ss.setCountriesData(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }, [ss]);

    // Fetch states/provinces by country
    const onGetStateOrProvince = useCallback(
      async (currentCountryId: number) => {
        try {
          const data = await apiClientService.get(
            `${API_ENDPOINTS.STATE_OR_PROVINCES}?countryId=${currentCountryId}`
          );
          return ss.setStateOrProvincesData(data);
        } catch (error) {
          console.error('Error fetching states/provinces:', error);
        }
      },
      [ss]
    );

    // Fetch districts by state/province
    const onGetDistrict = useCallback(
      async (currentStateOrProvinceId: number) => {
        try {
          const data = await apiClientService.get(
            `${API_ENDPOINTS.DISTRICTS}/${currentStateOrProvinceId}`
          );
          return ss.setDistrictsData(data);
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      },
      [ss]
    );

    // Reset form with profile data
    const onResetForm = useCallback(() => {
      if (ss.Applicant.ApplicantProfile) {
        const profileData = ss.Applicant.ApplicantProfile;

        const formData = {
          Fields: {
            applicantProfile: {
              ...DEFAULT_PROFILE_FORM_VALUES.Fields.applicantProfile,
              ...profileData.applicantProfile,
            },
            addressPostVm: {
              ...DEFAULT_PROFILE_FORM_VALUES.Fields.addressPostVm,
              ...profileData.addresses?.[0],
            },
          },
          Filters: {},
        };

        methods.reset(formData);
      }
    }, [methods, ss.Applicant.ApplicantProfile]);

    // Update student info (create or update)
    const onUpdateStudentInfo = useCallback(
      async (data: IProfileForm) => {
        onSetLoading(true);

        try {
          console.log('Updating student info with data:', data);

          // Call API to update or create student info
          if (ss.Applicant.ApplicantProfile?.applicantProfile) {
            await apiClientService.put(API_ENDPOINTS.UPDATE_PROFILE, data.Fields);
          } else {
            await apiClientService.post(API_ENDPOINTS.CREATE_PROFILE, data.Fields);
          }

          // Refresh data from server to ensure UI is updated with latest data
          await onGetData();

          console.log('Student info updated successfully');
        } catch (error) {
          console.error('Error updating student info:', error);
          throw error; // Re-throw to let the calling component handle the error
        } finally {
          onSetLoading(false);
        }
      },
      [ss.Applicant.ApplicantProfile?.applicantProfile, onGetData]
    );

    // Memoize methods object
    const meds = useCallback(
      () => ({
        onUpdateStudentInfo,
        onGetData,
        onGetCountry,
        onGetStateOrProvince,
        onGetDistrict,
        onResetForm,
      }),
      [
        onUpdateStudentInfo,
        onGetData,
        onGetCountry,
        onGetStateOrProvince,
        onGetDistrict,
        onResetForm,
      ]
    )();

    // Initial data fetch on mount
    useEffect(() => {
      const fetchInitialData = async () => {
        await Promise.all([onGetData(), onGetCountry()]);
      };

      fetchInitialData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Reset form when profile data is loaded
    useEffect(() => {
      onResetForm();
    }, [onResetForm]);

    // Watch for country selection changes and fetch states/provinces
    const countryId = methods.watch('Fields.addressPostVm.countryId');

    useEffect(() => {
      if (countryId && countryId > 0) {
        // Add a small delay to prevent rapid API calls
        const timeoutId = setTimeout(() => {
          onGetStateOrProvince(countryId);
        }, 300);

        return () => clearTimeout(timeoutId);
      }
    }, [countryId, onGetStateOrProvince]);

    // Watch for state/province selection changes and fetch districts
    const stateOrProvinceId = methods.watch('Fields.addressPostVm.stateOrProvinceId');

    useEffect(() => {
      if (stateOrProvinceId && stateOrProvinceId > 0) {
        onGetDistrict(stateOrProvinceId);
      }
    }, [stateOrProvinceId, onGetDistrict]);

    return {
      ss,
      meds,
      methods,
    };
  },
});
