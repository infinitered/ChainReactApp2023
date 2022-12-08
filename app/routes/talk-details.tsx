import { Link } from "expo-router"
import { Text, View } from "react-native"

export default function TalkDetailsScreen({ navigation }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text onPress={() => navigation.goBack()}>talk details</Text>
    </View>
  )
}
