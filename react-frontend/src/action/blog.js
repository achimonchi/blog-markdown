
const blog = [{}];

const fetchBlog = async() => {
    const data = await fetchBlogByLocalStorage();
    return data;
}

const fetchBlogByLocalStorage = () => {
    return new Promise((resolve, reject)=>{
        try {
            const data = window.localStorage.getItem("blogs");
            const dataJSON = JSON.parse(data) ?? [ {
                id:1,
                title: "Javascript Basic",
                desc: "Materi basic untuk javascript"
            } ];
            resolve(dataJSON)
            
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}


module.exports = {blog, fetchBlog}