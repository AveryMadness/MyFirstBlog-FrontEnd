import API from "./axiosConfig"
import axios from "axios"

export const getPosts = () => {
  try {
    return API.get('/posts/')
      .then((res) => res.data)
  }
  catch (e) {
    console.error(e)
    return []
  }
}

export const getPost = (postSlug) => {
  try {
    return API.get(`/posts/${postSlug}`)
      .then((res) => res.data)
  }
  catch (e) {
    console.error(e)
    return {}
  }
}

export const createPost = async (title, description) => {
  try {
    const response = await axios.post('http://localhost:5000/posts/', {
      title: title,
      description: description
    });
    console.log(response);
    return response.data; // Explicitly return response here
  } catch (e) {
    console.error(e);
    return { success: false, errors: ["Failed to create post."] };
  }
}
