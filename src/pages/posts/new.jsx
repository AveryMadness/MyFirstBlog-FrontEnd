import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {Container} from "@/components/Container";
import {createPost} from "@/api/postsApi";

export default function NewPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!title) errors.title = 'Title is required';
        if (!description) errors.description = 'Description is required';

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            await createPost(title, description).then(response => {
                
            if (response.post !== undefined)
            {
                var post = response.post;
                var slug = post.slug;
                
                console.log(slug);
                
                router.push(`/posts/${slug}`)
            }
            else
            {
                errors.response = response.errors[0];
                setErrors(errors);
            }
            });
        }
    };

    return (
        <>
            <Head>
                <title>Create a New Post</title>
            </Head>
            <Container className="mt-16 sm:mt-32">
            <div className="container mx-auto mt-8">
                <h1 className="text-2xl font-bold">Create a New Post</h1>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="rounded-md bg-teal-600 px-4 py-2 text-white"
                    >
                        Create Post
                    </button>
                    {errors.response && (
                        <p className="text-red-500 text-sm mt-1">{errors.response}</p>
                    )}
                </form>
            </div>
            </Container>
        </>
    );
}
