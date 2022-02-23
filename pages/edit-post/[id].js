import {
    Button,
    Box,
    Input,
    FormControl, FormErrorMessage, FormLabel,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function EditPost({ posts }) {
    const router = useRouter();
    const pid = router.query.id;

    const [post, setPost] = useState({})

    useEffect(() => {
        for (const idx in posts) {
            if (posts[idx]._id === pid) {
                setPost(posts[idx])
            }
        }
        console.log("post:", post)
        
    }, [post])


    function validateName(value) {
        let error
        if (!value) {
            error = 'Name is required'
        } else if (value.toLowerCase() !== 'naruto') {
            error = "Jeez! You're not a fan 😱"
        }
        return error
    }
    function validateTitle(value) {
        let error
        if (!value) { error = 'Title is required' }
        return error
    }
    return (
        <Box
            mt={8}
            mx="auto"
            maxW="800px"
            w="100%"
        >
            <Formik
                validateOnMount
                enableReinitialize
                initialValues={{ name: 'Sasuke', title: post.title }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        actions.setSubmitting(false)
                    }, 1000)
                }}
            >
                {(props) => (
                    <Form>
                        <Field name='name' validate={validateName}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel htmlFor='name'>First name</FormLabel>
                                    <Input {...field} id='name' placeholder='name' />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <br />
                        <Field name='title' validate={validateTitle}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.title && form.touched.title}>
                                    <FormLabel htmlFor='title'>Title</FormLabel>
                                    <Input {...field} id='title' placeholder='title' />
                                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={4}
                            colorScheme='teal'
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
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