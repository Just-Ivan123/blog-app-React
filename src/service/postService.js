import { API } from "../shared/api";

export const getPosts = () => {
  return API.get("/posts");
};

export const getPostById = (id) => {
  return API.get(`/posts/${id}?filter={"include":["comments"]}`);
};

export const editPostById = (id, post) => {
  return API.patch(`/posts/${id}`, post);
};

export const createPost = (title, text) => {
  return API.post("/posts", {
    title,
    text
  });
};

export const deletePostById = (id) => {
  return API.delete(`/posts/${id}`);
};

export const addComment = (comment, postId) => {
  return API.post(`/posts/${postId}/comments`, {
    text: comment
  });
};