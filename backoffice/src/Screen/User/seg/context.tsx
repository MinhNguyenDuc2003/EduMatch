'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClientService from 'src/apiController/ApiClientService';
import { GenCtx } from 'src/apiController/GeneralContext';
import { sStore } from 'src/stores';
import { onSetLoading } from 'src/utils/eventBus';

export default GenCtx({
  useLogic() {
    type IForm = {
      fields: {
        User: {
          name: string;
          age: number;
          gmail: string;
          description: string;
        };
      };
      filters: object;
    };

    const ss = sStore();
    const methods = useForm<IForm>({
      mode: 'onSubmit',
      defaultValues: {
        fields: {},
        filters: {},
      },
    });

    const meds = {
      /**
       * Fetches all customer data using pagination
       */
      async onGetData() {
        onSetLoading(true);
        try {
          const results: any[] = [];
          let page = 0;

          while (true) {
            const res = await apiClientService.get(
              `/api/customer/backoffice/customers?pageNo=${page}`
            );

            const totalUser = res?.totalUser ?? 0;
            const customers = res?.customers ?? [];

            if (customers.length > 0) {
              results.push(...customers);
            }

            // Stop condition: no more users or page returns empty
            if (totalUser === 0 || customers.length === 0) {
              break;
            }

            page++;
          }

          ss.setJointData({
            Users: results || [],
          });

          return results;
        } catch (err) {
          console.error("Fetch Data Error:", err);
        } finally {
          onSetLoading(false);
        }
      },

      /**
       * Creates a new user. 
       * Throws error so the UI can trigger the Error Modal.
       */
      async onCreate(user: any) {
        onSetLoading(true);
        try {
          const response = await apiClientService.post(`/api/customer/backoffice/customers`, {
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            role: user.role[0], // Sending the first role from the array
          });

          // Return response to UI for the Success Modal
          return response;
        } catch (error) {
          console.error("Create User Error:", error);
          // Throwing the error is vital for the UI try-catch block
          throw error; 
        } finally {
          onSetLoading(false);
        }
      },

      /**
       * Gets a specific user profile by ID
       */
      async onGetByID(id: string) {
        onSetLoading(true);
        try {
          const data = await apiClientService.get(
            `/api/customer/backoffice/customers/profile/${id}`
          );
          return data.data.data;
        } catch (error) {
          console.error("Get User By ID Error:", error);
        } finally {
          onSetLoading(false);
        }
      },
    };

    useEffect(() => {
      meds.onGetData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
      ss,
      meds,
      methods,
    };
  },
});