<script>
	import Slidy from 'svelte-slidy';
	import {onMount} from 'svelte';
	import axios from 'axios';

	export let data;

	let local = [];

	const isProd = process.env.isProd;

	$: {
		data.OtherImages.forEach((element, index) => {
			local.push({id: index, src: (isProd ? '' : 'http://localhost:1337') + element.url})
		})
	}

	$: slidy_default = {
		slides: local,
		wrap: {
			id: 'slidy_default', // customize this instance Slidy by #id
			width: '100%',
			height: '80vh',
			padding: '0',
		},
		slide: {
			gap: 1,
			class: 'slide', // classname for styling slide
			backimg: false, // if true image on background slidewrap & slot for content empty
			imgsrckey: 'src' // prop for ypurs image src key
		},
		controls: {
			dots: true,
			dotsnum: false,
			dotsarrow: true,
			dotspure: true, // dotnav like realy dots :)
			arrows: false,
			keys: true, // nav by arrow keys
			drag: true, // nav by mousedrag
			wheel: true, // nav by mousewheel (shift + wheel) or swipe on touch/trackpads
		},
		duration: 200, // duration slides animation
		axis: 'y', // new in 2.2.0 axis direction
		loader: { // new in 2.0 settings for preloader spinner
			color: '#0c0c0c',
			size: 75,
			thickness: 1,
			speed: 550,
		}
	}





</script>

{#if local.length}
	<Slidy {...slidy_default} let:item />
{/if}
