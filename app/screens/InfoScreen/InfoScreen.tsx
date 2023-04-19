import React from "react"
import { ViewStyle, ImageSourcePropType, ImageStyle, Pressable } from "react-native"
import { AutoImage, ButtonLink, Screen, Text } from "../../components"
import { useAppNavigation, useHeader } from "../../hooks"
import { TabScreenProps } from "../../navigators/TabNavigator"
import { colors, spacing } from "../../theme"
import { translate } from "../../i18n"
import { Carousel } from "../../components/carousel/Carousel"
import { InfoStackParamList } from "../../navigators/InfoStackNavigator"
import { openLinkInBrowser } from "../../utils/openLinkInBrowser"

const irImage1 = require("../../../assets/images/info-ir1.png")
const irImage2 = require("../../../assets/images/info-ir2.png")
const irImage3 = require("../../../assets/images/info-ir3.png")

const carouselData: ImageSourcePropType[] = [irImage1, irImage2, irImage3]

type Links = Array<{
  title: string
  link: keyof InfoStackParamList
}>

const links: Links = [
  {
    title: translate("infoScreen.codeOfConductHeaderTitle"),
    link: "CodeOfConduct",
  },
  {
    title: translate("infoScreen.contactUsTitle"),
    link: "ContactUs",
  },
  {
    title: translate("infoScreen.ourSponsorsTitle"),
    link: "OurSponsors",
  },
]

export const InfoScreen: React.FunctionComponent<TabScreenProps<"InfoStack">> = () => {
  const mainNavigation = useAppNavigation()
  const infoStackNavigation = useAppNavigation<InfoStackParamList>()

  useHeader({
    title: translate("infoScreen.title"),
    leftText: "     ",
    onLeftPress: () => mainNavigation.navigate("Debug"),
  })

  return (
    <Screen style={$root} preset="scroll" ScrollViewProps={{ showsVerticalScrollIndicator: false }}>
      <Text preset="screenHeading" tx="infoScreen.screenHeading" style={$screenHeading} />

      <Carousel
        preset="static"
        data={carouselData}
        subtitle={translate("infoScreen.aboutTitle")}
        body={translate("infoScreen.about")}
      />

      <ButtonLink openLink={() => openLinkInBrowser("https://infinite.red/")} style={$buttonLink}>
        {translate("infoScreen.moreAboutIR")}
      </ButtonLink>

      {links.map((link, index) => (
        <Pressable
          key={index}
          onPress={() => infoStackNavigation.navigate(link.link)}
          style={[$linksWrapper, index === links.length - 1 ? {} : $linksBorder]}
        >
          <Text preset="listHeading" text={link.title} weight="medium" />
          <AutoImage source={require("../../../assets/icons/caretRight.png")} style={$arrow} />
        </Pressable>
      ))}
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const $screenHeading: ViewStyle = {
  marginTop: spacing.extraLarge,
  marginBottom: spacing.medium,
  paddingHorizontal: spacing.large,
}

const $linksWrapper: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-between",
  paddingEnd: spacing.extraLarge,
  paddingStart: spacing.large,
  paddingVertical: spacing.large,
}

const $linksBorder: ViewStyle = {
  borderColor: colors.separator,
  borderBottomWidth: 1,
}

const $arrow: ImageStyle = {
  height: 16,
  marginStart: spacing.medium,
  tintColor: colors.palette.primary500,
  width: 8,
}

const $buttonLink: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.medium,
}
