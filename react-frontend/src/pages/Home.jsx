import Layout from "../components/Layout";
import "./../App.css";

import {fetchBlog} from "./../action/blog"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home(){

  const [blogs, setBlog] = useState([]);

  useEffect(()=>{
    fetchAllBlog();
  }, []);

  const fetchAllBlog=async()=>{
    const data = await fetchBlog();
    console.log({data})
    setBlog(data);
  }


  return(
    <Layout>
      <h1 className="text-4xl">NooBeeCamp Blog</h1>
      <p className="text-xl text-gray-600">Hanya sebuah catatan kecil</p>
      <hr className="my-3" />
      <Link to={"/blog/add"}>
        <span className="border px-4 py-2 my-3 bg-blue-500 shadow-md text-white rounded">New Blog</span>
      </Link>
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1 mt-5">
        {
          blogs.length > 0
            ? blogs.map((blog, i)=> (
              <Link key={"blog"+i} to={'/blog/detail/'+blog.title.split(" ").join("-")}>
                <div className="card border p-2 rounded-md shadow hover:shadow-md bg-gray-100 hover:bg-white duration-200 cursor-pointer">
                  <h1>{blog.title}</h1>
                  <p>{blog.desc}</p>
                </div>
              </Link>
            ))
            : <h1>Belum ada aktifitas ...</h1>
        }
      </div>
    </Layout>
  )
}

export default Home;