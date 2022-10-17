import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function seed() {
    const password = await bcrypt.hash('123', 2)

    const userIterator = 3

    const users = []
    const createUser = async (email, password, firstName, lastName) => {
        const newUser = await prisma.user.create({
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
        users.push(await createUser(
            `user${i}@user.com`,
            password,
            `firstName${i}`,
            `lastName${i}`,
        ))
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
  