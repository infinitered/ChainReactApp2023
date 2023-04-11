import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "../navigators"

export function useAppNavigation<T extends ParamListBase = AppStackParamList>() {
  const navigation = useNavigation<NativeStackNavigationProp<T>>()

  return navigation
}
