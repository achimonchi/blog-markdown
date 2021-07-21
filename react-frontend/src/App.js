import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AddBlog from "./pages/blog/AddBlog";
import DetailBlog from "./pages/blog/DetailBlog";
import Navbar from "./components/Navbar";
import AddCourse from "./pages/courses/AddCourses";
import DetailCourse from "./pages/courses/DetailCourse";

function App(){
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/blog/add" exact>
          <AddBlog/>
        </Route>
        <Route path="/blog/detail/:slug">
          <DetailBlog/>
        </Route>

        <Route path="/course/add" exact>
          <AddCourse/>
        </Route>
        <Route path="/course/detail/:slug">
          <DetailCourse/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;