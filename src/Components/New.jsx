import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import DataContext from "../Context/DataContext";
import api from "../api/blogs";


const New = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const { blogs, setBlogs } = useContext(DataContext);
    const history = useNavigate();

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

    return ( 
        <div className="New">
            <h1 className="text-center text-4xl underline font-semibold mb-3">
                Create Blog
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Blog Title</label>
                    <input type="text" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:border-gray-600" placeholder="Title" required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 ">Author</label>
                    <input type="text" id="author" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:border-gray-600" 
                    placeholder="Author"
                    required
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    />
                </div>
                <div className="mb-6">                
                    <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 ">Blog</label>
                    <textarea id="body" rows="16" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="cursor-pointer text-white bg-pink-500 hover:bg-pink-900 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm p-3 text-center">Add Blog</button>
            </form>
        </div>
     );
}
 
export default New;