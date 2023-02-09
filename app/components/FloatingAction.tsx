import React from "react"
import { Dimensions, ViewStyle } from "react-native"
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { spacing } from "../theme"

type Props = {
  children: React.ReactElement
}

enum Scroll {
  onMomentumScrollBegin = "onMomentumScrollBegin",
  onMomentumScrollEnd = "onMomentumScrollEnd",
  onScrollBeginDrag = "onScrollBeginDrag",
  onScrollEndDrag = "onScrollEndDrag",
}

export const useFloatingActionEvents = () => {
  const [scrollState, setScrollState] = React.useState<Scroll | null>(null)
  const [isScrolling, setIsScrolling] = React.useState(false)

  const floatingScrollHandlers = {
    [Scroll.onMomentumScrollBegin]: () => setScrollState(Scroll.onMomentumScrollBegin),
    [Scroll.onMomentumScrollEnd]: () => setScrollState(Scroll.onMomentumScrollEnd),
    [Scroll.onScrollBeginDrag]: () => setScrollState(Scroll.onScrollBeginDrag),
    [Scroll.onScrollEndDrag]: () => setScrollState(Scroll.onScrollEndDrag),
  }

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (scrollState === Scroll.onScrollBeginDrag) {
      setIsScrolling(true)
    }

    if (scrollState === Scroll.onMomentumScrollBegin) {
      clearTimeout(timeout)
    }

    if (scrollState === Scroll.onMomentumScrollEnd || scrollState === Scroll.onScrollEndDrag) {
      timeout = setTimeout(() => {
        setIsScrolling(false)
      }, 500)
    }

    return () => clearTimeout(timeout)
  }, [scrollState])

  return {
    isScrolling,
    floatingScrollHandlers,
  }
}

const FloatingAction = ({ children }: Props) => {
  return (
    <SafeAreaView edges={["bottom"]} style={$floatingAction}>
      <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
        {children}
      </Animated.View>
    </SafeAreaView>
  )
}

const $floatingAction: ViewStyle = {
  position: "absolute",
  bottom: spacing.large,
  width: Dimensions.get("window").width,
  paddingHorizontal: spacing.large,
}

export { FloatingAction }
