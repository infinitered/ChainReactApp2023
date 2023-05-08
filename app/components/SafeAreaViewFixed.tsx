import React, { ReactNode } from "react"
import { StyleProp, View, ViewProps, ViewStyle } from "react-native"
import { Edge, useSafeAreaInsets } from "react-native-safe-area-context"

interface Props extends ViewProps {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  edges?: Edge[]
}

/**
 * USE THIS - Alternative to the default [SafeAreaView](https://github.com/th3rdwave/react-native-safe-area-context#safeareaview)
 * from react-native-safe-area-context which currently has an issue that will cause a flicker / jump on first render on iOS / Android.
 *
 * [SafeAreaProvider](https://github.com/th3rdwave/react-native-safe-area-context#safeareaprovider) should still be higher in the tree.
 *
 * GitHub issues:
 * [219](https://github.com/th3rdwave/react-native-safe-area-context/issues/219),
 * [226](https://github.com/th3rdwave/react-native-safe-area-context/issues/226)
 */
export default function SafeAreaViewFixed({ children, style, edges, ...rest }: Props) {
  const insets = useSafeAreaInsets()
  const defaultEdges = edges === undefined
  return (
    <View
      style={[
        {
          paddingTop: defaultEdges || edges?.includes("top") ? insets.top : undefined,
          paddingBottom: defaultEdges || edges?.includes("bottom") ? insets.bottom : undefined,
          paddingLeft: defaultEdges || edges?.includes("left") ? insets.left : undefined,
          paddingRight: defaultEdges || edges?.includes("right") ? insets.right : undefined,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  )
}
