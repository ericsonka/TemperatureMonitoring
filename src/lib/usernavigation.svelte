<script>
    function handle_goto_page(route_name) {
        location.href = "/admin/" + route_name;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="navigation_container">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="nav_button home"
        on:click={() => {
            handle_goto_page("dashboard");
        }}
    >
        <span><i class="fas fa-home"></i></span>
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="nav_button scanner"
        on:click={() => {
            handle_goto_page("report");
        }}
    >
        <span><i class="fa-regular fa-flag"></i></span>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="nav_button transaction"
        on:click={() => {
            handle_goto_page("set_temperature");
        }}
    >
        <span><i class="fa-solid fa-temperature-three-quarters"></i></span>
    </div>
    
    <div
        class="nav_button scanner"
        on:click={() => {
            handle_goto_page("notification");
        }}
    >
        <span><i class="fa-regular fa-bell"></i></span>
    </div>
</div>

<style>
    .navigation_container {
        display: flex;
        justify-content: space-evenly;
        background-color: #fff;
        position: fixed;
        bottom: 3px;
        right: 0;
        left: 0;
        height: 43px;
        /* width: 70%; */
        z-index: 55;
        border-top: 1px solid #d9d5d579;
        margin: 0 auto;
        border-radius: 35px;
        align-items: center;
    }
    .nav_button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-width: 95px;
    }
    .nav_button i {
        color: #000000;
        font-size: 20px;
    }
    .nav_button p {
        font-size: 12px;
    }
</style>
