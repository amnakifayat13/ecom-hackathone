import { type SchemaTypeDefinition } from 'sanity'
import {bestSellingProduct} from './bestSellingProduct'
import {category} from './category'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bestSellingProduct, category],
}
