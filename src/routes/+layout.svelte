<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Accounting Cycle Simulator</title>
	<meta
		name="description"
		content="An interactive accounting cycle simulator that traces business events through ledgers, statements, disclosures, and mock SEC filings."
	/>
</svelte:head>
{@render children()}
