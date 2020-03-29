<template lang="html">

<nav class="mtgah-header navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <router-link to="/" :title="$t('home')">
            <img src="../assets/wcC.png"> <!--class="is-hidden-desktop-only"-->
        </router-link>
        <router-link to="/News" :title="$t('newsTooltip')"
                     class="navbar-item tooltip is-tooltip-right is-size-7-desktop is-size-6-widescreen">
            {{$t('news')}}
        </router-link>
        <router-link to="/Articles" :title="$t('articlesTooltip')"
                     class="navbar-item tooltip is-tooltip-right is-size-7-desktop is-size-6-widescreen">
            {{$t('articles')}}
        </router-link>
        <router-link to="/Meta" :title="$t('metaTooltip')"
                     class="navbar-item tooltip is-tooltip-right is-size-7-desktop is-size-6-widescreen">
            {{$t('meta')}}
        </router-link>
        <router-link to="/Decks" :title="$t('decksTooltip')"
                     class="navbar-item tooltip is-tooltip-right is-size-7-desktop is-size-6-widescreen">
            {{$t('decks')}}
        </router-link>
        <div v-if="!isAuthenticated" class="is-hidden-desktop navbar-item">
            <a class="button tooltip is-tooltip-bottom" :title="$t('showSignInModalTooltip')" @click="showModalLogin">
                {{$t('signIn')}}
                <i class="fas fa-sign-in-alt" style="margin-left:0.5rem;"></i>
            </a>
        </div>
        <a role="button" class="navbar-burger burger" data-target="navbarTop"
            :class="navbarBurgerActive ? 'is-active' : ''" @click="toggleNavbarBurger">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
    <div id="navbarTop" class="navbar-menu" :class="navbarBurgerActive ? 'is-active' : ''">
        <div class="navbar-end">
            <AdBanner />
            <!-- <div class="navbar-item is-hidden-touch">
                <div class="buttons">
                    <a class="button tooltip is-tooltip-bottom"
                        data-tooltip="Manually import your MTGA log file"
                        :class="[modelUser.collection.cards.length === 0 ? 'is-primary' : '']"
                        @click="showUploadCollectionModal = true">
                        <i class="fas fa-file-import"></i>
                        &nbsp;
                        <strong class="is-hidden-desktop-only">Import</strong>
                    </a>
                </div>
            </div> -->
            <!-- <div v-if="modelUser.collection.cards.length > 0" class="navbar-item" style="width:18.25rem;">
                <div style="width: 100%; display:flex; align-items:center; justify-content:flex-end;">
                    !-- <template v-if="navBarInfo === 'rank'">
                        <span v-if="modelUser.collection.constructedRank.class === null">&nbsp;</span>
                        <span v-else class="tooltip is-tooltip-left" style="line-height:1;"
                            :data-tooltip="'Constructed Ranking: ' + modelUser.collection.constructedRank.class + ' ' + modelUser.collection.constructedRank.level">
                            <img
                                :src="'/images/ranks/constructed/' + modelUser.collection.constructedRank.class + '_' + modelUser.collection.constructedRank.level + '.png'" />
                        </span>
                        <span v-if="modelUser.collection.constructedRank.class === null"
                            style="margin-left:0.5rem;">&nbsp;</span>
                        <span v-else class="tooltip is-tooltip-left"
                            style="margin-left:0.5rem; line-height:1;"
                            :data-tooltip="'Limited Ranking: ' + modelUser.collection.limitedRank.class + ' ' + modelUser.collection.limitedRank.level">
                            <img
                                :src="'/images/ranks/limited/' + modelUser.collection.limitedRank.class + '_' + modelUser.collection.limitedRank.level + '.png'" />
                        </span>
                        <span style="margin-left:0.5rem;">
                            {{modelUser.collection.playerName}}
                        </span>
                    </template>
                    <template v-if="navBarInfo === 'wildcards'">
    <span class="tooltip is-tooltip-left" data-tooltip="Common wildcards"> {{modelUser.collection.inventory.wildcards.Common}} <img class="wc" src="/images/wcC.png" />
    </span>
    <span
          class="tooltip is-tooltip-left"
          data-tooltip="Uncommon wildcards"
          style="margin-left:0.5rem;"> {{modelUser.collection.inventory.wildcards.Uncommon}} <img class="wc" src="/images/wcU.png" />
    </span>
    <span class="tooltip is-tooltip-left" data-tooltip="Rare wildcards" style="margin-left:0.5rem;"> {{modelUser.collection.inventory.wildcards.Rare}} <img class="wc" src="/images/wcR.png" />
    </span>
    <span
          class="tooltip is-tooltip-left"
          data-tooltip="Mythic wildcards"
          style="margin-left:0.5rem;"> {{modelUser.collection.inventory.wildcards.Mythic}} <img class="wc" src="/images/wcM.png" />
    </span>
</template>
                                                    <template v-if="navBarInfo === 'currency'">
    <span class="tooltip is-tooltip-left" data-tooltip="Gold"> {{numeral(modelUser.collection.inventory.gold).format('0,0')}} <img
             class="wc"
             src="/images/inventory_gold.png" />
    </span>
    <span class="tooltip is-tooltip-left" data-tooltip="Gems" style="margin-left:0.8rem;"> {{numeral(modelUser.collection.inventory.gems).format('0,0')}} <img
             class="wc"
             src="/images/inventory_gem.png" />
    </span>
    <span class="tooltip is-tooltip-left" data-tooltip="Vault progress" style="margin-left:0.8rem;"> {{numeral(modelUser.collection.inventory.vaultProgress).format('0.0')}} % <img
             class="wc"
             src="/images/vault.png" />
    </span>
</template> --
                    <span class="tooltip is-tooltip-right"
                        :data-tooltip="'Display ' + navBarInfos[(navBarInfos.indexOf(navBarInfo) + 1) % navBarInfos.length]">
                        <i class="fas fa-ellipsis-h"
                            style="margin-left:0.8rem; cursor:pointer; color:white;"
                            @click="navBarInfo = navBarInfos[(navBarInfos.indexOf(navBarInfo) + 1) % navBarInfos.length]"></i>
                    </span>

                </div>
            </div> -->
            <!-- <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                    <i class="fas fa-table is-size-5" style="margin-right:0.2rem;"></i>
                    <span class="is-hidden-desktop-only is-hidden-widescreen-only">My Data</span>
                </a>
                <div class="navbar-dropdown">
                    <a href="/my/inventory" class="navbar-item"
                        :class="currentPage === constants.pageInventory ? 'bold' : ''"
                        @click.prevent="loadPage(constants.pageInventory);">
                        <img src="/images/inventory_gold.png" style="margin-right:0.5rem; width:1rem;" />
                        Inventory
                    </a>
                    <a href="/my/collection" class="navbar-item"
                        :class="currentPage === constants.pageCollection ? 'bold' : ''"
                        @click.prevent="loadPage(constants.pageCollection);">
                        <i class="fas fa-table" style="margin-right:0.5rem; width:1rem;"></i>
                        Collection
                    </a>
                    <a href="/my/mtgadecks" class="navbar-item"
                        :class="currentPage === constants.pageMtgaDecks ? 'bold' : ''"
                        @click.prevent="loadPage(constants.pageMtgaDecks);">
                        <i class="fas fa-clone" style="margin-right:0.5rem; width:1rem;"></i>
                        MTGA Decks
                    </a>
                    <a href="/my/history" class="navbar-item"
                        :class="currentPage === constants.pageHistory ? 'bold' : ''"
                        @click.prevent="loadPage(constants.pageHistory);">
                        <i class="far fa-calendar-alt" style="margin-right:0.5rem; width:1rem;"></i>
                        History
                    </a>
                    <hr class="navbar-divider">
                    <a href="/my/decks" class="navbar-item"
                        @click.prevent="loadPage(constants.pageCustomDecks);">
                        <i class="far fa-file" style="margin-right:0.5rem; width:1rem;"></i>
                        Custom decks
                    </a>
                </div>
            </div> -->
            <!-- <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                    <i class="fas fa-hat-wizard" style="margin-right:0.2rem;"></i>
                    <span class="is-hidden-desktop-only is-hidden-widescreen-only">Advisors</span>
                </a>
                <div class="navbar-dropdown">
                    <a href="/my/sources" class="navbar-item"
                        :class="currentPage === constants.pageScrapers ? 'bold' : ''"
                        @click.prevent="loadPage(constants.pageScrapers);">
                        <i class="fas fa-stream" style="margin-right:0.5rem; width:1rem;"></i>
                        Deck sources
                    </a>
                    <hr class="navbar-divider">
                    <a href="/my/trackedDecks" class="navbar-item"
                        :class="currentPage === constants.pageDecksTracked ? 'bold' : ''"
                        @click.prevent="loadPage(constants.pageDecksTracked);">
                        <i class="fas fa-clone" style="margin-right:0.5rem; width:1rem;"></i>
                        Decks to play
                    </a>
                    <a href="/my/missingCardsSummary" class="navbar-item"
                        :class="currentPage === constants.pageDashboardSummary ? 'bold' : ''"
                        @click.prevent="loadPage(constants.pageDashboardSummary);">
                        <img :src="'/images/' + (modelDashboard.summary.length === 0 ? 'THB' : modelDashboard.summary[0].Key) + '-booster.png'"
                            style="margin-right:0.5rem; width:1rem;" />
                        Boosters to open
                    </a>
                    <a href="/my/missingCardsDetails" class="navbar-item"
                        :class="currentPage === constants.pageDashboardDetails ? 'bold' : ''"
                        @click.prevent="loadPage(constants.pageDashboardDetails);">
                        <img src="/images/wcC.png" style="margin-right:0.5rem; width:1rem;" />
                        Cards to craft
                    </a>
                </div>
            </div> -->
            <!-- <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                    <i class="fas fa-calculator is-size-5" style="margin-right:0.2rem;"></i>
                    <span class="is-hidden-desktop-only is-hidden-widescreen-only">Tools</span>
                </a>
                <div class="navbar-dropdown">
                    <a href="/my/masteryPass" class="navbar-item"
                        :class="currentPage === constants.pageMasteryPass ? 'bold' : ''"
                        @click.prevent="loadPage(constants.pageMasteryPass);">
                        <img src="/images/mastery.png" style="margin-right:0.5rem; width:2rem;" />
                        Mastery pass
                    </a>
                    <a href="/my/draftsBeforeBoosters" class="navbar-item"
                        :class="currentPage === constants.pageDraftBeforeBoosters ? 'bold' : ''"
                        @click.prevent="loadPage(constants.pageDraftBeforeBoosters);">
                        <i class="fas fa-traffic-light" style="font-size:1.1rem; margin-right:0.6rem;"></i>
                        Drafts vs boosters
                    </a>
                </div>
            </div> -->
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                    <i class="fas fa-cog is-size-4" style="margin-right:0.2rem;"></i>
                </a>
                <div class="navbar-dropdown">
                    <router-link v-if="isAuthenticated" to="/Profile" :title="$t('profile')"
                                class="navbar-item tooltip is-tooltip-right is-size-7-desktop is-size-6-widescreen">
                        <i class="fas fa-user-cog" style="margin-right:0.5rem; width:1rem;"></i>
                        {{$t('profile')}}
                    </router-link>
                    <router-link to="/Lands" :title="$t('lands')"
                                class="navbar-item tooltip is-tooltip-right is-size-7-desktop is-size-6-widescreen">
                        <img src="https://img.scryfall.com/cards/border_crop/front/0/2/023d333b-14f2-40ad-bb76-8b9e38040f89.jpg?1562730596"
                            style="margin-right:0.5rem; width:1rem;" />
                        {{$t('lands')}}
                    </router-link>
                </div>
            </div>
            <div v-if="isAuthenticated" class="navbar-item">
                <div class="buttons">
                    <button class="button" @click="signOut">{{$t('signOut')}}</button>
                </div>
            </div>
            <div v-else class="navbar-item is-hidden-touch">
                <a class="button tooltip is-tooltip-left" :title="$t('showSignInModalTooltip')" @click="showModalLogin">
                    {{$t('signIn')}}
                    <i class="fas fa-sign-in-alt" style="margin-left:0.5rem;"></i>
                </a>
            </div>
        </div>
    </div>
    <!-- <template
        v-if="modelUser.collection.cards.length === 0 && isLoadingData('collectionGet') === false && isPagePublic === false">
        <div class="hero herobg1 is-info">
            <div class="hero-body">
                <h2 class="title is-2" style="text-shadow: 4px 4px 10px #000000;">
                    MTGAHelper &mdash; The ultimate collection tracker for Magic: The Gathering Arena
                </h2>
                <div style="margin-left:4rem;">
                    <a class="button"
                        href="https://github.com/ibiza240/MTGAHelper-Windows-Client/raw/master/MTGAHelperTracker.msi">Start
                        by installing the Tracker</a>
                    <br />
                    <span style="text-shadow: 4px 4px 10px #000000;">
                        or upload your file manually by using the <strong>Import</strong> button in the
                        navigation bar at the top
                    </span>
                </div>
            </div>
        </div>
        <div class="hero is-primary hero2bg" style="margin-bottom:1rem;">
            <div class="hero-body" style="text-shadow: 1px 1px 20px #000000;">
                <template v-if="currentPage === constants.pageMasteryPass">
                    <h4 class="title is-4 is-marginless">
                        Using the MTGAHelper tracker, determine your final mastery level automatically
                    </h4>
                </template>
                <template v-else-if="currentPage === constants.pageDraftBeforeBoosters">
                    <h4 class="title is-4 is-marginless">
                        Using the MTGAHelper tracker, know exactly how many drafts to complete before
                        opening your boosters
                    </h4>
                </template>
                <template v-else>
                    <h4 class="title is-4">
                        Optimize your deckbuilding experience &mdash; Never waste another wildcard.
                    </h4>
                    <h4 class="subtitle is-4">
                        Grow your collection more efficiently by having a perfect picture of
                        <a onclick="vueApp.loadPage(constants.pageDashboardSummary);"
                            style="color:aquamarine;">
                            which packs to open
                        </a>
                        and
                        <a onclick="vueApp.loadPage(constants.pageDashboardDetails);"
                            style="color:aquamarine; display: inline-block;">
                            which cards to craft
                        </a>.
                    </h4>
                    <h5 class="subtitle is-5" style="margin-bottom:0;">
                        Upload your collection and
                        <a onclick="vueApp.loadPage(constants.pageScrapers);" style="color:aquamarine;">
                            start tracking your favorite decks
                        </a>
                        !
                    </h5>
                </template>
            </div>
        </div>
    </template> -->
    <AuthModal/>
</nav>

</template>

<script>
import { mapState } from 'vuex';
import { SHOW_SIGNIN_MODAL, RESET_USER_DATA } from '@/store/mutations';
import AuthenService from '@/common/AuthenService';
import AuthModal from './Authentication/mtgah-auth-modal.vue';
import AdBanner from './mtgah-ad-banner.vue';

export default {
    name: 'MtgahHeader',
    components: {
        AuthModal,
        AdBanner
    },
    data() {
        return {
            navbarBurgerActive: false
        };
    },
    computed: mapState({
        isAuthenticated: (state) => state.user.isAuthenticated
    }),
    methods: {
        toggleNavbarBurger() {
            this.navbarBurgerActive = !this.navbarBurgerActive;
        },
        showModalLogin() {
            console.warn('showModalLogin');
            this.$store.commit(SHOW_SIGNIN_MODAL);
        },
        signOut() {
            const self = this;
            AuthenService.signOut().then(function signOutHandler() {
                console.warn('signOutHandler');
                self.$store.commit(RESET_USER_DATA);
            });
        }
    }
};
</script>

<style scoped lang="css">
.mtgah-header a {
    font-weight: bold;
    color: #2c3e50;
}

.mtgah-header a.router-link-exact-active {
    color: #42b983;
}
</style>
