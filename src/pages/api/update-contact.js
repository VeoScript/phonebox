import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async(req, res) => {
  const data = JSON.parse(req.body)
  const updatedContact = await prisma.contact.update({data})
  res.json(updatedContact)
}