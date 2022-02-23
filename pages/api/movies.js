import { connectToDatabase } from "../../util/mongodb";


export default async (req, res) => {

    const { db } = await connectToDatabase();

    try {
        db.createCollection('test123')
        return res.json({
            message: 'Collection added successfully',
        })
    } catch (error) {
        return res.json({
            message: 'Collection could not be added'
        })
    }
};