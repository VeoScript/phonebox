import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async(req, res) => {
  const { id } = req.query
  const getID = parseInt(id)

  const deletedNotes = await prisma.notes.delete({
    where: {
      id: getID
    }
  })
  res.json(deletedNotes)
}