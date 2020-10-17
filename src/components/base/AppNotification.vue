<template>
    <div :class="$store.state.notification.isShowNotif ? 'visible' : 'hidden'" id="target">
        <div :class='`cookie-alert ${$store.state.notification.type}`'>
            <label>{{ $store.state.notification.message }}</label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppNotification',
    data() {
        return {
            timeout: 7000,
            close: false,
        }
    },
    created() {
    },
}
</script>

<style>
    @import '../styles/notification.css';
    .primary {
        background-color:royalblue;
        color: white;
        transition: opacity 1s;
    }

    .success {
        background-color: limegreen;
        color: white;
        transition: opacity 1s;
    }

    .error {
        background-color:orangered;
        color: white;
        transition: opacity 1s;
    }

    .visible {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.2s linear;
    }
    .hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 0.5s, opacity 0.5s linear;
    }
</style>