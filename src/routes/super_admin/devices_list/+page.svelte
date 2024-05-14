<script>
    import Header from "$lib/Header.svelte";
    import Navigation from "$lib/navigation.svelte";
    export let data;
    let devices_data_list = data.devices.data;
    console.log(devices_data_list);
    async function handle_delete_device_profile(device_id) {
        console.log(device_id);
        let response = await fetch("/api/super_admin/delete_device", {
            method: "POST",
            body: JSON.stringify({ device_id: device_id }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let result = await response.json();
        console.log(result);
        let return_new_device = result.data.return_values;
        devices_data_list = return_new_device;
        console.log(devices_data_list);

        devices_data_list = devices_data_list; 
    }
    let background_image = {
        url: "/admin/logo/260733.jpg",
    };
</script>

<section>
    <Header />
    <div
        class="main_container"
        style="background-image: url({background_image.url});"
    >
    <div class="added_device_list">
        {#each devices_data_list as device}
            <div class="device_item">
                <p>Device Id :{device.new_device_profile_id}</p>
                <h1>
                    Device Name : <span>{device.device_name}</span>
                </h1>
                <h1>
                    Block Name : <span>{device.block_name}</span>
                </h1>
                <h1>
                    Room Name : <span>{device.room_name}</span>
                </h1>

                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- <h1>date :<span> {device.date} </span></h1> -->
        {#if device.new_device_profile_id !== 'DRV_GzJ7cYva5' && device.new_device_profile_id !== 'DRV_AE9Svd2Ze'}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <i on:click={() => handle_delete_device_profile(device.new_device_profile_id)} class="fa-solid fa-trash delete"></i>
         {/if}
                
            </div>
        {/each}
    </div>
    </div>
    <Navigation />

</section>

<style>
    section{
        position:relative;
        z-index: 5555555555555555555;
    }
     .main_section {
        z-index: 1;
        display: flex;
        justify-content: space-around;
        color: white;
        position: relative;
        border-bottom: 1px solid #ffffff78;
    }

    .add_device_section {
        min-height: 150px;
        background-color: rgb(255 255 255 / 37%);
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 350px;
        box-shadow: 0px 0px 11px -4px black;
    }

    .adding_section {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .adding_section_i {
        width: 50px;
        height: 50px;
        background-color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 25px;
    }
    .adding_section_i i {
        color: #000000;
    }
    .adding_section_i i:hover {
        transform: rotate(50deg);
        transition: all 100ms linear;
        transition-delay: 50ms;
    }
    .adding_section p {
        font-size: 25px;
        text-transform: capitalize;
    }
    .adding_page_container {
        width: auto;
        min-height: 100%;
        background-color: rgb(255, 255, 255);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 13;
        height: 100vh;
    }
    .adding_page_container i {
        position: absolute;
        top: 8px;
        right: 8px;
        margin: 10px;
        color: rgb(0, 0, 0);
    }
    .border {
        border-right: 1px solid rgb(255 255 255 / 88%);
        height: auto;
    }
    .section_container_1 {
        margin-top: 10px;
        text-transform: capitalize;
        font-size: 18px;
        padding: 10px;
    }

    .adding_page {
        position: absolute;
        left: 0;
        right: 0;
    }
    .section_container_2 {
        margin-top: 10px;
        text-transform: capitalize;
        font-size: 18px;
        padding: 10px;
    }
    .adding_page {
        z-index: 1;
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main_container {
        height: 90vh;
        width: 100vw;
        background-repeat: no-repeat;
        background-position: top center;
        background-size: cover;
        overflow: hidden;
    }
    .added_device_list {
        /* border-top: 1px solid rgb(22, 22, 22); */
        margin-top: 25px;
        position: absolute;
        left: 0;
        right: 0;
    }
    .added_device_list h1 {
        margin-bottom: 0;
        font-size: 18px;
        text-transform: capitalize;
        margin-top: 4px;
        font-weight: 200;
        font-family: monospace;
    }
    .device_item {
        background-color: white;
        padding: 10px;
        border-radius: 10px;
        margin-top: 5px;
        margin-bottom: 5px;
        position: relative;
        color: #000000;
    }
    .added_device_list h2 {
        margin-bottom: 0;
        font-size: 18px;
        text-transform: capitalize;
        margin-top: 4px;
        font-weight: 200;
        font-family: monospace;
    }
    .added_device_list h1 span {
        font-weight: 400;
        font-family: monospace;
    }
    .added_device_list p {
        font-size: 10px;
        text-transform: capitalize;
        margin-top: 6px;
        margin-bottom: 0;
        margin-top: 4px;
        font-family: monospace;
    }
    .added_device_list h4 {
        margin-top: 5px;
        font-family: monospace;
        margin-bottom: 0px;
    }

    .added_device_list i {
        position: absolute;
        right: 10px;
        cursor: pointer;
        color: rgb(112, 108, 108);
        z-index: 666;
        /* top: 10px; */
        bottom: 10px;
    }

    /* Input container */
    .input-container {
        position: relative;
        margin: 20px;
        /* overflow: hidden; */
    }

    /* Input field */
    .input-field {
        display: block;
        padding: 10px;
        font-size: 16px;
        border: none;
        border-bottom: 2px solid #979191;
        outline: none;
        background-color: transparent;
        width: 95%;
        padding-top: 40px;
    }
    .input-label {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 16px;
        color: rgba(204, 204, 204, 0);
        pointer-events: none;
        transition: all 0.3s ease;
    }
    .input-field:focus + .input-label {
        top: -20px;
        font-size: 12px;
        color: #000000;
    }
    .ading_page_details h1 {
        text-align: center;
        font-family: monospace;
    }
    .cta {
        border: none;
        background: none;
        cursor: pointer;
        padding-top: 20px;
        margin: 0 auto;
        width: 100%;
    }

    .cta span {
        padding-bottom: 7px;
        letter-spacing: 4px;
        font-size: 14px;
        padding-right: 9px;
        text-transform: capitalize;
    }

    .cta svg {
        transform: translateX(-8px);
        transition: all 0.3s ease;
    }

    .cta:hover svg {
        transform: translateX(0);
    }

    .cta:active svg {
        transform: scale(0.9);
    }

    .hover-underline-animation {
        position: relative;
        color: black;
        padding-bottom: 20px;
    }

    .hover-underline-animation:after {
        content: "";
        position: absolute;
        width: 150px;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0px;
        background-color: #000000;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
    }

    .cta:hover .hover-underline-animation:after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
    .add_device_image {
        width: 100%;
        height: 350px;
        margin: 0 auto;
        /* background-color: #000000; */
        margin-top: 30px;
    }

    .add_device_image img {
        object-fit: cover;
        width: 100%;
    }

    .status-select {
        width: 100%;
        padding: 10px;
        margin-top: 0px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
        transition: border-color 0.3s;
    }

    .status-select:focus {
        border-color: #007bff; /* change to your desired focus color */
    }
</style>
