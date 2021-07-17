import {writable} from "svelte/store";

export const blogs = writable([]);

export const fetchBlog = async() => {
    const data = await fetchBlogFromLocalstorage();
    console.log({data});
    // blogs.set(data)
    return data;
}

const fetchBlogFromLocalstorage = () => {
    return new Promise((resolve, reject)=>{
        try {
            const data = window.localStorage.getItem("blogs");
            const dataJSON = JSON.parse(data);
            if(dataJSON !== null) {
                resolve([]);
            } else {
                resolve([
                    {
                        title: "Blog",
                        desc: "just a blog"
                    }
                ]);
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
    
}

// fetchBlog()