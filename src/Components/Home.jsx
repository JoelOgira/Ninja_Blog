import Feed from "./Feed";

const Home = ({blogs}) => { 

    return (
        <div className="Home flex flex-col space-y-5">
           {blogs.length ? (<Feed blogs={blogs}/>) : 
           (<p className="text-center text-3xl text-pink-500 underline py-4 my-10"> The are currently no Blogs available </p>)}
        </div>
    )
}
export default Home;