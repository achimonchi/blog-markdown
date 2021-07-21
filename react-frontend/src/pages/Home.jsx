import Layout from "../components/Layout";
import "./../App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCourses} from "../action/courses";

function Home(){

  // const [blogs, setBlog] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(()=>{
    fetchAllCourses();
  }, []);


  const fetchAllCourses = async() => {
    const data = await fetchCourses();
    setCourses(data);
  }


  return(
    <Layout>
      <h1 className="text-4xl">NooBeeCamp Blog</h1>
      <p className="text-xl text-gray-600">Hanya sebuah catatan kecil</p>
      <hr className="my-3" />
      <Link to={"/course/add"}>
        <span className="border px-4 py-2 my-3 bg-blue-500 shadow-md text-white rounded">New Blog</span>
      </Link>
      <div className="grid gap-4 md:grid-cols-2 grid-cols-1 mt-5">
        {
          courses.length > 0
            ? courses.map((course, i)=> (
              <Link key={"course-"+i} to={'/course/detail/'+course.course_title.split(" ").join("-")}>
                <div className="card border p-2 rounded-md shadow hover:shadow-md bg-gray-100 hover:bg-white duration-200 cursor-pointer">
                  <h1>{course.course_title}</h1>
                  <p>{course.course_desc}</p>
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