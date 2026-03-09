import { useState } from "react"

const usePosts = () => {
    const initialPost = {
        title: "",
        description: ""
    }

    const [post, setPost] = useState(initialPost)

    const [posts, setPosts] = useState([])

    const [errors, setErrors] = useState(initialPost)

    const handleCreatePost = () => {
        if(post.title && post.description) {
            setPosts(prev => [...prev, post])

            setPost({
                title: "",
                description: ""
            })

            setErrors(initialPost)
        } else {
            const newErrors = {}
            if(!post.title) {
                newErrors.title = "Title cannot be empty."
            }

            if(!post.description) {
                newErrors.description = "Description cannot be empty."
            }

            setErrors({
                title: newErrors.title ? newErrors.title : "",
                description: newErrors.description ? newErrors.description : ""
            })
        }
    }

    const handleDeletePost = (postToDelete) => {
        setPosts([...posts.filter((post) => post.title !== postToDelete.title)])
    }

   return {
    posts,
    post,
    setPost,
    handleCreatePost,
    handleDeletePost,
    errors
   }
}

export default usePosts