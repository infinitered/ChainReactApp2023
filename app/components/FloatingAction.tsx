import React from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated"
import { spacing } from "../theme"

type Props = {
  children: React.ReactElement
  isScrolling?: boolean
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

const FloatingAction = ({ children, isScrolling }: Props) => {
  return (
    <View>
      {/* <View> must be here as the parent for Layout Animations to work. (entering/exiting animations) */}
      {!isScrolling && (
        <Animated.View entering={FadeInDown} exiting={FadeOutDown} style={$floatingAction}>
          {children}
        </Animated.View>
      )}
    </View>
  )
}

const $floatingAction: ViewStyle = {
  position: "absolute",
  bottom: spacing.large,
  width: Dimensions.get("window").width,
  paddingHorizontal: spacing.large,
}

export { FloatingAction }
