import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async(req, res) => {
  const { id } = req.query
  const getID = parseInt(id)

  const deletedContact = await prisma.contact.delete({
    where: {
      id: getID
    }
  })
  res.json(deletedContact)
}