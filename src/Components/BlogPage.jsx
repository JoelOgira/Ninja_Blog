import { useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import DataContext from "../Context/DataContext";
import api from "../api/blogs"

const BlogPage = () => {
  const { blogs, setBlogs } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {id} = useParams();
  const history = useNavigate();
  const blog = blogs.find(blog => (blog.id).toString() === id);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
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
    <div>
      { blog && 
        <>
          <h5 className="mb-2 text-4xl font-semibold tracking-tight text-pink-500 ">{blog.title}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-2xl my-3">Written by {blog.author}</p>
          <p className="font-normal text-gray-700 dark:text-gray-400">{blog.datetime}</p>
          <hr className="my-3 w-full h-px bg-black border-0" />
          <textarea value={blog.body} readOnly className="w-full h-screen bg-transparent focus:outline-none" ></textarea>

          <div className="flex space-x-4 items-center pt-2 ">
            <Link to={`/edit/${blog.id}`} >
              <button className="p-3 bg-pink-500 text-white mb-10 border-solid border-2 border-pink-500 hover:text-black hover:bg-transparent rounded-md">
                  Edit Blog
              </button>
            </Link>            
            <button onClick={handleModal} className="text-black mb-10 border-solid border-2 border-pink-500 hover:bg-pink-500 p-3 rounded-md hover:text-white">
                Delete Blog
            </button>            
          </div>
          { isModalOpen && <DeleteModal handleDelete={handleDelete} handleModal={handleModal} blog={blog} />}
        </>
      }
      { !blog && 
        <>
          <div className="flex items-center justify-center mt-11 py-11">
            <Link to="/">
              <p className="text-4xl leading-loose cursor-pointer text-center">
                The are no blogs currently available. <br />
                Go Back to Homepage
              </p>
            </Link>
          </div>
        </>
      }
    </div>
  )
}

export default BlogPage;