<script>
import Layout from "./../components/Layout.svelte";
import {blogs, fetchBlog} from "./../stores/blog.store"

import { onMount } from 'svelte';

console.log($blogs)

onMount(async()=>{
    const data = await fetchBlog();
    blogs.set(data);
})

</script>
<Layout>
    <h1 class="text-4xl">Home</h1>
    {#each $blogs as blog }
        <h1 class="text-2xl">{blog.title}</h1>
        <p class="text-4xl">{blog.desc}</p>
    {/each}
</Layout>