import { useState, useEffect } from "react";
import {  deletePostById, getPosts } from "../service/postService";
import { Link } from "react-router-dom";
const AppPosts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts().then(({data}) => setPosts(data));
    }, []);

    const handleDelete = (id) => {
      const shouldDelete = window.confirm(
        "Are you sure?"
      );
      if (shouldDelete) {
        deletePostById(id);
        getPosts().then(({ data }) => setPosts(data));
      }
    };

return (
  <div class="container">
       
        <h1 class="mt-4">Posts</h1>
        {posts.map((post, id) => (
          <div class="card mt-4" key={id}>
          <div class="card-body">
      <h2 class="card-title">{post.title}</h2>
      <p class="card-text">{post.text}</p>
      <div className="d-flex justify-content-start align-items-center">
      <div><Link to={`${post.id}`}>
        <div class="btn btn-primary">View Post</div>
        </Link></div>
        <div>
        <Link to={`/posts/edit/${post.id}`} className="btn btn-primary">
          Edit
        </Link>
      </div>
      <button type="delete" onClick={() => handleDelete(post.id)}>
                    Delete
                  </button>
      </div>
        </div>
        </div>
      ))}
    
    </div>
  );
        }
export default AppPosts;