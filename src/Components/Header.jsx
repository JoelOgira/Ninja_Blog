import { Link } from "react-router-dom";
import Search from "./Search.";
import { useContext } from "react";
import DataContext from "../Context/DataContext";

const Header = () => {
    
    const { search, setSearch } = useContext(DataContext);

    return (
        <div className="Header w-full a:cursor-pointer sticky top-0 z-30 bg-gray-200 py-6 mb-6">
            <div className="flex items-center justify-between">
                <Link to="/" className="cursor-pointer pt-3">
                    <h1 className="font-semibold text-3xl text-pink-500">
                        The Ninja Blog
                    </h1>
                </Link>
                <div className="pt-3">
                    <Search search={search} setSearch={setSearch} />
                </div>
                <div className="flex space-x-4 items-center pt-2">
                    <Link to="/" >
                        <button className="p-3 border-solid border-2 border-pink-500 hover:text-white hover:bg-pink-500 rounded-md">
                            Home
                        </button>
                    </Link>
                    <Link to="/blog">
                        <button className="text-white border-solid border-2 border-pink-500 bg-pink-500 p-3 rounded-md hover:bg-transparent hover:text-black">
                            New Blog
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Header;