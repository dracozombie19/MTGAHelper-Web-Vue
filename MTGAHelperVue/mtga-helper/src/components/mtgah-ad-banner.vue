<template>
    <div class="navbar-end">
        <div v-for="ad in renderedAds" :key="ad.href" class="navbar-item has-text-centered tooltip is-tooltip-bottom is-tooltip-multiline" style="padding:0 inherit;">
            <a :href="ad.href" target="_blank" :title="$t(ad.tooltip)">
                <img :src="ad.img" :alt="$t(ad.text)" style="height:52px; vertical-align:middle;" />
            </a>
        </div>
        <div v-if="isSupporter"
             class="navbar-item has-text-centered is-hidden-desktop-only tooltip is-tooltip-bottom"
             :title="$t('ads.patreon.thanks')">
            <i class="fas fa-heart" style="color: rgb(191, 0, 0);"></i>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            ads: [
                {
                    img: '/img/amazon.png',
                    text: 'ads.amazon.text',
                    tooltip: 'ads.amazon.tooltip',
                    href: 'https://www.amazon.com?tag=mtgahelper01-20'
                },
                {
                    img: 'https://c5.patreon.com/external/favicon/favicon-32x32.png?v=69kMELnXkB',
                    text: 'ads.patreon.text',
                    tooltip: 'ads.patreon.tooltip',
                    href: 'https://www.patreon.com/mtgahelper',
                    hideAd: this.isSupporter
                },
                {
                    img: 'https://www.paypalobjects.com/webstatic/icon/pp32.png',
                    text: 'ads.paypal.text',
                    tooltip: 'ads.paypal.tooltip',
                    href: 'https://www.paypal.me/mtgahelper'
                }
            ]
        };
    },
    computed: {
        ...mapState({
            isSupporter: (state) => state.user.isSupporter
        }),
        renderedAds() {
            return this.ads.filter((ad) => !ad.hideAd);
        }
    }
};
</script>

<style scoped>
</style>
