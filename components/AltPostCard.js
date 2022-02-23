import { Box, Button, GridItem, Tag, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AltPostCard({ post }) {
    console.log('post from PostCard:', post)

    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // measurements
    const gridHeight = '200';


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
            <Box mt={5} h='120' align='center'>
                <Tag>
                    Title: {post.title}
                </Tag>
                <Text mt={2}>
                    <b>Content:</b><br/> {post.content}
                </Text>
            </Box>
            <Box h='80' align='center'>
                <Button mt={2} sz="xs" colorScheme='pink'
                    onClick={() => deletePost(post['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </Button>
                <Button mt={2} ml={2} sz="xs" colorScheme='orange'>
                    Publish
                </Button>
            </Box>


        </GridItem >



    )
}