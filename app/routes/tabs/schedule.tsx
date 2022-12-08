import { Link } from "expo-router"
import { Text, View } from "react-native"

export default function ScheduleScreen() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text>Schedule screen</Text>
      <Link href="/talk-details">Go to talk details</Link>
    </View>
  )
}
