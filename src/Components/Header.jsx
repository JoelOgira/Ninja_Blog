import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="Header w-full a:cursor-pointer sticky top-0 z-30 bg-white py-6">
            <div className="flex items-center justify-between">
                <Link to="/" className="cursor-pointer">
                    <h1 className="font-bold text-3xl text-pink-500">
                        The Ninja Blog
                    </h1>
                </Link>
                <div className="flex space-x-4 items-center pt-2">
                    <Link to="/" >
                        <button className="p-4 hover:text-white hover:bg-pink-500 hover:rounded-md">
                            Home
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="text-white bg-pink-500 p-4 rounded-md hover:bg-white hover:text-pink-500">
                            New Blog
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Header;