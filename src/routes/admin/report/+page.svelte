<script>
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import Navigation from "$lib/usernavigation.svelte";
    import Header from "$lib/Header.svelte";
    export let data;

    let filtered_data = data.devices;
    let admin_id = "";
    let filteredData = [];

    onMount(() => {
        // Format dates to "Month Day" format (e.g., "May 4")
       

   
    
        admin_id = localStorage.getItem("logged_in_admin_id");
        console.log(filtered_data);
       // Call filterData when admin_id is available
        filterData();
        console.log(admin_id);
        console.log(filteredData);


        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const month = date.toLocaleString("default", { month: "short" });
            const day = date.getDate();
            return `${month} ${day}`;
        };

        const dates = filteredData.map((entry) => formatDate(entry.date));
        const sensorValues = filteredData.map((entry) => entry.temprature);
        console.log(sensorValues);

        const ctx = document.querySelector(".ct-chart");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: dates,
                datasets: [
                    {
                        label: "Sensor Values",
                        data: sensorValues,
                        backgroundColor: "rgba(54, 162, 235, 0.2)", // Blue color with opacity
                        borderColor: "rgba(54, 162, 235, 1)", // Blue color
                        borderWidth: 1,
                    },
                ],
            },
        });


    });
    function filterData() {
        filteredData = filtered_data.filter(
            (device) => device.selected_admin_id === admin_id
        );
        console.log(filteredData);
    }
    
</script>

<section>
    <Header/>
    <div class="main_container">
        <div class="chart_container">
            <canvas class="ct-chart"></canvas>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Block Name</th>
                    <th>Room Name</th>
                    <th>Sensor Values</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {#each filteredData as item}
                    <tr>
                        <td>{item.selectedBlock}</td>
                        <td>{item.selectedRoom}</td>
                        <td>{item.temprature}</td>
                        <td>{item.date}</td>
                        <!-- Assuming you want to display the date of the first sensor data entry -->
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>

    <Navigation />
</section>

<style>
    .main_container {
        height: 90vh;
        width: 100vw;
        background-repeat: no-repeat;
        background-position: top center;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    section {
        overflow-y: scroll;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    th,
    td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    th {
        background-color: #f2f2f2;
    }

    .chart_container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .ct-chart {
        display: flex;
        flex-direction: column;
    }
</style>
