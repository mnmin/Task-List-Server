import dbClient from '../utils/dbClient.js'

export const createUser = async (req, res) => {
    const { email, password } = req.body
    // const { id } = req.user

    if(!email) {
        return res.status(400).json('Must provide email')
    }
    if(!password) {
        return res.status(400).json('Must provide password')
    }

    try {
        const createdUser = await dbClient.post.create({
            data: {
                email,
                password
            }
        })
        return res.status(200).json({ post: createUser })
    } catch (err) {
        return res.status(400).json('Unable to create user')
    }

}