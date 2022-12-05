import { useState, useEffect } from "react";
import api from "../api/blogs"
import Feed from "./Feed";

const Home = () => {

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
        <div className="Home flex flex-col space-y-5">
           {blogs.length ? (<Feed blogs={blogs}/>) : 
           (<p className="text-center text-3xl text-pink-500 underline py-4 my-10"> The are currently no Blogs available </p>)}
        </div>
    )
}
export default Home;