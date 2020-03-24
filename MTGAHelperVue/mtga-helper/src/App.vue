<template>
    <div id="app">
        <div id="nav">
            <MTGAHHeader />
        </div>
        <router-view />
        <MTGAHFooter />
    </div>
</template>

<script>
import MTGAHFooter from '@/components/mtgah-footer.vue';
import MTGAHHeader from '@/components/mtgah-header.vue';
import store from '@/store/index';

export default {
    name: 'MTGArenaHelper',
    store,
    components: {
        MTGAHFooter,
        MTGAHHeader
    },
    data() {
        return {};
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}
</style>
