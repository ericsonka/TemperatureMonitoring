<script>
    import Navigation from "$lib/usernavigation.svelte";
    import Header from "$lib/Header.svelte";
    import { onMount } from "svelte";
    export let data;
    let temperatureData = data.devices;
    let upperLimit = "";
    let lowerLimit = "";
    let filteredData = [];
    let admin_id = "";
    onMount(() => {
        admin_id = localStorage.getItem("logged_in_admin_id");
        filterData();
    });

    function filterData() {
        filteredData = temperatureData.filter(
            (device) => device.selected_admin_id === admin_id,
        );
    }

    filterData();
    let message = "";

    function checkTemperature() {
        filteredData.forEach((data) => {
            if (data.temprature > upperLimit) {
                console.log(`Temperature in ${data.selectedRoom} is too high!`);
                message = `Temperature in ${data.selectedRoom} is too high!`;
            } else if (data.temprature < lowerLimit) {
                console.log(`Temperature in ${data.selectedRoom} is too low!`);
                message = `Temperature in ${data.selectedRoom} is too low!`;
            } else {
                message = `Temperature in ${data.selectedRoom} is within limits.`;
            }
        });
    }

    onMount(() => {});
</script>

<section>
    <Header />
    {#each filteredData as data}
        <div class="container">
            <div class="input">
                <label class="label">
                    Upper Limit:
                    <input
                        type="number"
                        bind:value={upperLimit}
                        class="input-field"
                    />
                </label>
                <label class="label">
                    Lower Limit:
                    <input
                        type="number"
                        bind:value={lowerLimit}
                        class="input-field"
                    />
                </label>
            </div>

            <h2 class="temperature">Temperature Data:</h2>
            <div class="temperature-item">
                Room: {data.selectedRoom}, Temperature: {data.temprature}°C
            </div>

            <button on:click={checkTemperature} class="set-time-button"
                >Set Temperature Time</button
            >
            <p>{message}</p>
        </div>
    {/each}
    <Navigation />
</section>

<style>
    /* Add this to a file named styles.css in your project */
    .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 80vh;
        justify-content: center;
    }

    .input-field {
        width: 100%;
        padding: 8px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        box-sizing: border-box;
        margin-top: 4px;
    }

    .label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
        color: #333;
    }

    .temperature {
        margin-top: 20px;
        font-size: 20px;
        color: #333;
    }

    .temperature-item {
        margin-bottom: 10px;
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
</style>
