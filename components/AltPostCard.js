import {
    Box,
    Button,
    GridItem,
    Tag,
    Text,
    Link
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AltPostCard({ post }) {
    console.log(post)
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // measurements
    const gridHeight = '250';

    // Publish post
    const publishPost = async (postId) => {
        // change publishing state
        setPublishing(true);
        try {
            // Update post
            await fetch('/api/posts', {
                method: 'PUT',
                body: postId,
            });

            // reset the publishing state
            setPublishing(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // Stop publishing state
            return setPublishing(false);
        }
    };
    // Delete post
    const deletePost = async (postId) => {
        //change deleting state
        setDeleting(true);

        try {
            // Delete post
            await fetch('/api/posts', {
                method: 'DELETE',
                body: postId,
            });

            // reset the deleting state
            setDeleting(false);

            // reload the page
            return router.push(router.asPath);
        } catch (error) {
            // stop deleting state
            return setDeleting(false);
        }
    };


    return (
        <GridItem w='100%' h={gridHeight} bg='blue.500'>
            <Box mt={5} h='140' align='center'>
                <Tag>
                    Title: {post.title}
                </Tag>
                <Text mt={2}>
                    <b>Content:</b><br /> {post.content}
                </Text>

            </Box>
            <Box h='110' align='center'>
                <NextLink href="/edit-post/[id]" as={`/edit-post/${post._id}`}>
                    <Button mt={2} mr={2} sz="xs" colorScheme='green'>
                        Edit
                    </Button>
                </NextLink>
                <Button mt={2} sz="xs" colorScheme='pink'
                    onClick={() => deletePost(post['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </Button>
                {!post.published ? (
                    <Button mt={2} ml={2} sz="xs" colorScheme='orange'
                        onClick={() => publishPost(post._id)}>
                        {publishing ? 'Publishing' : 'Publish'}
                    </Button>) : null}

                {post.published
                    ? (<Text color='green.300' mt={2}>Post published!</Text>)
                    : null}
            </Box>

        </GridItem >
    )
}