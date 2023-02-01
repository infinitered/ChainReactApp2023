import React from "react"
import { Dimensions, ViewStyle } from "react-native"
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { spacing } from "../theme"
import { Button } from "./Button"

type Props = {
  children: React.ReactElement<typeof Button>
  isScrolling: boolean
}

export const useFloatingButtonEvents = () => {
  const [state, setState] = React.useState({ scrolling: false, withMomentum: false })

  const onMomentumScrollBegin = () => {
    setState({ scrolling: true, withMomentum: true })
  }
  const onMomentumScrollEnd = () => {
    if (state.withMomentum) {
      setState((prev) => ({ ...prev, scrolling: false }))
    }
  }

  const onScrollBeginDrag = () => {
    setState({ scrolling: true, withMomentum: false })
  }

  const onScrollEndDrag = () => {
    if (!state.withMomentum) {
      setState((prev) => ({ ...prev, scrolling: false }))
    }
  }

  return {
    isScrolling: state.scrolling,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollBeginDrag,
    onScrollEndDrag,
  }
}

const isMyComponent = (children) =>
  React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === Button,
  )

const FloatingButton = ({ children, isScrolling }: Props) => {
  // TODO Experimental (not sure if I will do this...)
  if (!isMyComponent(children)) {
    throw new Error(`FloatingButton must have a ${Button.name} as a child`)
  }
  if (isScrolling) return null

  return (
    <SafeAreaView edges={["bottom"]} style={$floatingButton}>
      <Animated.View entering={FadeInDown.delay(500)} exiting={FadeOutDown}>
        {children}
      </Animated.View>
    </SafeAreaView>
  )
}

const $floatingButton: ViewStyle = {
  position: "absolute",
  bottom: spacing.large,
  width: Dimensions.get("window").width,
  paddingHorizontal: spacing.large,
}

export { FloatingButton }
