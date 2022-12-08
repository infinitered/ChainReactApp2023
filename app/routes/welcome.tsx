import { Link } from "expo-router"
import { Text, View } from "react-native"

export default function WelcomeScreen() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: "red",
        height: 200,
      }}
    >
      <Link href="/tabs">welcome</Link>
    </View>
  )
}
