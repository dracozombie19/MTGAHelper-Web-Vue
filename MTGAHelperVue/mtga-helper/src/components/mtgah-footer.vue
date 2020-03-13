<template lang="html">

    <div class="container notification is-size-7"><!-- style="margin-top:1rem; padding:0.5rem 2.5rem 0.5rem 1.5rem;"-->
        <p class="footerLinks">
						<router-link to="/about">Privacy policy</router-link>
						<router-link to="/about">Terms of use</router-link>
						<router-link to="/about">Contact us</router-link>
						<router-link to="/about">About</router-link>
            <a href="https://github.com/ibiza240/MTGAHelper-Windows-Client/raw/master/MTGAHelperTracker.msi"
                target="_blank">Install the tracker</a>
        </p>
        <p>
            All art is property of their respective artists and/or Wizards of the Coast Inc.
            This website is not produced, endorsed, supported, or affiliated with Wizards of the Coast.
            MTGAHelper is unofficial Fan Content permitted under the Fan Content Policy.
        </p>
    </div>

</template>

<script lang="js">
export default {
  name: 'MtgahFooter',
  props: [],
  data() {
    return {

    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped>
.footerLinks a {
    margin-right: 2rem;
}
</style>
