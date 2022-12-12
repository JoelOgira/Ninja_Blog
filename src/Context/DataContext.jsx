import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from "../Hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [blogs, setBlogs] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');
    const { data, error, isLoading } = useAxiosFetch('http://localhost:4200/blogs');

    useEffect(() => {
        setBlogs(data);
    }, [data])

    useEffect(() => {
        const filteredResults = blogs.filter((blog) => ((blog.title).toLowerCase().includes(search.toLowerCase()) || ((blog.author).toLowerCase().includes(search.toLowerCase()))));
        setSearchResults(filteredResults.reverse());
    }, [blogs, search])   

    return (
        <DataContext.Provider value={{
            search, setSearch, searchResults, error, isLoading, blogs, setBlogs
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;