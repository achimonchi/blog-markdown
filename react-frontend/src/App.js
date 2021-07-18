import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AddBlog from "./pages/blog/AddBlog";
import DetailBlog from "./pages/blog/DetailBlog";

function App(){
  return (
    <Router>
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
      </Switch>
    </Router>
  )
}

export default App;