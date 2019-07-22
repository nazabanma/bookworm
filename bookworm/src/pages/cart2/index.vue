<template>
    <div class="container">
        <!-- <comcart></comcart> -->

        <commy-bar></commy-bar>
        <popup-bar></popup-bar>
        <check-box></check-box>

    </div>
</template>

<script>
    // import comcart from '@/components/lycomponents/comcart'
    import commyBar from '@/components/lycomponents/commy'
    import popupBar from '@/components/lycomponents/popup'
    import checkBox from '@/components/lycomponents/checkbox'

    export default {
        components: {
            // comcart,
            commyBar,
            popupBar,
            checkBox,
        },

    }
</script>

<style>
    .container {
        display: block;
        top: 0px;
        margin: 0;
        height: auto;
        position: relative;
        width: 100%;
        padding: 0.9rem 0 0;
        background-color: #F5F5F5;
    }
</style>