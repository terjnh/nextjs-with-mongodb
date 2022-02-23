import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { pid } = req.query;
    console.log('pid:', pid)

    const { db } = await connectToDatabase();

    try {
        db.createCollection(pid)
        return res.json({
            message: 'Collection added successfully',
        })
    } catch (error) {
        return res.json({
            message: 'Collection could not be added'
        })
    }
};