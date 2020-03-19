<template>
    <div class="notification is-size-7">
        <p class="footerLinks">
            <router-link to="/PrivacyPolicy">Privacy policy</router-link>
            <router-link to="/TermsOfUse">Terms of use</router-link>
            <router-link to="/Contact">Contact us</router-link>
            <router-link to="/about">About</router-link>
            <a
               href="https://github.com/ibiza240/MTGAHelper-Windows-Client/raw/master/MTGAHelperTracker.msi"
               target="_blank">Install the tracker</a>
        </p>
        <p> All art is property of their respective artists and/or Wizards of the Coast Inc. This website is not produced, endorsed, supported, or affiliated with Wizards of the Coast. MTGAHelper is unofficial Fan Content permitted under the Fan Content Policy. </p>
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
