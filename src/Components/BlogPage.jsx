import { useParams, Link } from "react-router-dom";


const BlogPage = ({ blogs }) => {

  const {id} = useParams();
  const blog = blogs.find(blog => (blog.id).toString() === id);

  return (
    <div className="">
      { blog && 
        <>
          <h5 className="mb-2 text-4xl font-semibold tracking-tight text-pink-500 ">{blog.title}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 text-2xl my-3">Written by {blog.author}</p>
          <p className="font-normal text-gray-700 dark:text-gray-400">{blog.datetime}</p>
          <hr className="my-3 w-full h-px bg-black border-0" />
          <p className="leading-loose text-lg mb-4">{blog.body}</p>
          
        </>
      }
      { !blog && 
        <>
        </>
      }
    </div>
  )
}

export default BlogPage;