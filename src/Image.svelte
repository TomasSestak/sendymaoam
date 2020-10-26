<script>
	import Dialog, {Content} from '@smui/dialog';
	import Slider from './Slider.svelte'

	let dialog;

	export let id, src, data;
</script>



<img src={src} id={id} alt="" on:click={() => dialog.open()}/>
<Dialog bind:this={dialog}>
	<Content>
		<Slider data={data[id]}/>
	</Content>
</Dialog>
