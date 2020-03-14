<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <MTGAHFooter />
  </div>
</template>

<script>
    import MTGAHFooter from '@/components/mtgah-footer.vue';

    export default {
        name: 'App',
        components: {
            MTGAHFooter
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

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

/* .container {
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px
}
@media(min-width: 544px) {
    .container {
        max-width: 576px
    }
}
@media(min-width: 768px) {
    .container {
        max-width: 720px
    }
}
@media(min-width: 992px) {
    .container {
        max-width: 940px
    }
}
@media(min-width: 1200px) {
    .container {
        max-width: 1140px
    }
}
.container-fluid {
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px
}
.container.page {
    margin-top: 1.5rem
} */
</style>
