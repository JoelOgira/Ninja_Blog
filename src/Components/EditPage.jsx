import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/blogs";
import DataContext from "../Context/DataContext";

const EditPage = () => {
    const [editTitle, setEditTitle] = useState('');
    const [editAuthor, setEditAuthor] = useState('');
    const [editBody, setEditBody] = useState('');
    const { blogs, setBlogs } = useContext(DataContext);
    const { id } = useParams();
    const history = useNavigate();
    const blog = blogs.find((blog) => blog.id == id);

    useEffect(() => {   
        if(blog) {
            setEditTitle(blog.title);
            setEditAuthor(blog.author);
            setEditBody(blog.body);
        }      
    }, [blog, setEditTitle, setEditAuthor, setEditBody])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM yy, yyyy pp');
        const editedBlog = {id, datetime, title:editTitle, author:editAuthor, body:editBody}
        try {
            const response = await api.put(`/blogs/${id}`, editedBlog);
            setBlogs(blogs.map((blog) => blog.id === id ? { ...response.data} : blog));
            setEditAuthor('');
            setEditBody('');
            setEditTitle('');
            history(`/blog/${editedBlog.id}`);
        } catch (error) {
            console.log(`Error: ${error.message}`) 
        }
    }

    return (
        <div className="Edit">
            <h1 className="text-center text-4xl underline font-semibold mb-3">
                Edit Blog
            </h1>
            <form onSubmit={e => e.preventDefault()}>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Blog Title</label>
                    <input type="text" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:border-gray-600" placeholder="Title" required
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 ">Author</label>
                    <input type="text" id="author" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:border-gray-600" 
                    placeholder="Author"
                    required
                    value={editAuthor}
                    onChange={e => setEditAuthor(e.target.value)}
                    />
                </div>
                <div className="mb-6">                
                    <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 ">Blog</label>
                    <textarea id="body" rows="12" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={editBody}
                    onChange={e => setEditBody(e.target.value)}
                    ></textarea>
                </div>
                <button onClick={() => handleEdit(blog.id)} type="submit" className="cursor-pointer text-white bg-pink-500 hover:bg-pink-900 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm p-3 text-center">Edit Blog</button>
                <Link to={`/blog/${blog?.id}`}>
                    <button type="submit" className="mx-6 cursor-pointer text-white bg-pink-800 hover:bg-pink-300 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm p-3 text-center">Cancel</button>
                </Link>
            </form>
        </div>
    )
}

export default EditPage;