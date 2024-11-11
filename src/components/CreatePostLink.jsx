import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client"
import { useMemo } from "react"

const CreatePostButton = () => {
    return (
        <Link
            href="/posts/new"
            className="whitespace-nowrap relative block px-3 py-2 transition hover:text-teal-500"
        >
            Create Post
        </Link>
    )
};

const CreatePostLink = () => {
    const { user, isLoading } = useUser();
    const isAuthenticated = useMemo(() => !isLoading && !!user, [user, isLoading])

    return (
        isAuthenticated ?
            <CreatePostButton /> : null
    )
}

export default CreatePostLink
