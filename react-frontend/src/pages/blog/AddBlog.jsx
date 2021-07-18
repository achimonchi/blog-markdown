import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import {docco} from "react-syntax-highlighter/dist/esm/styles/hljs"
import { fetchBlog } from "../../action/blog";
import Layout from "../../components/Layout";

import "./../../App.css"
function AddBlog() {
  const [source, setSource] = useState('# title');
  const [statPrev, setStatPrev] = useState(true);
  const [title, setTitle] = useState("");

  const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log({title,source})
      const blogsNow = await fetchBlog();
      blogsNow.push({id:new Date().getTime(), title, desc:source})
      const dataString = JSON.stringify(blogsNow);
      localStorage.setItem("blogs", dataString)
  }


  return (
    <div>
        <Layout>
            <h1 className="my-3">Create Blog</h1>
            <Link to={'/'} className="">
                <span className="px-4 py-2 bg-gray-300 rounded shadow-md">Back</span>
            </Link>
            <div className="grid gap-2">
                <form onSubmit={handleSubmit}>
                    <div>
                        {}
                        <div className="grid gap-2 mt-5 mb-5">
                            <label htmlFor="">Title Blog</label>
                            <input type="text" className="p-2 border rounded" onChange={(e)=>setTitle(e.target.value)} />
                        </div>
                        <div className="grid gap-2 mt-5 mb-5 md:grid-cols-2">
                            <div className="">
                                <label htmlFor="">Content Blog</label>
                                <textarea className="border p-2 rounded w-full" rows={10} onChange={(e)=>setSource(e.target.value)} value={source}>
                                    {source}
                                </textarea>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600">Save new blog</button>
                            </div>
                            <div>
                                <div className="">
                                    <b onClick={()=>setStatPrev(!statPrev)} className="cursor-pointer">{statPrev ? "Hide" : "Show"} Preview</b>
                                    <div className="p-2 border shadow rounded mt-2">
                                        {
                                            statPrev
                                                ? <>
                                                    <ReactMarkdown
                                                        components={components}
                                                        children={source}
                                                    >
                                                    </ReactMarkdown>
                                                </>
                                                : ""
                                        
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
            
            
        </Layout>
    </div>
  );
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


export default AddBlog;
