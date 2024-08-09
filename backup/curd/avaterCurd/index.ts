import fs from 'fs/promises'
import { AvaterType } from '../../../@types/avaterType'


export const readAvater = async (): Promise<AvaterType[]> => {
  const filePath = "./src/data/avater.json"
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch(error) {
    console.error('Error reading avater JSON file: ',error)
    throw error
  }
}