import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import { API } from "./shared/api";
import AppPosts from "./components/AppPosts";
import AddPost from "./components/AddPost";
import SinglePost from "./components/SinglePost";


function App() {
  API.get("/Messages/greet");
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" />}></Route>
      <Route path="/posts" element={<AppPosts />}></Route>
      <Route path="/add" element={<AddPost />}></Route>
      <Route path="/posts/:id" element={<SinglePost />}></Route>
      <Route path="/posts/edit/:id" element={<AddPost />}></Route>
    </Routes>
  );
}

export default App;
