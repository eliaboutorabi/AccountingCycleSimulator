<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	const appTitle = 'Accounting Cycle Simulator';
	const appDescription =
		'An editorial accounting-cycle simulator that traces business events from source evidence through journals, close, statements, controls, audit support, and filing.';
	const appUrl = 'https://eliaboutorabi.github.io/AccountingCycleSimulator/';
	const socialImageUrl = `${appUrl}images/accounting-cycle-simulator-screenshot.png`;

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{appTitle}</title>
	<meta name="description" content={appDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={appTitle} />
	<meta property="og:title" content={appTitle} />
	<meta property="og:description" content={appDescription} />
	<meta property="og:url" content={appUrl} />
	<meta property="og:image" content={socialImageUrl} />
	<meta property="og:image:secure_url" content={socialImageUrl} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1440" />
	<meta property="og:image:height" content="900" />
	<meta property="og:image:alt" content="Accounting Cycle Simulator landing page" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={appTitle} />
	<meta name="twitter:description" content={appDescription} />
	<meta name="twitter:image" content={socialImageUrl} />
</svelte:head>
{@render children()}
