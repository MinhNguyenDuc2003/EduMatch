'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import apiClientService from 'src/apiController/ApiClientService';
import { GenCtx } from 'src/apiController/GeneralContext';
import { ISubcriptionList } from 'src/assets/types/SubcriptionList';
import { sStore } from 'src/stores';
import { onSetLoading } from 'src/utils/eventBus';
export default GenCtx({
    useLogic() {
        type IForm = {
            fields: {
                Subscription: ISubcriptionList;
            };
            filters: object;
        };
        const ss = sStore();
                const router = useRouter()

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
                    const data = await apiClientService.get('/api/notification/users/system');
                    if (data) {
                        ss.setJointData({
                            SystemNotification: data || [],
                        });
                        console.log('first', data);
                    }
                    return;
                } catch (error) {
                    console.error({ error });
                } finally {
                    onSetLoading(false);
                }
            },
            async onCreate(Notification :  any) {
                onSetLoading(true);
                try {
                    const data = await apiClientService.post('/api/notification/users/system/notify', {
                        isRead: false,
                        topic: "SYSTEM",
                        title: Notification.title,
                        content: Notification.content
                    });
                   
                    return;
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
            meds,
            methods,
        };
    },
});
