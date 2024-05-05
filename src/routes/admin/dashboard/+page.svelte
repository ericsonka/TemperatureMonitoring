<script>
    import Header from "$lib/Header.svelte";
    import Usernavigation from "$lib/usernavigation.svelte";
    import { onMount, onDestroy } from "svelte";

    export let data;
    let assigned_details = data.devices;
    console.log(assigned_details);
    let filteredData = [];
    let admin_id = "";
    let background_image = {
        url: "/admin/logo/260733.jpg",
    };
    onMount(() => {
        admin_id = localStorage.getItem("logged_in_admin_id");
        filterData(); // Call filterData when admin_id is available
    });

    function filterData() {
        filteredData = assigned_details.filter(
            (device) => device.selected_admin_id === admin_id
        );
    }

    // Call the filter function when the component is mounted
    filterData();
console.log(filteredData);
    // Define filteredData here initially
</script>

<section>
    <Header />
    <div
        class="main_container"
        style="background-image: url({background_image.url});"
    >
        <div class="added_device_list">
            <!-- <pre>{JSON.stringify(filteredData, null, 2)}</pre> -->
            {#each filteredData as assign_detail}
                <div class="show_devices_inner">
                    <div class="card">
                        <div class="data">
                            <span class="label">Date:</span>
                            {assign_detail.date}
                        </div>

                        <div class="data">
                            <span class="label"> Block:</span>
                            {assign_detail.selectedBlock}
                        </div>

                        <div class="data">
                            <span class="label"> Room:</span>
                            {assign_detail.selectedRoom}
                        </div>

                        <div class="data">
                            <span class="label">Admin Name:</span>
                            {assign_detail.selected_admin_name}
                        </div>

                        <div class="data">
                            <span class="label">Temperature:</span>
                            <!-- Apply appropriate class based on temperature value -->
                            <span
                                class="temperature"
                            >
                                {assign_detail.temprature}
                            </span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
    <Usernavigation />
</section>

<style>
    .temperature {
        font-weight: bold;
        color: green; /* Default color for normal temperatures */
    }

    /* Style for high temperatures */
    .temperature.high {
        color: red;
    }

    /* Style for low temperatures */
    .temperature.low {
        color: blue;
    }

    section {
        position: relative;
        z-index: 5555555555555555555;
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

    .card {
        width: 300px;
        padding: 40px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 20px auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: white;
    }

    .label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .data {
        margin-bottom: 10px;
    }

    .data span {
        color: #007bff;
    }
</style>
