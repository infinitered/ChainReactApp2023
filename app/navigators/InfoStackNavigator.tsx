import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { InfoScreen } from "../screens"
import { CodeOfConductScreen } from "../screens/InfoScreen/CodeOfConductScreen"
import { ContactUsScreen } from "../screens/InfoScreen/ContactUsScreen"
import { OurSponsorsScreen } from "../screens/InfoScreen/OurSponsorsScreen"

export type InfoStackParamList = {
  Info: undefined
  CodeOfConduct: undefined
  ContactUs: undefined
  OurSponsors: undefined
}

const Stack = createNativeStackNavigator<InfoStackParamList>()

export const InfoStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Info">
      <Stack.Screen name="Info" component={InfoScreen} />
      <Stack.Screen name="CodeOfConduct" component={CodeOfConductScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="OurSponsors" component={OurSponsorsScreen} />
    </Stack.Navigator>
  )
}
