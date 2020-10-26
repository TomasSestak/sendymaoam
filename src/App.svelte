<script>
	import Gallery from './Gallery.svelte'
	import FaFacebookSquare from 'svelte-icons/fa/FaFacebookSquare.svelte'
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
	import FaRegEnvelope from 'svelte-icons/fa/FaRegEnvelope.svelte'
	import axios from 'axios';
	import {onMount} from 'svelte';

	let albums = [];
	let error = null;

	const URL = process.env.isProd;

	console.log(URL);

	onMount(async () => {
		try {
			const res = await axios.get('http://localhost:1337/albums');
			albums = res.data
		} catch (e) {
			error = e
		}
	})

</script>


<main>
	<section>
		{#if error !== null}
			{error}
		{:else}
			<Gallery gap="0" maxColumnWidth="500" data={albums}>
				{#each albums as album}
					<img src={'http://localhost:1337' + album.MainImage.url} alt={album.Description} id={album.id}>
				{/each}
			</Gallery>
		{/if}
	</section>
	<div class="contact">
		<a href="mailto:sendymaresova@seznam.cz" class="contact__link" target="_blank">
			<div>
				<FaRegEnvelope/>
			</div>
		</a>
		<a href="https://www.facebook.com/fotosendym" class="contact__link" target="_blank">
			<div>
				<FaFacebookSquare/>
			</div>
		</a>
		<a href="https://www.instagram.com/photo.sendym" class="contact__link" target="_blank">
			<div>
				<FaInstagram/>
			</div>
		</a>
	</div>
</main>
