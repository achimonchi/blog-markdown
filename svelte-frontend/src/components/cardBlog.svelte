<script>
import Card from "./reusable/card.svelte";

    export let blog = {}
</script>

<Card>
    <h1 class="text-2xl">{blog.title}</h1>
    <p>{blog.desc}</p>
</Card>