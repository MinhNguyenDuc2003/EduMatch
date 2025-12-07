import { useUnfollowProviderMutation } from "@/state/api";
import { Mail, Phone } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { Button } from "./ui/button";
import { Text } from "./ui/text";

const ProviderCard = ({ item }: { item: ProviderProfile }) => {
  const [unfollowProvider, { isLoading: unfollowLoading }] =
    useUnfollowProviderMutation();

  const handleUnFollowProvider = async () => {
    await unfollowProvider(item.id);
  };

  return (
    <Pressable
      onPress={() => {
        // router.push({
        //   pathname: "/(routes)/scholarshipdetails/[slug]",
        //   params: {
        //     slug: item.slug,
        //   },
        // });
      }}
      className="bg-blue-50 rounded-2xl flex gap-2 p-4 cursor-pointer border border-primary-brand "
    >
      {/* Header: Logo + Organization */}
      <View className="flex-row items-center">
        <Image
          source={{ uri: item.logoUrl }}
          className="w-16 h-16 rounded-sm mr-3"
        />
        <View className="flex-1">
          <Text className="text-md font-semibold text-gray-800 line-clamp-2">
            {item.organizationName}
          </Text>
          <Text className="text-sm text-gray-500">{item.organizationType}</Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row gap-2 items-center">
          <Phone size={16} color="#6b7280" />
          <Text className="text-sm text-gray-500">{item.phone}</Text>
        </View>
        <View className="flex flex-row gap-2 items-center">
          <Mail size={16} color="#6b7280" />
          <Text className="text-sm text-gray-500">{item.email}</Text>
        </View>
      </View>

      <Button
        size={"sm"}
        className="bg-primary-brand p-0 rounded-xl"
        onPress={handleUnFollowProvider}
      >
        <Text className="text-white text-xs">
          {unfollowLoading ? "Unfollowing..." : "Following"}
        </Text>
      </Button>
    </Pressable>
  );
};

export default ProviderCard;
