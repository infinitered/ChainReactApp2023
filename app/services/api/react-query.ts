import { QueryClient } from "@tanstack/react-query"

// Creating a react-query client with the stale time set to "Infinity" so that its never stale
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: Infinity,
    },
  },
})
