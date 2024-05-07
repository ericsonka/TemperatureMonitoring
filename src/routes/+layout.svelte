<script>
  import {onMount} from "svelte";

  export let meta_title = 'Temperature Monitoring - Real-time Temperature Data';
  export let meta_description = 'Track temperature levels in your area with real-time temperature data. Stay informed about temperature conditions and take necessary precautions to adjust your activities accordingly.';

  onMount(() => {
      // Any initialization code if needed
  });
</script>
<slot></slot>
<svelte:head>
  <meta name="bigdate:platform_meta_tags_start">
  <title>{meta_title}</title>

  <meta name="title" content="{meta_title}">
  <meta name="description" content="{meta_description}">

  <meta property="og:title" content="{meta_title}">
  <meta property="og:description" content="{meta_description}">

  <!-- Adjust the og:image to an appropriate image related to temperature monitoring -->
  <meta property="og:image:url" content="/favicon.png">
  <meta property="og:image" itemprop="image" content="/favicon.png">
  <meta property="og:image:width" content="512">
  <meta property="og:image:height" content="512">

  <meta property="og:locale" content="en_IN">
  <meta property="og:type" content="website">
</svelte:head>
