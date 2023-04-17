interface SortableObject {
  [key: string]: any
}

export const customSort = <T extends SortableObject>(
  arr: T[],
  property: keyof T,
  order: T[keyof T][],
): T[] => {
  const orderMap: { [key: string]: number } = {}
  for (let i = 0; i < order.length; i++) {
    orderMap[order[i]] = i
  }
  return arr.sort((a, b) => {
    if (a[property] === undefined && b[property] === undefined) {
      return 0
    } else if (a[property] === undefined) {
      return 1
    } else if (b[property] === undefined) {
      return -1
    } else {
      const aOrder = orderMap[a[property]]
      const bOrder = orderMap[b[property]]
      return aOrder - bOrder
    }
  })
}
