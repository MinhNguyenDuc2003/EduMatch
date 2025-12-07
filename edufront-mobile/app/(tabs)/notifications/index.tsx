import { cn, formatDate } from "@/lib/utils";
import {
  useGetNotificationsQuery,
  useGetTokenQuery,
  useLazyReadNotificationsQuery,
} from "@/state/api";
import { Client, IMessage } from "@stomp/stompjs";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { ActivityIndicator, FlatList, Pressable, Text } from "react-native";

const NOTIFICATION_TYPES = {
  SCHOLARSHIP: "A new scholarship has been added",
  SCHOLARSHIP_UPDATED: "Your tracked scholarship has been updated",
  PROVIDER_NEWS:
    "A new news about your tracked scholarship has been published",
  APPLICATION: "The status of your application has been updated",
  SYSTEM: "SYSTEM MESSAGE !!!!!!",
  SCHOLARSHIP_APPLICATION:
    "An application has been submitted for your scholarship",
  APPLICATION_REFERRAL: "You have a new referral scholarship",
};

const index = () => {
  const clientRef = useRef<Client | null>(null);

  const {
    data: notifications,
    isLoading,
    isError,
    refetch,
  } = useGetNotificationsQuery();
  const { data: token, isLoading: isLoadingToken } = useGetTokenQuery();
  const [readNotifications] = useLazyReadNotificationsQuery();

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
        console.log("WebSocket Connected");

        // Subscribe to private notifications
        client.subscribe("/user/queue/private", (message: IMessage) => {
          try {
            const notification = JSON.parse(message.body);
            console.log(notification);

            refetch();
          } catch (error) {
            console.log("Error parsing private notification:", error);
          }
        });

        client.subscribe("/topic/global", (message: IMessage) => {
          try {
            const notification = JSON.parse(message.body);
            console.log("Global notification:", notification);

            refetch();
          } catch (error) {
            console.log("Error parsing private notification:", error);
          }
        });
      },
      onDisconnect: () => {
        console.log("WebSocket Disconnected");
      },
      onStompError: (frame) => {
        console.log("STOMP Error:", frame);
      },
      onWebSocketError: (event) => {
        console.log("WebSocket Error:", event);
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
    if (notification.referenceType === "SYSTEM") {
      return;
    }
    if (
      notification.referenceType === "SCHOLARSHIP" ||
      notification.referenceType === "APPLICATION_REFERRAL"
    ) {
      router.push({
        pathname: "/(routes)/scholarshipdetails/[slug]",
        params: {
          slug: notification.slug as string,
        },
      });
    }
    if (notification.referenceType === "APPLICATION") {
      router.push(`/(tabs)/applications`);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={notifications}
      renderItem={({ item }) => {
        const isSystemNotification = item.referenceType === "SYSTEM";
        return (
          <Pressable
            onPress={() => handleClickNotification(item)}
            className={cn(
              "flex flex-col items-start gap-1 p-2 border-y border-gray-400",
              !item.isRead && "bg-[#e5ecf9]",
              isSystemNotification && "border-l-4 border-red-500 bg-blue-50/50"
            )}
          >
            <Text className="text-sm font-bold">
              {
                NOTIFICATION_TYPES[
                  item.referenceType as keyof typeof NOTIFICATION_TYPES
                ]
              }
            </Text>
            <Text className="text-xs text-gray-600 line-clamp-2">
              {item.content}
            </Text>
            <Text className="text-xs text-gray-600 self-end">
              {formatDate(item.createdDate)}
            </Text>
          </Pressable>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default index;
