import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById, addComment } from "../service/postService";
import  useFormattedDate  from "./useFormattedDate";

const ShowPost = () => {
  const [post, setPost] = useState({
    title: "",
    text: "",
    comments: []
  });
  const [commentText, setCommentText] = useState("");
  const { id } = useParams();
 


  useEffect(() => {
    getPostById(id).then(({ data }) => {
      setPost(data);
    });
  }, [id]);

  const createdAt = post?.createdAt ? new Date(post.createdAt) : null;
const formattedCreatedAt = useFormattedDate(createdAt);

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      addComment(commentText, id).then(() => {
        setCommentText("");
        getPostById(id).then(({ data }) => {
          setPost(data);
        });
      });
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">{post.title}</h1>
      <p>Created At: {formattedCreatedAt}</p>
      <div className="card mt-4">
        <div className="card-body">
          <p className="card-text">{post.text}</p>
        </div>
      </div>
      <h2 className="mt-4">Comments</h2>
      {post.comments &&
        post.comments.map((comment) => (
          <div className="card mt-4" key={comment.id}>
            <div className="card-body">
              <p className="card-text">{comment.text}</p>
            </div>
          </div>
        ))}
      <div className="mt-4">
        <h2>Add Comment</h2>
        <div className="form-floating mt-3">
          <textarea
            name="commentText"
            value={commentText}
            onChange={handleCommentChange}
            className="form-control"
            placeholder="Comment"
            style={{ height: "100px" }}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default ShowPost;