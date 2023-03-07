import React from "react"
import { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated"

enum Scroll {
  onMomentumScrollBegin = "onMomentumScrollBegin",
  onMomentumScrollEnd = "onMomentumScrollEnd",
  onScrollBeginDrag = "onScrollBeginDrag",
  onScrollEndDrag = "onScrollEndDrag",
}

export const useFloatingActionEvents = () => {
  const [scrollState, setScrollState] = React.useState<Scroll | null>(null)
  const [isScrolling, setIsScrolling] = React.useState(false)

  const scrollHandlers = {
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
    scrollHandlers,
  }
}

export const useScrollY = () => {
  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    },
  })
  return { scrollY, scrollHandler }
}
