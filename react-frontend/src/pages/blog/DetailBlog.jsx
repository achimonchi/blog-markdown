import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { fetchBlog } from "../../action/blog";
import Layout from "../../components/Layout";


function DetailBlog(){
    const {slug} = useParams();
    const [blog, setBlog] = useState({});

    useEffect(()=>{
        const title = slug.split("-").join(" ");
        console.log(title)
        fetchByTitle(title);
    }, [slug])

    const fetchByTitle=async(title)=>{
        const data = await fetchBlog();
        const blogTemp = data.find((d)=>d.title === title);
        console.log({blogTemp, title, data})
        setBlog(blogTemp);
    }

    return (
        <Layout>
            <h1>Detail Blog {slug}</h1>
            <Link to={'/'} className="">
                <span className="px-4 py-2 bg-gray-300 rounded shadow-md">Back</span>
            </Link>
            <div className="my-4">
                <ReactMarkdown
                    components={components}
                    children={blog.desc ?? "# no desc"}
                >
                </ReactMarkdown>
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

export default DetailBlog;