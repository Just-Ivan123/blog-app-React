import { useState, useEffect } from "react";
import { editPostById, createPost } from "../service/postService";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getPostById } from "../service/postService";


const AddPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState({
    title: "",
    text: ""
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getPostById(id).then(({ data }) => {
        setPosts(data);
        console.log(data);
      });
    }
  }, [id]);

 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPosts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (posts.title.length < 2) {
      return alert(`Title field must be more than 2 characters`);
    }
    if (posts.text.length < 3) {
      return alert(`Text field must be more than 300 characters`);
    }
   

    if (id) {
      editPostById(id, posts);
    } else {
      createPost(
        posts.title,
        posts.text,
      );
      setPosts({
        title: "",
        text: "",
      });
      
    }
    
    navigate("/");
  };

  const handleReset = () => {
    setPosts({
      title: "",
      text: "",
    });
  };

  return (
    <div>
      <form
        className="container mt-5"
        onSubmit={(event) => handleSubmit(event, posts)}
      >
        <div className="form-floating mt-3">
        <h1 class="mt-4">Title</h1>
          <input
            name="title"
            value={posts.title}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="title"
          />
        </div>
        <div className="form-floating mt-3">
        <h1 class="mt-4">Text</h1>
          <textarea
            name="text"
            value={posts.text}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="text"
            style={{ height: "300px" }}
          />
        </div>
        <hr></hr>
        <button
          class="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Add
        </button>
        <button
          class="btn btn-primary"
          type="reset"
          onClick={handleReset}
        >
          Reset
        </button>
        <Link class="btn btn-primary" to="/posts">
          Go to Posts
        </Link>
      </form>
    </div>
  );
};
export default AddPost;
