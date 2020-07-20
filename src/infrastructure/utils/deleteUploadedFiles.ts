import fs from 'fs'
import path from 'path'

export const deleteUploadedFiles = async (imageRoute: string) => {
  const imagePath = path.resolve(`uploads/${imageRoute}`)
  if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath)
}
