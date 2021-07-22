import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchCourseByTitle } from "../../action/courses";
import Layout from "../../components/Layout";


function DetailCourse(){
    const {slug} = useParams();
    const [course, setCourse] = useState({})

    useEffect(()=>{
        const title = slug.split("-").join(" ");
        fetchByTitle(title);
    }, [slug])

    const fetchByTitle=async(course_title)=>{
        const data = {
            course_title: course_title
        }
        const dataRes = await fetchCourseByTitle(data);
        setCourse(dataRes.data)
    }

    return (
        <Layout>
            <h1>Detail Course {slug}</h1>
            <Link to={'/'} className="">
                <span className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 duration-200 shadow-md">Back</span>
            </Link>
            <div className="my-4">
                <p>
                    {console.log(course)}
                    {course.course_desc}
                </p>
                <p>
                    {course.course_level}
                </p>
                <p>
                    Rp. {parseInt(course.course_price).toLocaleString("id-ID", {
                        maximumFractionDigits:2,
                        minimumFractionDigits:0
                    })}
                </p>
                <div className="my-3">
                    <span className="bg-green-200 px-4 py-2 box-border rounded-md shadow-lg border-4 border-green-100"> {course.course_type} </span>
                </div>
                <div className="my-5">
                    {
                        course?.course_tags?.map((tag)=>(
                            <span className="bg-gray-100 mr-2 px-2 py-1 box-sizing rounded">{tag}</span>

                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}


export default DetailCourse;