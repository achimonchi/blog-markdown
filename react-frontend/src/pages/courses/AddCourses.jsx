import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

import "./../../App.css";

const level = [
    "Beginner",
    "Intermediate",
    "Advanced"
];

const type = [
    "Free",
    "Freemium",
    "One Pay",
    "Subscribe"
]

function AddCourse() {

    const [title, setTitle] = useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
    }

    const [coursePrice, setCoursePrice] = useState(0)

    return (
        <div>
            <Layout>
                <h1 className="my-3">Create New Course</h1>
                <Link to={'/'} className="">
                    <span className="px-4 py-2 bg-gray-300 rounded shadow-md">Back</span>
                </Link>
                <div className="grid gap-2">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="grid gap-2 mt-5 mb-5 md:grid-cols-1">
                                <label htmlFor="">Course Title</label>
                                <input type="text" className="p-2 border rounded w-full" onChange={(e)=>setTitle(e.target.value)} value={title} />
                            </div>

                            <div className="grid gap-2 mt-5 mb-5 md:grid-cols-3 grid-cols-1">
                                <div>
                                    <label htmlFor="">Course Level</label>
                                    <select name="" id="" className="appearance-none p-2 border rounded w-full bg-white">
                                        {
                                            level.map((l)=>(
                                                <option value={l}>{l}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Course Type</label>
                                    <select name="" id="" className="appearance-none p-2 border rounded w-full bg-white">
                                        {
                                            type.map((t)=>(
                                                <option value={t}>{t}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Course Price</label>
                                    <input type="text" className="p-2 border rounded w-full bg-white" value={parseInt(coursePrice).toLocaleString("id-ID", {
                                        maximumFractionDigits:20,
                                        minimumFractionDigits:0
                                    })} onChange={(e)=> {
                                        const price = parseInt(e.target.value.split(".").join(""))
                                        if(price > 0 ){
                                            setCoursePrice(price)
                                        } else {
                                            setCoursePrice(0)
                                        }
                                    }} />
                                </div>
                                
                            </div>
                            
                            <div className="grid gap-2 my-5 md:grid-cols-2">
                                <div>
                                    <label htmlFor="">Course Description</label>
                                    <textarea type="text" className="w-full border p-2 rounded"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="">Course Tags</label>
                                    <input type="text" className="w-full border p-2 rounded" placeholder="dipisah dengan #" />
                                </div>
                            </div>

                        </div>
                    </form>
                    
                </div>
                
                
            </Layout>
        </div>
    );
}


export default AddCourse;
