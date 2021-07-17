<script>
	import Router from "svelte-spa-router"
	import Home from "./pages/home.svelte"
	import AddBlog from "./pages/blog/add.svelte"

</script>

<Router routes={{
	'/' : Home,
	'/blog/add' : AddBlog
}}>

</Router>