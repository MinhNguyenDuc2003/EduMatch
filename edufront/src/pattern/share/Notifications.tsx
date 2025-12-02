import { Button } from '@/lib/cus/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/cus/dropdown-menu';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { toast } from 'sonner';
import {
  useGetNotificationsQuery,
  useGetTokenQuery,
  useLazyReadNotificationsQuery,
} from '@/state/apiAuth';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { NOTIFICATION_TYPES } from '@/constants/Common';

const Notifications = () => {
  const clientRef = useRef<Client | null>(null);

  const t = useTranslations('notifications');
  const tError = useTranslations('error');

  const { data: notifications, isLoading, isError, refetch } = useGetNotificationsQuery();
  const { data: token, isLoading: isLoadingToken } = useGetTokenQuery();
  const [readNotifications] = useLazyReadNotificationsQuery();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      return;
    }

    // Initialize STOMP client
    const client = new Client({
      brokerURL: `wss://fpt.edumatch.space/api/notification/ws?token=${encodeURIComponent(token)}`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('WebSocket Connected');

        // Subscribe to private notifications
        client.subscribe('/user/queue/private', (message: IMessage) => {
          try {
            const notification = JSON.parse(message.body);
            console.log(notification);

            toast.custom((t) => (
              <div className="flex flex-col items-start rounded-lg gap-1 p-4 border border-primary-brand cursor-pointer bg-primary-light">
                <p className="font-semibold text-sm text-gray-900">{notification.title}</p>
                <p className="text-xs text-gray-600 line-clamp-2">{notification.content}</p>
              </div>
            ));

            refetch();
          } catch (error) {
            console.log('Error parsing private notification:', error);
          }
        });

        client.subscribe('/topic/global', (message: IMessage) => {
          try {
            const notification = JSON.parse(message.body);
            console.log('Global notification:', notification);

            toast.custom((t) => (
              <div className="flex flex-col items-start rounded-lg gap-1 p-4 border border-primary-brand cursor-pointer bg-primary-light">
                <p className="font-semibold text-sm text-gray-900">{notification.title}</p>
                <p className="text-xs text-gray-600 line-clamp-2">{notification.content}</p>
              </div>
            ));

            refetch();
          } catch (error) {
            console.log('Error parsing private notification:', error);
          }
        });
      },
      onDisconnect: () => {
        console.log('WebSocket Disconnected');
      },
      onStompError: (frame) => {
        console.log('STOMP Error:', frame);
      },
      onWebSocketError: (event) => {
        console.log('WebSocket Error:', event);
      },
    });

    clientRef.current = client;
    client.activate();

    // Cleanup function
    return () => {
      if (clientRef.current?.active) {
        clientRef.current.deactivate();
      }
      clientRef.current = null;
    };
  }, [token, refetch, isLoadingToken]);

  const unreadCount = useMemo(
    () => (notifications ? notifications.filter((n) => !n.isRead).length : 0),
    [notifications]
  );

  const handleClickNotification = (notification: UserNotification) => {
    readNotifications(notification.id)
      .unwrap()
      .then(() => {
        refetch();
      });
    if (notification.referenceType === 'SYSTEM') {
      return;
    }
    if (
      notification.referenceType === 'SCHOLARSHIP' ||
      notification.referenceType === 'APPLICATION_REFERRAL'
    ) {
      router.push(`/scholarships/${notification.slug}`);
    }
    if (notification.referenceType === 'SCHOLARSHIP_APPLICATION') {
      router.push(`/provider/applications`);
    }
    if (notification.referenceType === 'APPLICATION') {
      router.push(`/applicant/activity?tab=application`);
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Notifications Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative w-9 h-9 text-gray-600 shadow-none hover:text-gray-900 hover:bg-gray-100"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span className="font-semibold">{t('title')}</span>
            {unreadCount > 0 && (
              <span className="text-xs font-normal text-primary-brand">
                {unreadCount} {t('new')}
              </span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-96 flex flex-col gap-1 overflow-y-auto">
            {isError && (
              <div className="p-4 text-center text-sm text-red-500">{tError('fetchingError')}</div>
            )}
            {isLoading && (
              <div className="">
                <div className="space-y-2 p-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col gap-2 animate-pulse">
                      <div className="flex items-center justify-between w-full">
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="w-2 h-2 bg-gray-200 rounded-full mt-1"></div>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {notifications && !isLoading && notifications.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">{t('noNotifications')}</div>
            )}
            {notifications &&
              !isLoading &&
              notifications.map((notification) => {
                const isSystemNotification = notification.referenceType === 'SYSTEM';
                return (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      'flex flex-col items-start gap-1 p-3 cursor-pointer',
                      !notification.isRead && 'bg-primary-light',
                      isSystemNotification && 'border-l-4 border-red-500 bg-blue-50/50'
                    )}
                    onClick={() => {
                      handleClickNotification(notification);
                    }}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-gray-900">
                          {t(
                            NOTIFICATION_TYPES[
                              notification.referenceType as keyof typeof NOTIFICATION_TYPES
                            ]
                          )}
                        </p>
                        {isSystemNotification && (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 bg-blue-100 rounded">
                            SYSTEM
                          </span>
                        )}
                      </div>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-primary-brand rounded-full mt-1"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{notification.content}</p>
                  </DropdownMenuItem>
                );
              })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notifications;
