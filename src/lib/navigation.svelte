<script>
    function handle_goto_page(route_name) {
        location.href = "/super_admin/" + route_name;
    }
</script>

<div class="navigation_container">
    <div
        class="nav_button home"
        on:click={() => {
            handle_goto_page("dashboard");
        }}
    >
        <span><i class="fas fa-home"></i></span>
        <!-- <p>Home</p> -->
    </div>
    <div
        class="nav_button scanner"
        on:click={() => {
            handle_goto_page("add_admin");
        }}
    >
        <span><i class="fas fa-user-plus"> </i></span>
        <!-- <p>location</p> -->
    </div>
    <div
        class="nav_button transaction"
        on:click={() => {
            handle_goto_page("assign_admins");
        }}
    >
        <span><i class="fa-solid fa-user-tie"></i></span>
        <!-- <p>Notification</p> -->
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
        width: 70%;
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
