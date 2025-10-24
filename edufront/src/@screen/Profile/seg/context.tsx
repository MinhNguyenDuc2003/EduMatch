'use client';

import apiClientService from '@/common/services/ApiClientService';
import { IProfileForm, schemas } from '@/lib/schemas';
import { GenCtx } from '@/provider/GeneralContext';
import { sStore } from '@/stores';
import { onSetLoading } from '@/utils/eventBus';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
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

    const loading = useState(false);

    const meds = {
      async onUpdateStudentInfo(data: IProfileForm) {
        onSetLoading(true);

        try {
          console.log('Updating student info with data:', data);

          // Call API to update student info
          if (ss.Applicant.ApplicantProfile?.applicantProfile) {
            await apiClientService.put(API_ENDPOINTS.UPDATE_PROFILE, data.Fields);
          } else {
            await apiClientService.post(API_ENDPOINTS.CREATE_PROFILE, data.Fields);
          }

          // Refresh data from server to ensure UI is updated with latest data
          await meds.onGetData();

          console.log('Student info updated successfully');
        } catch (error) {
          console.error('Error updating student info:', error);
          // You might want to show a toast notification here
          throw error; // Re-throw to let the calling component handle the error
        } finally {
          onSetLoading(false);
        }
      },

      onGetData: useCallback(async () => {
        onSetLoading(true);
        try {
          const response = await apiClientService.get(API_ENDPOINTS.CUSTOMER_PROFILE);

          return ss.setApplicantProfileData(response.data);
        } catch (error) {
          console.error('Error loading profile data:', error);
        } finally {
          onSetLoading(false);
        }
      }, [ss]),

      onGetCountry: useCallback(async () => {
        try {
          const data = await apiClientService.get(API_ENDPOINTS.COUNTRIES);
          return ss.setCountriesData(data);
        } catch (error) {
          console.error('Error fetching countries:', error);
        } finally {
          onSetLoading(false);
        }
      }, [ss]),

      onGetStateOrProvince: useCallback(
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
      ),

      onGetDistrict: useCallback(
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
      ),

      onResetForm: useCallback(async () => {
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
      }, [methods, ss]),
    };

    useEffect(() => {
      meds.onGetData();
      meds.onGetCountry();
    }, []);

    // Reset form when profile data is loaded
    useEffect(() => {
      if (ss.Applicant.ApplicantProfile) {
        meds.onResetForm();
      }
    }, [ss.Applicant.ApplicantProfile, methods]);

    // Watch for country selection changes and automatically fetch states/provinces
    const countryId = methods.watch('Fields.addressPostVm.countryId');
    const stateOrProvinceId = methods.watch('Fields.addressPostVm.stateOrProvinceId');

    // Memoize the country ID to prevent unnecessary re-renders
    const memoizedCountryId = useMemo(() => countryId, [countryId]);
    const memoizedStateOrProvinceId = useMemo(() => stateOrProvinceId, [stateOrProvinceId]);

    useEffect(() => {
      if (memoizedCountryId && memoizedCountryId > 0) {
        // Add a small delay to prevent rapid API calls
        const timeoutId = setTimeout(() => {
          meds.onGetStateOrProvince(memoizedCountryId);
        }, 300);

        return () => clearTimeout(timeoutId);
      }
    }, [memoizedCountryId]);

    useEffect(() => {
      if (memoizedStateOrProvinceId && memoizedStateOrProvinceId > 0) {
        meds.onGetDistrict(memoizedStateOrProvinceId);
      }
    }, [memoizedStateOrProvinceId]);

    return {
      ss,
      meds,
      methods,
    };
  },
});
