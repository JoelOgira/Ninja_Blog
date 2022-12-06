import { useState, useEffect } from "react";
import  { Routes, Route } from "react-router-dom";
import api from "./api/blogs"
import BlogPage from "./Components/BlogPage";
import Header from "./Components/Header";
import Home from "./Components/Home";
import New from "./Components/New";

const App = () => {

  const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await api.get('/blogs');
                setBlogs(response.data);
            } catch (error) {
                console.log(error.message);   
            }
        }
        getBlogs();
    }, []);

  return (
    <div className="App container px-8 h-screen mx-auto md:w-3/4 lg:w-1/2 md:px-0 bg-gray-200">
      <Header />
      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route path="/blog" element={<New />} />
        <Route path="/blog/:id" element={<BlogPage blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default App;