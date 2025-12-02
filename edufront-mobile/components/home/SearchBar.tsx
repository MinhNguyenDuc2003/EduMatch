import { XIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (text: string) => {
    setKeyword(text);
  };

  const clearSearch = () => {
    setKeyword("");
  };

  return (
    <View className="relative">
      <TextInput
        placeholder="Search for Courses"
        placeholderTextColor="#9ca3af"
        className=" border-primary-brand border-2 rounded-lg p-4"
        value={keyword}
        onChangeText={handleSearch}
        onSubmitEditing={() => console.log("keyword", keyword)}
      />
      {keyword && (
        <Pressable
          onPress={clearSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <XIcon size={20} color={"#3d6cb9"} />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;
