import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:  process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion:'2024-12-23',
  useCdn: false, 
  token: "skGXLn6aaF4GWqziKTWKyrHIIuJj9MVzhSUFzBVJJiAQmO3LY3KBC3WmegREvZw26J9ks8JS1cK7Yt4zrqqZvORlSHsknEJWKb95iOCSOVMFdqlfwP2MV9j5Y7mP6lLJeHUxGOX1mkBdta4gNosYWGIDzfdN16v6gzhtAn2QCSUtEbl7fhQD"
})
