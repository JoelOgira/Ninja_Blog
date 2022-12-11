import  { Routes, Route } from "react-router-dom";
import BlogPage from "./Components/BlogPage";
import Header from "./Components/Header";
import Home from "./Components/Home";
import New from "./Components/New";
import EditPage from "./Components/EditPage";
import ErrorPage from "./Components/ErrorPage";
import { DataProvider } from "./Context/DataContext";

const App = () => {

  return (
    <div className="App container px-4 h-full mx-auto md:w-3/4 lg:w-1/2 md:px-0 bg-gray-200">
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<New />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/edit/:id" element={<EditPage />}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </DataProvider>
    </div>
  )
}

export default App;