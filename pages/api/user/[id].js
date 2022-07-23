import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

export default async (req, res) => {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const data = await User.findById(req.query.id)
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
            break
        case 'PUT':
            try {
                const data = await User.findByIdAndUpdate(req.query.id, req.body, { upsert: true })
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
            break
        case 'DELETE':
            try {
                await User.findByIdAndDelete(req.query.id)
                res.status(204).json({ message: 'success' })
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
            break
        default:
            res.status(404).json({ error: "404 NOT FOUND" })
            break
    }
}