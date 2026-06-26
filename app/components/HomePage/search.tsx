import { Image, TextInput, View } from "react-native";
function Search() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
      }}
    >
      <Image
        source={require("..//..//..//assets/images/search-interface-symbol.png")}
        style={{
          width: 20,
          height: 20,
          tintColor: "#64748b",
          marginRight: 12,
        }}
        resizeMode="contain"
      />
      <TextInput
        placeholder="Search documents..."
        placeholderTextColor="#94a3b8"
        style={{
          flex: 1,
          fontSize: 16,
          color: "#0f172a",
          paddingVertical: 8,
        }}
        clearButtonMode="while-editing"
      />
    </View>
  );
}
export default Search;
