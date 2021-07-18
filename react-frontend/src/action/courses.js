const courses = [{}];

const fetchCourses = async() => {
    const data = await fetchCoursesByLocalStorage();
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

module.exports = {courses, fetchCourses}