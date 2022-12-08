import { useState, useEffect } from "react";
import  { Routes, Route, useNavigate } from "react-router-dom";
import api from "./api/blogs"
import {format} from "date-fns"
import BlogPage from "./Components/BlogPage";
import Header from "./Components/Header";
import Home from "./Components/Home";
import New from "./Components/New";
import EditPage from "./Components/EditPage";

const App = () => {

  const [blogs, setBlogs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editBody, setEditBody] = useState('');

  const history = useNavigate();

  useEffect(() => {
    const filteredResults = blogs.filter((blog) => ((blog.title).toLowerCase().includes(search.toLowerCase()) || ((blog.author).toLowerCase().includes(search.toLowerCase()))));
    setSearchResults(filteredResults.reverse());
  }, [blogs, search])

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
    const datetime = format(new Date(), 'MMMM yy, yyyy pp');
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

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM yy, yyyy pp');
    const editedBlog = {id, datetime, title:editTitle, author:editAuthor, body:editBody}
    try {
      const response = await api.put(`/blogs/${id}`, editedBlog);
      setBlogs(blogs.map((blog) => blog.id === id ? { ...response.data} : blog));
      setEditAuthor('');
      setEditBody('');
      setEditTitle('');
      history('/');
    } catch (error) {
      console.log(`Error: ${error.message}`) 
    }

  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      history('/');
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  return (
    <div className="App container px-4 h-full mx-auto md:w-3/4 lg:w-1/2 md:px-0 bg-gray-200">
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home blogs={searchResults} />} />
        <Route path="/blog" element={<New 
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          body={body}
          setBody={setBody}
          handleSubmit={handleSubmit}  
        />} />
        <Route path="/blog/:id" element={<BlogPage 
          blogs={blogs} 
          handleDelete={handleDelete}
        />} />
        <Route path="/edit/:id" element={<EditPage
          blogs={blogs}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editAuthor={editAuthor}
          setEditAuthor={setEditAuthor}
          editBody={editBody}
          setEditBody={setEditBody}
          handleEdit={handleEdit}
        />}/>
      </Routes>
    </div>
  )
}

export default App;