import { useState, useEffect } from "react";
import  { Routes, Route, useNavigate } from "react-router-dom";
import api from "./api/blogs"
import {format} from "date-fns"
import BlogPage from "./Components/BlogPage";
import Header from "./Components/Header";
import Home from "./Components/Home";
import New from "./Components/New";

const App = () => {

  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  const history = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = blogs.length ? blogs[blogs.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM yy, yyy pp');
    const newBlog = {id, author, datetime, title, body}
    try {
      const response = await api.post('/blogs', newBlog);
      setBlogs([...blogs, response.data]);
      setTitle('');
      setAuthor('');
      setBody('');
      history('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="App container px-8 h-screen mx-auto md:w-3/4 lg:w-1/2 md:px-0 bg-gray-200">
      <Header />
      <Routes>
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route path="/blog" element={<New 
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          body={body}
          setBody={setBody}
          handleSubmit={handleSubmit}  
        />} />
        <Route path="/blog/:id" element={<BlogPage blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default App;