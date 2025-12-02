'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClientService from 'src/apiController/ApiClientService';
import { GenCtx } from 'src/apiController/GeneralContext';
import { sStore } from 'src/stores';
import { onSetLoading } from 'src/utils/eventBus';

const data = 'ffffff';
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
    // const loading = useState(false);
    const meds = {
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

            console.log(`Page ${page} → totalUser: ${totalUser}`);

            if (customers.length > 0) {
              results.push(...customers);
            }

            if (totalUser === 0) {
              console.log("Stop fetching — totalUser = 0");
              break;
            }

            page++;
          }

          ss.Joint.Users = results;
          console.log("Total users loaded:", results.length);

          return results;

        } catch (err) {
          console.error(err);
        } finally {
          onSetLoading(false);
        }
      },

      async onCreate(user: any) {
        onSetLoading(true);
        try {
          const data = await apiClientService.post(`/api/customer/backoffice/customers`, {
            "username": user.username,
            "email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "password": user.password,
            "role": user.role[0]
          });
          if (data !== null) {
            alert("User created successfully");
          }
          window.location.reload()
          return data.data;

        } catch (error) {
          console.error({ error });
        } finally {
          onSetLoading(false);
        }
      },
       async onGetByID(id: string) {
        onSetLoading(true);
        try {
          const data = await apiClientService.get(`/api/customer/backoffice/customers/profile/${id}`);
          return data.data.data;
        } catch (error) {
          console.error({ error });
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
      data,
      meds,
      methods
    };
  },
});
