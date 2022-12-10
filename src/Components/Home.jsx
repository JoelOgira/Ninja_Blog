import Feed from "./Feed";

const Home = ({blogs, error, isLoading}) => { 

    return (
        <div className="Home flex flex-col space-y-5">
            {isLoading && <p className="text-3xl my-10">Blogs are loading... </p>}
            {!isLoading && error && <p className="text-3xl text-red-600 my-10">{error}</p>}
            {!isLoading && !error && (blogs.length ? <Feed blogs={blogs}/> : 
                <p className="text-center text-3xl text-pink-500 underline py-4 my-10"> The are currently no Blogs available </p>)
            }
        </div>
    )
}
export default Home;