<script>
    import Navigation from "$lib/navigation.svelte";
    export let data;
    let devices_data_list = data.devices.data;
    console.log(devices_data_list);
    import Header from "$lib/Header.svelte"; 
    async function insert_devices() {
        let response = await fetch("/api/super_admin/insert_device", {
            method: "POST",
            body: JSON.stringify({ new_device: new_device }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log(response);
    }

 
    let show_hide = false;
    function show_adding_device_popup() {
        show_hide = !show_hide;
        console.log("added", new_device);
    }
    let new_device = {
        device_id: "",
        device_name: "",
        block_name: "",
        room_name: "",
    };

    async function add_device(e) {
        e.preventDefault();
        const isDuplicate = devices_data_list.some(device => device.block_name === new_device.block_name && device.room_name === new_device.room_name);
        if (isDuplicate) {
            alert("This combination of block name and room name already exists. Please provide a different combination.");
            return;
        }

        if (!new_device.device_id) {
            alert("Please provide a device ID");
            return;
        }
        if (!new_device.device_name) {
            alert("Please provide a device name");
            return;
        }
        if (!new_device.block_name) {
            alert("Please provide a block name");
            return;
        }
        if (!new_device.room_name) {
            alert("Please provide a room name");
            return;
        }

        devices_data_list = [...devices_data_list, new_device];
        show_hide = !show_hide;
        await insert_devices();
        new_device = {
            device_id: "",
            device_name: "",
            block_name: "",
            room_name: "",
        };
    }
    
    let show_add_device = true;
    function show_adding_pop_up() {
        show_devices_list = false;
        show_add_device = true;
    }
    let show_devices_list = true;
    function show_devices() {
        window.location.href = "/super_admin/devices_list";
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
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="main_section">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="section_container_1" on:click={show_adding_pop_up}>
                Add Device
                {#if show_add_device}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="adding_page">
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div
                            class="add_device_section"
                            on:click={(event) => event.stopPropagation()}
                        >
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <div
                                class="adding_section"
                                on:click={show_adding_device_popup}
                            >
                                <div class="adding_section_i">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                                <p>Add Devices</p>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
            <div class="border"></div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="section_container_2" on:click={show_devices}>
                Devices List
              
            </div>

            {#if show_hide}
                <div class="adding_page_container">
                    <i
                        class="fa-solid fa-xmark"
                        on:click={show_adding_device_popup}
                    ></i>

                    <div class="ading_page_details">
                        <h1>Add Device</h1>
                        <div class="input-container">
                            <form action="">
                                <input
                                    placeholder="Enter Device Id"
                                    bind:value={new_device.device_id}
                                    class="input-field"
                                    type="number"
                                />
                                <label for="input-field" class="input-label"
                                    >Enter Device Id</label
                                >
                                <input
                                    placeholder="Device Name"
                                    bind:value={new_device.device_name}
                                    class="input-field"
                                    type="text"
                                />
                                <label for="input-field" class="input-label"
                                    >Device Name</label
                                >
                                <!-- <label for="input-field" class="input-label"></label> -->
                                <input
                                    placeholder="Block Name"
                                    bind:value={new_device.block_name}
                                    class="input-field"
                                    type="text"
                                />
                                <label for="input-field" class="input-label"
                                    >Block Name</label
                                >
                                <input
                                    placeholder="Room Name"
                                    bind:value={new_device.room_name}
                                    class="input-field"
                                    type="text"
                                />
                                <label for="input-field" class="input-label"
                                    >Room Name</label
                                >
                                <!-- <label for="input-field" class="input-label">Device Name</label> -->
                                <button class="cta" on:click={add_device}>
                                    <span class="hover-underline-animation">
                                        Add device
                                    </span>
                                    <svg
                                        id="arrow-horizontal"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="10"
                                        viewBox="0 0 46 16"
                                    >
                                        <path
                                            id="Path_10"
                                            data-name="Path 10"
                                            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                            transform="translate(30)"
                                        ></path>
                                    </svg>
                                </button>
                            </form>
                            <!-- <div class="add_device_image">
                        <img src="/admin/devices/device.jpg" alt="" />
                    </div> -->
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>

    <Navigation />
</section>

<style>
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
