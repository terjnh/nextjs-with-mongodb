import Head from 'next/head';
import * as React from 'react';
import AirbnbExample from '../components/AirbnbExample';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';

export default function Home({ posts }) {

    const randomProps = {
        param1: "abcdefg",
        param2: "123456"
    }

    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Navbar />
            
            <AirbnbExample
                props={randomProps}
            />


            <main>
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
            </main>

        </div>
    );
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