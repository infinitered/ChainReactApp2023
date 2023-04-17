import z from "zod"

export const DateStringSchema = z.string()

export type DateString = z.infer<typeof DateStringSchema>

export const ListCollectionsItemSchema = z.object({
  _id: z.string(),
  lastUpdated: DateStringSchema,
  createdOn: DateStringSchema,
  name: z.string(),
  slug: z.string(),
})

export type ListCollectionsItem = z.infer<typeof ListCollectionsItemSchema>

export const ListCollectionsResponseSchema = z.array(ListCollectionsItemSchema)

export type ListCollectionsResponse = z.infer<typeof ListCollectionsResponseSchema>

export const ValidationSchema = z.any()

export const FieldSchema = z.object({
  name: z.string(),
  id: z.string(),
  slug: z.string(),
  type: z.string(),
  editable: z.boolean(),
  required: z.boolean(),
  helpText: z.string().optional(),
  validations: ValidationSchema.optional(),
})

export type Field = z.infer<typeof FieldSchema>

/**
 * @example
{
  "_id": "580e63fc8c9a982ac9b8b745",
  "lastUpdated": "2016-10-24T19:42:38.929Z",
  "createdOn": "2016-10-24T19:41:48.349Z",
  "name": "Blog Posts",
  "slug": "post",
  "singularName": "Blog Post",
  "fields": [
    {
      "id": "7f62a9781291109b9e428fb47239fd35",
      "editable": true,
      "required": false,
      "type": "RichText",
      "slug": "post-body",
      "name": "Post Body"
    },
  ]
}
 */
export const GetCollectionResponseSchema = z.object({
  _id: z.string(),
  lastUpdated: DateStringSchema,
  createdOn: DateStringSchema,
  name: z.string(),
  slug: z.string(),
  singularName: z.string(),
  fields: z.array(FieldSchema),
})

export type GetCollectionResponse = z.infer<typeof GetCollectionResponseSchema>

export const GetCollectionItemResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
  })

export const CollectionBaseSchema = z.object({
  _id: z.string(),
  _cid: z.string(),
})
export const ImageRefSchema = z.object({
  alt: z.string().optional().nullable(),
  fileId: z.string(),
  url: z.string(),
})
export const ItemRefSchema = z.string()
export const ItemRefSetSchema = z.array(ItemRefSchema)
export const SetSchema = z.array(ImageRefSchema)
export const PlainTextSchema = z.string()
export const LinkSchema = z.string()
export const OptionSchema = z.string()
export const BoolSchema = z.boolean()
export const DateSchema = DateStringSchema.nullable()
export const UserSchema = z.string()
export const RichTextSchema = z.string()
