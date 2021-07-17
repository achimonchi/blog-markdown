
const {writable} = require('svelte/store')

exports.blogs = writable([])

exports.fetchBlog=async()=>{
    const data = await fetchBlogByLocalstorage();
    return data;
}

const fetchBlogByLocalstorage=()=>{
    return new Promise((resolve, reject)=>{
        try {
            const data = window.localStorage.getItem("blogs");
            const dataJSON = JSON.parse(data);
            if(dataJSON && dataJSON.length > 0){
                resolve(dataJSON)
            } else {
                resolve([
                    {
                        title: "Sample blog",
                        desc: "Just a sample blog"
                    }
                ])
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}