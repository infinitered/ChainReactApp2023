import fs from "fs"
import path from "path"
import { exec } from "child_process"
import {
  Field,
  GetCollectionResponse,
  ListCollectionsResponse,
} from "../app/services/api/webflow-api.schema"
import { Webflow } from "../app/services/api/webflow-api.service"
import { SITE_ID } from "../app/services/api/webflow-consts"
import { axiosInstance } from "../app/services/api/axios"

const WEBFLOW_API_TOKEN = process.env.WEBFLOW_API_TOKEN
if (!WEBFLOW_API_TOKEN) {
  console.error("WEBFLOW_API_TOKEN is required to be passed as an environment variable.")
  process.exit(0)
}

axiosInstance.defaults.baseURL = `https://api.webflow.com`
axiosInstance.defaults.headers.common.Authorization = `Bearer ${WEBFLOW_API_TOKEN}`
const webflow = Webflow({ api: axiosInstance })

const $ = (cmd: string) =>
  new Promise((resolve, reject) =>
    exec(cmd, { cwd: path.join(__dirname, "..") }, (err, stdout) =>
      err ? reject(err) : resolve(stdout),
    ),
  )

const createCollectionType = (name: string) => {
  return `export type ${name}Collection = z.infer<typeof ${name}CollectionSchema>`
}

const createCollectionSchema = (collection: GetCollectionResponse) => {
  const name = collection.name.replace(" ", "")
  const typeName = `${name}CollectionSchema`
  const fields = collection.fields.map((f) => {
    const key = f.slug
    const value = `${f.type}Schema${f.required === true ? "" : ".optional()"}`
    return `"${key}": ${value}`
  })

  return (
    `export const ${typeName} = CollectionBaseSchema.extend({${fields.join(",\n")}})` +
    "\n\n" +
    createCollectionType(name) +
    "\n"
  )
}

/**
 * Loop through all of the collections and create a variable named COLLECTIONS_ID
 * that contains the collection ID.
 */
const createCollectionStore = (collections: ListCollectionsResponse) => {
  const collectionIds = collections.map((c) => {
    const key = c.name.replace(" ", "_").toUpperCase()
    const value = c._id
    return `"${key}": "${value}"`
  })

  return `
    export const COLLECTIONS_ID = {
        ${collectionIds.join(",\n")}
    }
    `
}

;(async () => {
  console.log("Fetching all collections from Webflow...")
  const allCollections = await webflow.collection.list(SITE_ID)
  const fields: Field[] = []
  const collectionSchemas: string[] = []

  console.log("Found collections: ", allCollections.map((c) => c.name).join(", "))
  for (const collection of allCollections) {
    console.log("Fetching collection: ", collection.name)
    const data = await webflow.collection.get(collection._id)
    collectionSchemas.push(createCollectionSchema(data))
    fields.push(...data.fields)
  }

  const uniqueFieldSchemas = [...new Set(fields.map((f) => f.type))].map((f) => `${f}Schema`)

  const imports = [
    `import { z } from 'zod'`,
    `import { CollectionBaseSchema, ${uniqueFieldSchemas.join(", ")}} from './webflow-api.schema'`,
  ]

  const collectionStore = createCollectionStore(allCollections)

  const code = [...imports, "\n", ...collectionSchemas, collectionStore].join("\n")

  console.log('Writing generated code to "app/services/api/webflow-api.generated.ts"')
  fs.writeFileSync(path.join(__dirname, "..", "app/services/api/webflow-api.generated.ts"), code)
  console.log("Formatting code...")
  await $("yarn format")
})()
