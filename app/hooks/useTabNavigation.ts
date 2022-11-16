import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { TabParamList } from "../navigators/TabNavigator"

export function useTabNavigation() {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>()

  return navigation
}
