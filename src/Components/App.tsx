import Get from "./Get";
import Create from "./Create";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar";
import Query from "./Query";
import About from "./About";
const App: React.FC=()=>
{
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/add' element={<Create/>}/>
      <Route path="/user/:id" element={<About/>}/>
      <Route path="query/user/:id" element={<About/>}/>
      <Route path='/' element={<Get/>}/>
      <Route path='/query' element={<Query/>}/>
    </Routes>
    </>
  );
}

export default App;
