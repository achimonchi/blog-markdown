
<script>
    import Layout from "./../../components/layout.svelte"
    import SvelteMarkdown from "svelte-markdown";

    const source = '**heading**'
</script>

<Layout>
    <a href="/#/">
        <button class="bg-gray-500 text-white shadow-md px-4 py-2 rounded my-3"> Back </button>
    </a>
    <h1 class="text-4xl mb-3">Add New Blog Here</h1>
    <SvelteMarkdown
        source={source}
    />
</Layout>