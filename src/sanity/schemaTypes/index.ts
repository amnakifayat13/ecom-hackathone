import { type SchemaTypeDefinition } from 'sanity'
import {product} from './product'
import {category} from './category'
import {order} from './order'
import reviews from './reviews'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, order, reviews]
}
