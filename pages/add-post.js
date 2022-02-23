import { Text, Input, Button, IconButton, Textarea } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [collName, setCollName] = useState('');

    const router = useRouter();

    const createNewCollection = async => {

    }

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!title || !content) return setError('All fields are required');

        // post structure
        let post = {
            title,
            content,
            published: false,
            createdAt: new Date().toISOString(),
        };
        // save the post
        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
        });

        // get the data
        let data = await response.json();

        if (data.success) {
            // reset the fields
            setTitle('');
            setContent('');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <form onSubmit={handlePost} className={styles.form}>
                    {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}
                    <div className={styles.formItem}>
                        <label>Title</label>
                        <Input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="title"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Content</label>
                        <Textarea
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Post content"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <Button colorScheme='blue' type="submit">Add post</Button>

                    </div>

                    <br></br>
                    <Text color='gray.500' isTruncated>
                        Temporary placeholder for adding a new collection to sample_posts.posts
                    </Text>
                    <div>
                        <Input
                            type="text"
                            name="collectionName"
                            onChange={(e) => setCollName(e.target.value)}
                            value={collName}
                            placeholder="collectionName"
                        />
                    </div>
                    <div>
                        <button onClick={() => {
                            router.push(`/api/test/${collName}`)
                        }}>Create Collection</button>
                    </div>
                </form>
            </div>
        </div>
    );
}