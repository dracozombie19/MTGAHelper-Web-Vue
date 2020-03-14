<template>
  <div class="hero is-primary hero2bg" style="margin-bottom:1rem;">
    <div class="hero-body" style="text-shadow: 1px 1px 20px #000000;">
      <div>
        <h4 class="title is-4">About MTGAHelper</h4>
        <div class="box container">
          <img src="/images/hero1-bg.jpg" style="width:600px;" />
          <p>Welcome!</p>
          <p>
            What led to me creating MTGAHelper? It all started a long time ago when I tried out a
            certain card game in high school.
          </p>
          <p>
            I can clearly remember thinking I had a very cool deck at the time: a white milling deck.
            Pretty awful in retrospect but that's how I learned to both play and love Magic...Then I
            moved on to other activities and stopped playing.
          </p>
          <p>
            In 2018,
            <strong>Magic: The Gathering Arena</strong>'s Beta reared its head and I was
            instantly hooked again by the greatest card game ever created. In all that time between high
            school and then, I also happened to become a programmer.
          </p>
          <p>
            I started writing programs to help me analyze my data - collection, matches played, decks
            over all the web and such — and after a few months it came to become what is now known as
            MTGAHelper.
          </p>
          <p>
            I wanted to share the tools I am building with all the others MTGA enthusiasts out there.
            Hopefully you enjoy it!
          </p>
          <p>
            If you appreciate the tools being provided, see how you can help
            <strong>
              <a @click="showModalDonate">support the project</a>
            </strong>.
            and improve the servers responsiveness. Thanks!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'MtgahFooter',
  data() {
    return {};
  },
  methods: {
		showModalDonate () {
			// TODO: show modal or raise event
				console.warn('showModalDonate');
		}
  },
};
</script>
