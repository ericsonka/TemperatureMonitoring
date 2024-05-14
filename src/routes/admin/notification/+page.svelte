<script>
    import Navigation from "$lib/usernavigation.svelte";
    import Header from "$lib/Header.svelte";
    import {onMount} from "svelte";


    let is_subscribed = false;


    onMount(()=>{
        if (localStorage.getItem('registered') === '1') {
            is_subscribed = true;
        }
    });



    const check = () => {
        if (!("serviceWorker" in navigator)) {
            throw new Error("No Service Worker support!");
        }
        if (!("PushManager" in window)) {
            throw new Error("No Push API Support!");
        }
    };

    const registerServiceWorker = async () => {
        const swRegistration = await navigator.serviceWorker.register("service_worker.js");
        return swRegistration;
    };

    const requestNotificationPermission = async () => {
        const permission = await window.Notification.requestPermission();
        // value of permission can be 'granted', 'default', 'denied'
        // granted: user has accepted the request
        // default: user has dismissed the notification permission popup by clicking on x
        // denied: user has denied the request.
        if (permission !== "granted") {
            throw new Error("Permission not granted for Notification");
        }
        return permission;
    };

    async function do_subscribe(){

        check();
        const swRegistration = await registerServiceWorker();
        console.log('sw reg', swRegistration);

        const permission = await requestNotificationPermission();
        console.log('permission', permission);

        setTimeout(function () {
            swRegistration.active.postMessage(JSON.stringify({logged_in_admin_id: localStorage.getItem('logged_in_admin_id')}));
            localStorage.setItem('registered', '1');

            is_subscribed = true;
        }, 0);
    };




</script>

<Header />

<Navigation />



<div class="subscribe_to_notifications_area">
    <h3>Subscribe to notifications</h3>
    {#if !is_subscribed}
        <div>Get realtime notifications on your device on unusual temperature change</div>
        <button on:click={do_subscribe}>Subscribe</button>
        {:else}
        <div>You are already subscribed to notifications</div>
    {/if}

</div>



<style>
    .subscribe_to_notifications_area{
        display: block;
        margin: 10px;
        padding: 10px;
        border: 1px solid #DDD;
    }

    .subscribe_to_notifications_area{
        display: block;
        line-height: 2;
    }

</style>