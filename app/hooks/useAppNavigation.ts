import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "../navigators"

export function useAppNavigation() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  return navigation
}
