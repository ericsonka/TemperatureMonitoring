<script>
    import Navigation from "$lib/navigation.svelte";
    import Header from "$lib/Header.svelte";
    import { onMount } from "svelte";

    export let data;
    let admins = data.admins.data;
    let devices_data_list = data.devices.data;
    let assigned_details = data.assigned.data;

    let blocks = [];
    let selectedBlock = "";
    let new_device_id;
    let selected_admin = "";
    let selectedRoom = "";
    let filteredData = [];
    let selectedDevice;

    devices_data_list.forEach((device) => {
        if (!blocks.includes(device.block_name)) {
            blocks.push(device.block_name);
        }
    });

    let single_admins_name = "";
    let single_admins_id = "";
    let admin_details = [];
    for (let admin of admins) {
        single_admins_name = admin.name;
        single_admins_id = admin.admin_id;
        admin_details.push({
            admin_name: single_admins_name,
            admin_id: single_admins_id,
        });
    }

    async function findDeviceId() {
        if (selectedBlock !== "" && selectedRoom !== "") {
            const device = devices_data_list.find(
                (device) =>
                    device.block_name === selectedBlock &&
                    device.room_name === selectedRoom,
            );

            new_device_id = device.new_device_profile_id;
            console.log(new_device_id);
            if (device) {
                return new_device_id;
            }
        }

        return null;
    }
    let filter_admin = [];
    let assigned_admin_details = {};
    async function handle_change_block() {
        filteredData = devices_data_list.filter(
            (device) => device.block_name === selectedBlock,
        );

        filter_admin = admin_details.filter(
            (admin) => admin.admin_id === selected_admin,
        );

        // Find the selected device and retrieve its sensor value
        selectedDevice = filteredData.find(
            (device) => device.room_name === selectedRoom,
        );
        console.log(selectedDevice);
        if (selectedDevice) {
            new_device_id = selectedDevice.new_device_profile_id;
            console.log(new_device_id);
            assigned_admin_details = {
                selectedBlock: selectedBlock,
                selectedRoom: selectedRoom,
                selected_admin_id: selected_admin,
                device_id: new_device_id,
                selected_admin_name:
                    filter_admin.length > 0 ? filter_admin[0].admin_name : null,
                temprature: selectedDevice.sensor_value, // Include sensor value
            };
        } else {
            // If no device is found, reset assigned_admin_details
            assigned_admin_details = {};
        }
    }
    // console.log(sensor_value);

    let message = "";
    let showMessage = false;
    async function assign_admin() {
        await findDeviceId();
        await handle_change_block();
        if (
            selectedBlock === "" ||
            selectedRoom === "" ||
            selected_admin === ""
        ) {
            alert("Please select values for all dropdowns before assigning.");
            return;
        }

        let response = await fetch("/api/super_admin/assign_admin", {
            method: "POST",
            body: JSON.stringify(assigned_admin_details),
            headers: {
                "Content-Type": "application/json",
            },
        });

        let result = await response.json();
        console.log(result);
        message = result.message;
        assigned_details = result.data.return_values;
        showMessage = true;
        setTimeout(() => {
            showMessage = false;
        }, 2000);
    }

    async function handle_delete_assigned_profile(device_id) {
        console.log(device_id);
        let response = await fetch("/api/super_admin/delete_assigned_details", {
            method: "POST",
            body: JSON.stringify({ device_id: device_id }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let result = await response.json();
        console.log(result);
        assigned_details = result.data.return_values;
    }
</script>

<section>
    <Header />
    <div class="main_container">
        <h2>Assign Admin</h2>
        <!-- <pre>{JSON.stringify(selectedDevice, null, 2)}</pre> -->
        <div class="inner_container">
            <div class="box">
                <div class="blocks">
                    <div class="dropdown">
                        <select
                            name="blockSelect"
                            id="blockSelect"
                            bind:value={selectedBlock}
                            on:change={handle_change_block}
                        >
                            {#each blocks as block}
                                <option value={block}>{block}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div class="blocks">
                    <div class="dropdown">
                        <select
                            name="roomSelect"
                            id="roomSelect"
                            bind:value={selectedRoom}
                            on:change={handle_change_block}
                        >
                            {#each filteredData as room}
                                <option value={room.room_name}
                                    >{room.room_name}</option
                                >
                            {/each}
                        </select>
                    </div>
                </div>
<!-- <pre>{selected_admin}</pre> -->
                <div class="blocks">
                    <div class="dropdown">
                        <select
                            name="roomSelect"
                            id="roomSelect"
                            
                            bind:value={selected_admin}
                            on:change={handle_change_block}
                        >
                            {#each admin_details as admin}
                                <option value={admin.admin_id}
                                    >{admin.admin_name}</option
                                >
                            {/each}
                        </select>
                    </div>
                </div>

                <button class="button type1" on:click={assign_admin}>
                    <span class="btn-txt">Assign</span>
                </button>
            </div>
        </div>
        <p class="error_message"  style="display: {showMessage ? 'block' : 'none'}">{message}</p>
    </div>

    <div class="show_devices">
        <div class="show_devices_container">
            {#each assigned_details as assign_detail}
                <!-- <pre>{assign_detail.device_id}</pre> -->
                <div class="show_devices_inner">
                    <div class="card">
                        <div class="data">
                            <span class="label">Date:</span>
                            {assign_detail.date}
                        </div>

                        <div class="data">
                            <span class="label">Selected Block:</span>
                            {assign_detail.selectedBlock}
                        </div>

                        <div class="data">
                            <span class="label">Selected Room:</span>
                            {assign_detail.selectedRoom}
                        </div>

                        <div class="data">
                            <span class="label">Selected Admin Name:</span>
                            {assign_detail.selected_admin_name}
                        </div>

                        <div class="data">
                            <span class="label">Temprature:</span>
                            {assign_detail.temprature}
                        </div>
                    </div>
                    <div class="trash">
                        <i
                            on:click={() =>
                                handle_delete_assigned_profile(
                                    assign_detail.device_id,
                                )}
                            class="fa-solid fa-trash delete"
                        ></i>
                    </div>
                </div>
            {/each}
        </div>
        <Navigation />
    </div>
</section>

<style>
    section {
        padding-bottom: 60px;
    }
    .button {
        height: 40px;
        width: 100px;
        position: relative;
        background-color: transparent;
        cursor: pointer;
        border: 2px solid #252525;
        overflow: hidden;
        border-radius: 30px;
        color: #333;
        transition: all 0.5s ease-in-out;
    }

    .btn-txt {
        z-index: 1;
        font-weight: 800;
        letter-spacing: 4px;
    }

    .type1::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        transition: all 0.5s ease-in-out;
        background-color: #333;
        border-radius: 30px;
        visibility: hidden;
        height: 10px;
        width: 10px;
        z-index: -1;
    }

    .button:hover {
        box-shadow: 1px 1px 200px #252525;
        color: #fff;
        border: none;
    }

    .type1:hover::after {
        visibility: visible;
        transform: scale(100) translateX(2px);
    }
    .box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-inline: 30px;
    }
    .main_container h2 {
        text-align: center;
        text-transform: capitalize;
        font-size: 18px;
        padding-bottom: 30px;
        padding-top: 20px;
    }
    select {
        width: 80px;
        height: 40px;
        border: 1px solid #e5e5e5;
        border-radius: 7px;
        outline: none;
        margin-inline: 2px;
        padding: 0 10px;
    }
    .main_container {
        /* margin-bottom:80px; */
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 50px;
    }
    .error_message {
        text-align: center;
        padding-top: 20px;
    }
    .card {
        width: 300px;
        padding: 40px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin: 20px auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
    .show_devices_inner {
        position: relative;
    }
    .trash {
        position: absolute;
        top: 0;
        right: 20px;
        margin: 10px;
        color: red;
        cursor: pointer;
    }
</style>
