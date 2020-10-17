<template>
<div class="overlay flex-loader" v-if="$store.state.processing.isProcessing">
    <div class="loader" ></div>
    <br>
    <label style="color: white;">Please Wait...</label>
</div>
  
</template>

<script>
export default {
    name: 'AppLoading',
    data() {
        return {}
    }
}
</script>

<style>
    .loader {
        border-top: 16px solid blue;
        border-right: 16px solid green;
        border-bottom: 16px solid red;
        border-left: 16px solid pink;
        border-radius: 50%;
        width: 70px;
        height: 70px;
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(720deg); }
    }

    .overlay {
        position: fixed; /* Sit on top of the page content */
        display: flex;
        height: 100%;
        width: 100%;
        top: 0%;
        left: 0%;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5); /* Black background with opacity */
        cursor: pointer; /* Add a pointer on hover */
    }

    .flex-loader {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>