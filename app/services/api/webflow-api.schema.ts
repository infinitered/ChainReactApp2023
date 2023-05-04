import z from "zod"

export const DateStringSchema = z.string()

export type DateString = z.infer<typeof DateStringSchema>

/** @see https://developers.webflow.com/reference/list-collections */
export const ListCollectionsItemSchema = z.object({
  _id: z.string(),
  lastUpdated: DateStringSchema,
  createdOn: DateStringSchema,
  name: z.string(),
  slug: z.string(),
})

/** @see https://developers.webflow.com/reference/list-collections */
export type ListCollectionsItem = z.infer<typeof ListCollectionsItemSchema>

/** @see https://developers.webflow.com/reference/list-collections */
export const ListCollectionsResponseSchema = z.array(ListCollectionsItemSchema)

/** @see https://developers.webflow.com/reference/list-collections */
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

/** @see https://developers.webflow.com/reference/get-collection */
export const GetCollectionResponseSchema = z.object({
  _id: z.string(),
  lastUpdated: DateStringSchema,
  createdOn: DateStringSchema,
  name: z.string(),
  slug: z.string(),
  singularName: z.string(),
  fields: z.array(FieldSchema),
})

/** @see https://developers.webflow.com/reference/get-collection */
export type GetCollectionResponse = z.infer<typeof GetCollectionResponseSchema>

/** @see @see https://developers.webflow.com/reference/list-items */
export const GetCollectionItemsResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
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
/** @see https://developers.webflow.com/docs/field-types#imageref--image */
export const ImageRefSchema = z.object({
  alt: z.string().optional().nullable(),
  fileId: z.string(),
  url: z.string(),
})
/** @see https://developers.webflow.com/docs/field-types#imageref--image */
export const ImageRefSetSchema = z.array(ImageRefSchema)
/** @see https://developers.webflow.com/docs/field-types#itemref--reference */
export const ItemRefSchema = z.string()
/** @see https://developers.webflow.com/docs/field-types#itemref--reference */
export const ItemRefSetSchema = z.array(ItemRefSchema)
/** @see https://developers.webflow.com/docs/field-types#imagerefset--multi-image */
export const SetSchema = z.array(ImageRefSchema)
/** @see https://developers.webflow.com/docs/field-types#plain-text */
export const PlainTextSchema = z.string()
/** @see https://developers.webflow.com/docs/field-types#link */
export const LinkSchema = z.string()
/** @see https://developers.webflow.com/docs/field-types#option */
export const OptionSchema = z.string()
/** @see https://developers.webflow.com/docs/field-types#boolean--switch */
export const BoolSchema = z.boolean()
/** @see https://developers.webflow.com/docs/field-types#datetime */
export const DateSchema = DateStringSchema.nullable()
/** @see https://developers.webflow.com/docs/field-types#user */
export const UserSchema = z.string().nullable()
/** @see https://developers.webflow.com/docs/field-types#rich-text */
export const RichTextSchema = z.string()
/** @see https://developers.webflow.com/docs/field-types#video-link */
export const VideoLinkSchema = z.string()
/** @see https://developers.webflow.com/docs/field-types#email */
export const EmailSchema = z.string()
/** @see https://developers.webflow.com/docs/field-types#phone */
export const PhoneSchema = z.string()
/** @see https://developers.webflow.com/docs/field-types#number */
export const NumberSchema = z.string()
/** @see https://developers.webflow.com/docs/field-types#color */
export const ColorSchema = z.string()
