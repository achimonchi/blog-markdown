
<script>
    import CardBlog from "./../components/cardBlog.svelte";
    import Layout from "./../components/layout.svelte";

    import {
        fetchBlog,
        blogs
    } from "./../action/blog.store";

    import { onMount } from 'svelte';

    onMount(async()=>{
        const data =await fetchBlog();
        blogs.set(data);
    });

</script>

<Layout>
    <h1 class="text-4xl mb-3">Home</h1>
    <a href="/#/blog/add">
        <button class="mb-3 py-2 px-4 bg-blue-500 text-white rounded shadow-md">
            New Blog
        </button>
    </a>
    {#each $blogs as blog}
        <CardBlog {blog} />
    {/each}
</Layout>