import { data } from '@/lib/data'
import { connectToDatabase } from '@/lib/db'
import Product from './models/product.model'
import { cwd } from 'process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(cwd())

const main = async () => {
  try {
    const { products } = data
    await connectToDatabase(process.env.MONOGO_URI)

    await Product.deleteMany()
    const createdProducts = await Product.insertMany(products)

    console.log({ createdProducts, message: 'seeded database successfully' })
    process.exit(0)
  } catch (error) {
    console.log(error)
    throw new Error('Failed to seed database')
  }
}

main()
