import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
    return (        
        <Link to={`/blog/${blog.id}`} className="block w-full cursor-pointer bg-white border-gray-200 rounded-lg shadow-md hover:bg-pink-100 p-6 my-3">
            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-pink-500 ">{blog.title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Written by {blog.author}</p>
        </Link >
    )
}
export default Blog;