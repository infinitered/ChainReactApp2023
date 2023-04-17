import { AxiosInstance } from "axios"
import {
  ListCollectionsResponseSchema,
  GetCollectionResponseSchema,
  GetCollectionItemsResponseSchema,
} from "./webflow-api.schema"
import { z } from "zod"

export const Webflow = (deps: { api: AxiosInstance }) => ({
  collection: {
    /** @see https://developers.webflow.com/reference/list-collections */
    list: async (siteId: string) => {
      const collections = await deps.api.get(`/sites/${siteId}/collections`).then((r) => r.data)

      return ListCollectionsResponseSchema.parse(collections)
    },
    /** @see https://developers.webflow.com/reference/get-collection */
    get: async (collectionId: string) => {
      const collection = await deps.api.get(`/collections/${collectionId}`).then((r) => r.data)

      return GetCollectionResponseSchema.parse(collection)
    },
    items: {
      /** @see https://developers.webflow.com/reference/list-items */
      get: async <T extends z.ZodTypeAny>(props: { collectionId: string; itemSchema: T }) => {
        const payload = await deps.api
          .get(`/collections/${props.collectionId}/items`)
          .then((r) => r.data)

        const schema = GetCollectionItemsResponseSchema(props.itemSchema)

        // filter out drafts
        if ("items" in payload && Array.isArray(payload.items)) {
          payload.items = payload.items.filter(
            (item: unknown) =>
              typeof item === "object" && "_draft" in item && item._draft === false,
          )
        }

        return schema.parse(payload)
      },
    },
  },
})
