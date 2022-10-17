import { PrismaClient } from '@prisma/client'
import bycrypt from bycrypt

const prisma = new PrismaClient()

async function seed() {
    const password = await bycrypt.hash('123', 2)

    const userIterator = 2

    const users = []
    const createUser = async (email, password) => {
        const newUser = await prisma.curriculum.create({
            data: {
                email: email,
                password,
                profile: {
                    create: {
                        firstName: firstName,
                        lastName: lastName
                    }
                }
            }
        })
        return newUser
    }

    for (let i = 1; i <= userIterator; i++) {
        users.push(await createUser())
      }
    
      console.log(
        'Users',
        users
      )
}
seed().catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
  