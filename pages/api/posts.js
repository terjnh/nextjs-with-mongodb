import { connect } from 'http2';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { connectToDatabase } = require('../../util/mongodb');
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    // switch the methods
    switch (req.method) {
        case 'GET': {
            return getPosts(req, res);
        }

        case 'POST': {
            return addPost(req, res);
        }

        case 'PUT': {
            return updatePost(req, res);
        }

        case 'DELETE': {
            return deletePost(req, res);
        }

        case 'FINDONE': {
            return findPostById(req, res);
        }
    }
}

// Getting all posts.
async function getPosts(req, res) {
    try {
        let { db } = await connectToDatabase();
        let posts = await db
            .collection('posts')
            .find({})
            .sort({ published: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// Adding a new post
async function addPost(req, res) {
    try {
        let { db } = await connectToDatabase();
        await db.collection('posts').insertOne(JSON.parse(req.body));
        return res.json({
            message: 'Post added successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}


// Updating a post
async function updatePost(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection('posts').updateOne(
            {
                _id: new ObjectId(req.body),
            },
            { $set: { published: true } }
        );

        return res.json({
            message: 'Post updated successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

// deleting a post
async function deletePost(req, res) {
    try {
        let { db } = await connectToDatabase();

        await db.collection('posts').deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'Post deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}



async function findPostById(req, res) {
    try {
        let { db } = await connectToDatabase();
        console.log("postId:", postId)

        let post = await db
        .collection('posts')
        .find({"_id" : ObjectId(req.body)})
            return res.json({
                message: JSON.parse(JSON.stringify(post)),
                success: true,
            });

    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}