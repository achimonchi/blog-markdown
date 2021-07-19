import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

import "./../../App.css";
import { addCourse } from "../../action/courses";

const level = [
    {value : "Beginner", label : "Beginner"},
    {value : "Intermediate", label : "Intermediate"},
    {value : "Advanced", label : "Advanced"},
];

const type = [
    {value : "Free", label : "Free"},
    {value : "Freemium", label : "Freemium"},
    {value : "One Pay", label : "One Pay"},
    {value : "Subscribe", label : "Subscribe"},
]

const tags = [
    {value : "backend", label : "backend"},
    {value : "frontend", label : "frontend"},
    {value : "basic", label : "basic"},
    {value : "web development", label : "web development"},
    {value : "javascript", label : "javascript"},

]

const animatedComponents = makeAnimated();

function AddCourse() {

    const [courseTitle, setCourseTitle] = useState("");
    const [coursePrice, setCoursePrice] = useState(0);
    const [courseLevel, setCourseLevel] = useState("");
    const [courseType, setCourseType] = useState("");
    const [courseDesc, setCourseDesc] = useState("");
    const [courseTags, setCourseTags] = useState([]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data = {
            course_title: courseTitle, 
            course_price: parseInt(coursePrice), 
            course_level: courseLevel, 
            course_type: courseType,
            course_desc: courseDesc, 
            course_tags: courseTags
        };
        console.log({data})
        const add = await addCourse(data);
        if(add.status === 201) {
            alert("New Courses has been recorded !")
        }
    }

    const handleTagsChange=(e, cb)=>{
        const t = [];
        e.map((i)=> t.push(i.value))
        cb(t);
    }

    const handleSingleValueChange=(e,cb)=>{
        cb(e.value)
    }

    
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
                                <input type="text" className="p-2 border rounded w-full" onChange={(e)=>setCourseTitle(e.target.value)} value={courseTitle} />
                            </div>

                            <div className="grid gap-2 mt-5 mb-5 md:grid-cols-3 grid-cols-1">
                                <div>
                                    <label htmlFor="">Course Level</label>
                                    <Select
                                        options={level}
                                        name="form-field-name"
                                        className="w-full"
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        onChange={(e)=> handleSingleValueChange(e, setCourseLevel)}
                                    ></Select>
                                </div>
                                <div>
                                    <label htmlFor="">Course Type</label>
                                    <Select
                                        options={type}
                                        name="form-field-name"
                                        className="w-full"
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        onChange={(e)=> handleSingleValueChange(e, setCourseType)}
                                    ></Select>
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
                                    <textarea type="text" onChange={(e)=>setCourseDesc(e.target.value)} className="w-full border p-2 rounded"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="">Course Tags</label>
                                    <Select
                                        options={tags}
                                        name="form-field-name"
                                        className="w-full"
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        onChange={(e)=> handleTagsChange(e, setCourseTags)}
                                    >

                                    </Select>
                                </div>
                            </div>
                            
                            <button className="px-4 py-2 bg-blue-500 rounded shadow-md text-white">New Course</button>
                        </div>
                    </form>
                    
                </div>
                
                
            </Layout>
        </div>
    );
}


export default AddCourse;
