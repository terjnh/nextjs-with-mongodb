import { Box, Center, Grid, GridItem, Heading } from '@chakra-ui/react';
import * as React from 'react';
import Navbar from '../components/Navbar';
import AltPostCard from './components/AltPostCard';

export default function Posts({ posts }) {


    return (
        <div>
            <Navbar />

            <Box mt={20} ml={20} mr={20}>
                <Heading as='h4' size='2xl'>View Posts</Heading>
                <Grid
                    h='250px'
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(2, 1fr)'
                    gap={2}
                >
                    <GridItem rowSpan={2} colSpan={1} bg='gray.500' >
                        <Center h='250px'>
                            Main Grid Text 1
                        </Center>
                    </GridItem>
                    <GridItem rowSpan={2} colSpan={1} bg='gray.600'>
                        <Center h='250px'>
                            Main Grid Text 2
                        </Center>
                    </GridItem>
                </Grid>
            </Box>

            {posts.length === 0 ? (
                <Box mt={20} ml={20} mr={20}>
                    <Heading>No Posts Available</Heading>
                </Box>
            ) : (
                <Grid mt={10} ml={20} mr={20}
                    templateColumns='repeat(3, 1fr)' gap={6}
                >
                    {posts.map((post, i) => (
                        <AltPostCard post={post} />
                    ))}

                </Grid>
            )}



            {/* <main>
                <div className={styles.container}>
                    {posts.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <ul>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>
                    )}
                </div>
            </main> */}

        </div>
    )
}



export async function getServerSideProps(ctx) {
    // get the current environment
    let dev = process.env.NODE_ENV !== 'production';
    let { DEV_URL, PROD_URL } = process.env;

    // request posts from api
    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
    // extract the data
    let data = await response.json();

    return {
        props: {
            posts: data['message'],
        },
    };
}