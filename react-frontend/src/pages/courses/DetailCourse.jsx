import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { fetchBlog } from "../../action/blog";
import { fetchCourseByTitle } from "../../action/courses";
import Layout from "../../components/Layout";


function DetailCourse(){
    const {slug} = useParams();
    const [blog, setBlog] = useState({});

    useEffect(()=>{
        const title = slug.split("-").join(" ");
        fetchByTitle(title);
    }, [slug])

    const fetchByTitle=async(course_title)=>{
        const data = {
            course_title: course_title
        }
        const dataRes = await fetchCourseByTitle(data);
        console.log({dataRes})
    }

    return (
        <Layout>
            <h1>Detail Course {slug}</h1>
            <Link to={'/'} className="">
                <span className="px-4 py-2 bg-gray-300 rounded shadow-md">Back</span>
            </Link>
            <div className="my-4">
                {/* <h1>{blog.title ?? "Title"}</h1>
                <div className="mb-3">
                    {
                        blog.tags 
                            ? blog.tags.map((tag,i)=>(
                                <span className="border px-2 py-1 mr-1 bg-gray-100 rounded-xl">
                                    {tag}
                                </span>
                            ))
                            : ""
                    }
                </div>
                <hr />
                <ReactMarkdown
                    components={components}
                    children={blog.desc ?? "# no desc"}
                >
                </ReactMarkdown> */}
            </div>
        </Layout>
    )
}

const components = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter style={docco} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
      ) : (
        <code className={className} {...props} />
      )
    }
  }

export default DetailCourse;