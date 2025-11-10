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
import { Bell, X } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { toast } from 'sonner';

const Notifications = ({ notifications }: { notifications: UserNotification[] }) => {
  const clientRef = useRef<Client | null>(null);
  const token = useMemo(() => process.env.NEXT_PUBLIC_API_TOKEN || '', []);

  useEffect(() => {
    if (!token) {
      console.warn('No API token found for WebSocket connection');
      return;
    }

    // Initialize STOMP client
    const client = new Client({
      brokerURL: `ws://160.30.113.224/notification/ws?token=${encodeURIComponent(`Bearer ${token}`)}`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('WebSocket Connected');

        // Subscribe to private notifications
        client.subscribe('/user/queue/private', (message: IMessage) => {
          try {
            const notification = JSON.parse(message.body);

            toast.custom((t) => (
              <div className="flex flex-col items-start rounded-lg gap-1 p-4 border border-primary-brand cursor-pointer bg-primary-light">
                <p className="font-semibold text-sm text-gray-900">{notification.title}</p>
                <p className="text-xs text-gray-600 line-clamp-2">{notification.content}</p>
              </div>
            ));
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
  }, [token]);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.isRead).length, [notifications]);

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
            <span className="font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <span className="text-xs font-normal text-primary-brand">{unreadCount} new</span>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-96 flex flex-col gap-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">No notifications</div>
            ) : (
              notifications.map((notification) => {
                // Generate id if not present for key
                const notificationId =
                  notification.id ||
                  `${notification.userId}-${notification.referenceId}-${notification.topic}`;
                const isUnread = !notification.isRead;

                return (
                  <DropdownMenuItem
                    key={notificationId}
                    className={cn(
                      'flex flex-col items-start gap-1 p-3 cursor-pointer',
                      isUnread && 'bg-primary-light'
                    )}
                  >
                    <div className="flex items-start justify-between w-full">
                      <p className="font-semibold text-sm text-gray-900">{notification.title}</p>
                      {isUnread && (
                        <span className="w-2 h-2 bg-primary-brand rounded-full mt-1"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{notification.content}</p>
                  </DropdownMenuItem>
                );
              })
            )}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-center justify-center text-primary-brand font-medium cursor-pointer">
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notifications;
