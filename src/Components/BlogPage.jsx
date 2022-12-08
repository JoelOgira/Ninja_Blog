import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";


const BlogPage = ({ blogs, handleDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {id} = useParams();
  const blog = blogs.find(blog => (blog.id).toString() === id);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>
      { blog && 
        <>
          <h5 className="mb-2 text-4xl font-semibold tracking-tight text-pink-500 ">{blog.title}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-2xl my-3">Written by {blog.author}</p>
          <p className="font-normal text-gray-700 dark:text-gray-400">{blog.datetime}</p>
          <hr className="my-3 w-full h-px bg-black border-0" />
          <p className="leading-loose text-lg mb-4">{blog.body}</p>

          <div className="flex space-x-4 items-center pt-2 ">
            <Link to="/" >
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