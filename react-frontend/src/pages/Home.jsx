import { useState } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import {docco} from "react-syntax-highlighter/dist/esm/styles/hljs"

import "./../App.css"
function Home() {
  const [source, setSource] = useState('# heading')
  return (
    <div>
        <div className="max-w-screen-xl mx-auto border p-4">
            <h1>Create Blog</h1>
            <div className="grid gap-4 mt-5 mb-5">
                <textarea className="border p-3" rows={10} onChange={(e)=>setSource(e.target.value)} value={source}>
                    {source}
                </textarea>
            </div>
            <div className="grid gap-4 mt-5 mb-5">
                <b>Preview : </b>
                <ReactMarkdown
                    components={components}
                    children={source}
                >
                </ReactMarkdown>
            </div>
            
        </div>
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


export default Home;
