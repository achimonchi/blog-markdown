const { default: axios } = require("axios");
const { agentCourse } = require("../utils/agent");
const courses = [{}];

const fetchCourses = async() => {
    const data = await fetchCoursesByDB();
    return data;
}

const fetchCoursesByLocalStorage= () => {
    return new Promise((resolve, reject)=>{
        try {
            const data = window.localStorage.getItem("courses");
            const dataJSON = JSON.parse(data) ?? [
                {
                    id: 1,
                    course_title : "Fundamental Javascript",
                    course_level : "Beginner",
                    course_type : "Freemium",
                    course_desc : "Materi basic untuk JS",
                    course_tags : ["basic", "javascript", "web development"],
                    course_price : 0
                }
            ];

            resolve(dataJSON)

        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const fetchCoursesByDB = () => {
    return new Promise(async(resolve, reject)=>{
        try {
            const data = await agentCourse()
            resolve(data?.data?.data ?? [])
        } catch (error) {
            reject(error)
        }
    })
}

const fetchCourseByTitle = async(course_title) => {
    const data = await fetchCourseByDBAndTitle(course_title)

    return data;
}

const fetchCourseByDBAndTitle = (course_title) => {
    return new Promise(async(resolve, reject)=>{
        try {
            const dataRes = await agentCourse.post("/title", course_title)
            resolve(dataRes.data)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

const addCourse = async (data) => {
    const add = await addCourseByDB(data);
    return add;
}

const addCourseToLocalStorage=(data)=>{
    return new Promise(async(resolve, reject)=>{ 
        try {
            const tempCourse = await fetchCourses();
            tempCourse.push(data);

            const tempString = JSON.stringify(tempCourse);
            localStorage.setItem("courses", tempString);
            resolve({status:201, data})
        } catch (error) {
            reject({status:500, error})
        }
    })
}

const addCourseByDB = async(data) => {
    return new Promise(async(resolve, reject)=>{
        try {
            const res = await agentCourse.post("/", data)
            // console.log({data})
            console.log(res);
            resolve(res);
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
}


module.exports = {
    courses, 
    fetchCourses, 
    addCourse,
    fetchCoursesByLocalStorage,
    addCourseToLocalStorage,
    fetchCourseByTitle,
}