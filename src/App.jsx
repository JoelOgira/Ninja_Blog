
import  { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";

const App = () => {
  return (
    <div className="App container px-8 h-screen mx-auto md:w-3/4 lg:w-1/2 md:px-0 bg-gray-200">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;