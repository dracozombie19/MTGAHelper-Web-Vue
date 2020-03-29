<template>
    <div> Collection: {{ collection }}
        <!-- <nav class="level">
            <div class="level-left">
                <div class="level-item">
                    <h4 class="title is-4"> {{numeral(collection.cards.reduce((a, b) => a += b.amount, 0)).format('0,0')}} cards owned {{collection.collectionDate.startsWith('0001-01-01') ? '' : '  as of ' + collection.collectionDate }} </h4>
                </div>
                <div v-if="collection.cards.length > 0" class="level-item">
                    <button class="button is-info" style="margin-left:0.5rem;"
                            @click="showModalExportCollection = true;"> Export in CSV format </button>
                </div>
                <div v-if="collection.cards.length > 0" class="level-item nowrap"
                     style="margin-left:1rem;"> Order sets by &nbsp; <select v-model="userCollectionSetsOrderBy" class="input is-small"
                            @change="sortCollectionSets();">
                        <option v-for="r in userCollectionSetsOrderByList" :value="r.key"> {{ r.value }} </option>
                    </select>
                </div>
            </div>
        </nav> -->
        <!-- <div v-if="isNotificationActive('tipHScrollCollectionSets')"
                 class="notification is-hidden-desktop" style="margin-top:1em;">
                <button class="delete" v-on:click="stopNotification('tipHScrollCollectionSets')"></button>
                <p>
                    <span class="icon has-text-info"><i class="fas fa-info-circle"></i></span> You can scroll horizontally to see more sets </p>
            </div> -->
        <!-- <div class="columns horizontalItems is-mobile">
                <div class="column is-narrow horizontalItem" style="width:15.5rem;"
                     v-for="set in computeSets()">
                    <div class="box has-text-centered darkTable"
                         v-bind:style="'padding-left:0.5rem; padding-right:0.5rem; background: url(/images/set-' + set.name + '-pack.png); background-repeat:no-repeat; background-size:cover;'">
                        <img v-bind:src="'/images/set-' + set.name + '.png'"
                             v-on:click="modelUserCollectionFiltered.filters.set = set.name; modelUserCollectionFiltered.filters.rarity = ''; filterCollection();"
                             style="cursor:pointer;" />
                        <div class="has-text-weight-bold" style="margin:0.25rem;">
                            <div style="color:#eee;"> {{set.nbOwned}} / {{set.nbTotal}} </div>
                            <div class="is-size-7" style="margin-top:-0.2rem;"> {{numeral(set.pct).format('0.00%')}} </div>
                        </div>
                        <table class="table is-narrow darkTable" style="margin:0 auto;">
                            <tbody>
                                <tr v-for="rarity in ['Mythic', 'Rare', 'Uncommon', 'Common']"
                                    style="cursor:pointer;"
                                    v-on:click="modelUserCollectionFiltered.filters.set = set.name; modelUserCollectionFiltered.filters.rarity = rarity; filterCollection();">
                                    <td class="has-text-centered tooltip is-size-7"
                                        style="width:50%; vertical-align:middle;"
                                        v-bind:data-tooltip="modelUser.collection.cards.filter(i => i.notInBooster === false && i.set === set.name && i.rarity === rarity).reduce(function(a, b) { return a + b.amount; }, 0) + ' / ' + modelSets.filter(function(i) { return i.name === set.name && i.rarity === rarity; }).reduce(function(a, b) { return a + b.totalCards; }, 0) * 4">
                                        <img
                                             v-bind:src="'/images/' + set.name + '-' + rarity.substring(0,1) + '.png'" />
                                    </td>
                                    <td style="width:50%;">
                                        <div style="margin:0.25rem;">
                                            <div> {{modelUser.collection.cards.filter(i => i.notInBooster === false && i.set === set.name && i.rarity === rarity).reduce(function(a, b) { return a + b.amount; }, 0) }} / {{modelSets.filter(function(i) { return i.name === set.name && i.rarity === rarity; }).reduce(function(a, b) { return a + b.totalCards; }, 0) * 4}} </div>
                                            <div class="is-size-7"
                                                 style="color:#bcbcbc; margin-top:-0.2rem;"> {{numeral(modelUser.collection.cards.filter(i => i.notInBooster === false && i.set === set.name && i.rarity === rarity).reduce(function(a, b) { return a + b.amount; }, 0) / (modelSets.filter(function(i) { return i.name === set.name && i.rarity === rarity; }).reduce(function(a, b) { return a + b.totalCards; }, 0) * 4)).format('0.00%')}} </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> -->
        <!-- <table class="table is-narrow" style="width:unset;">
                <thead>
                    <tr>
                        <th colspan="4">Filters <span class="smallText gray">(Press Enter)</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="field">
                                <div class="control">
                                    <label class="label is-small">Format</label>
                                    <select class="input is-small"
                                            v-model="modelUserCollectionFiltered.filters.format"
                                            v-on:change="filterCollection();">
                                        <option v-for="f in modelUserCollectionFiltered.filters.formats"
                                                v-bind:value="f"> {{ f }} </option>
                                    </select>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="field">
                                <div class="control">
                                    <label class="label is-small">Set</label>
                                    <select class="input is-small"
                                            v-model="modelUserCollectionFiltered.filters.set"
                                            v-on:change="filterCollection();">
                                        <option v-for="set in modelUserCollectionFiltered.filters.sets"
                                                v-bind:value="set"> {{ set == '' ? '(All)' : set }} </option>
                                    </select>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="field">
                                <div class="control">
                                    <label class="label is-small">Rarity</label>
                                    <select class="input is-small"
                                            v-model="modelUserCollectionFiltered.filters.rarity"
                                            v-on:change="filterCollection();">
                                        <option v-for="r in modelUserCollectionFiltered.filters.rarities"
                                                v-bind:value="r"> {{ r == '' ? '(All)' : r }} </option>
                                    </select>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="field">
                                <div class="control">
                                    <label class="label is-small">Card</label>
                                    <input class="input is-small" type="text" autofill="off"
                                           v-model="modelUserCollectionFiltered.filters.card"
                                           autocomplete="off" v-on:change="filterCollection();" size="12"
                                           placeholder="e.g. gate colo" />
                                </div>
                            </div>
                        </td>
                        <td style="vertical-align:bottom;">
                            <div class="field">
                                <div class="control">
                                    <input type="checkbox" id="switchCollectionMissing"
                                           name="switchCollectionMissing" class="switch is-danger"
                                           v-model="modelUserCollectionFiltered.filters.showMissing"
                                           v-on:change="filterCollection()">
                                    <label
                                           for="switchCollectionMissing">{{modelUserCollectionFiltered.filters.showMissing ? 'Showing Missing' : 'Showing Collected'}}</label>
                                </div>
                            </div>
                        </td>
                        <td style="vertical-align:bottom;">
                            <div class="field">
                                <div class="control">
                                    <input type="checkbox" id="switchCollectionNotInBoosters"
                                           name="switchCollectionNotInBoosters" class="switch is-danger"
                                           v-model="modelUserCollectionFiltered.filters.showOnlyInBoosters"
                                           v-on:change="filterCollection()">
                                    <label
                                           for="switchCollectionNotInBoosters">{{modelUserCollectionFiltered.filters.showOnlyInBoosters ? 'Showing cards in boosters only' : 'Showing also cards unobtainable from boosters'}}</label>
                                </div>
                            </div>
                        </td>
                        <td style="vertical-align:bottom;">
                            <button v-if="collectionIsFiltered()" v-on:click="clearFiltersCollection();"
                                    class="button is-danger is-small"> Clear filters </button>
                        </td>
                    </tr>
                </tbody>
            </table> -->
        <!-- <h4 class="title is-4 is-marginless"> {{modelUserCollectionFiltered.filtered.reduce((a, b) => a + b.amount, 0)}} cards {{modelUserCollectionFiltered.filters.showMissing ? 'missing' : 'collected'}} with these filters </h4> -->
        <!-- <div class="tabs">
                <ul>
                    <li v-for="color in ['W','U','B','R','G','', 'Multicolor', 'Land']"
                        v-on:click="currentPageCollectionColor = color;"
                        v-bind:class="[ currentPageCollectionColor === color ? 'is-active' : '' ]">
                        <a>
                            <span v-if="color !== 'Multicolor' && color !== 'Land'">
                                <img v-bind:src="iconMana[color == '' ? 'C' : color]" class="iconMana"
                                     style="width:1.5rem; height:1.5rem;" />
                            </span>
                            <span v-else-if="color==='Multicolor'">
                                <img src="/images/color_gold.png" style="width:1.5rem; height:1.5rem;" />
                            </span>
                            <span v-else-if="color==='Land'">
                                <img v-bind:src="iconLand" style="width:1.5rem; height:1.5rem;" />
                            </span>
                            <span v-else> {{color}} </span>
                            <strong> ({{numeral(modelUserCollectionFiltered.filtered.filter((i) => color === 'Multicolor' ? i.color !== 'Land' && i.color.length > 1 : i.color === color).reduce((a, b) => a += b.amount, 0)).format('0,0')}} cards) </strong>
                        </a>
                    </li>
                </ul>
            </div> -->
        <!-- <div v-if="isNotificationActive('tipHScrollCollectionCards')"
                 class="notification is-hidden-desktop" style="margin-top:1em;">
                <button class="delete" v-on:click="stopNotification('tipHScrollCollectionCards')"></button>
                <p>
                    <span class="icon has-text-info"><i class="fas fa-info-circle"></i></span> You can scroll horizontally to see more cards </p>
            </div> -->
        <!-- <div class="horizontalItems">
                <ul class="horizontalItem"
                    style="height: 600px; display: flex; flex-direction: column; flex-wrap: wrap;">
                    <li v-for="c in modelUserCollectionFiltered.filtered.filter((i) => currentPageCollectionColor === 'Multicolor' ? i.color.length > 1 && i.color !== 'Land' : i.color === currentPageCollectionColor)"
                        v-on:mouseleave="showCard(null)" v-on:mouseover="showCard(c.imageCardUrl)"
                        class="cardHover" style="list-style-type: none;"> {{c.amount}}x {{c.name}} <span v-if="c.notInBooster" class="tooltip"
                              data-tooltip="This card cannot be obtained in booster packs">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                    </li>
                </ul>
            </div> -->
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            collection: (state) => state.user.collection
        })
    },
    beforeCreate() {
        console.log('Collection beforeCreate');
    }
};
</script>

<style scoped>
</style>
