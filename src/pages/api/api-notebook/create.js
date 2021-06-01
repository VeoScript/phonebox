import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async(req, res) => {
  const data = JSON.parse(req.body)
  const createdNotes = await prisma.notes.create({data})
  res.json(createdNotes)
}