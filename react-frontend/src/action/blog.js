
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
                content: "# Materi basic untuk javascript",
                tags: ["basic", "javascript", "web development", "frontend"],
            } ];
            resolve(dataJSON)
            
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}


module.exports = {blog, fetchBlog}