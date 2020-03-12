﻿import ApiService from "./ajax.js";
import * as constants from "./common/constants.js";
export {
    constants
};

var routes = [
    //{ pageName: pageThanks, route: 'thanks' },
    {
        pageName: constants.pageCollection,
        route: 'my/collection'
    },
    {
        pageName: constants.pageInventory,
        route: 'my/inventory'
    },
    {
        pageName: constants.pageMtgaDecks,
        route: 'my/mtgadecks'
    },
    {
        pageName: constants.pageHistory,
        route: 'my/history'
    },
    {
        pageName: constants.pageHistorySelected,
        route: 'my/history'
    },
    {
        pageName: constants.pageDecksTracked,
        route: 'my/trackedDecks'
    },
    {
        pageName: constants.pageDashboardSummary,
        route: 'my/missingCardsSummary'
    },
    {
        pageName: constants.pageDashboardDetails,
        route: 'my/missingCardsDetails'
    },
    {
        pageName: constants.pageScrapers,
        route: 'my/sources'
    },
    {
        pageName: constants.pageCustomDecks,
        route: 'my/decks'
    },
    {
        pageName: constants.pageMasteryPass,
        route: 'my/masteryPass'
    }
];

var vueApp = new Vue({
    el: '#vueApp',
    data: {
        isAppLoaded: false,
        themes: {
            light: "css/bulma.min.css",
            dark: "css/bulma-dark.min.css"
        },
        themeHelper: new constants.ThemeHelper(),
        dynamicLanding: true,
        constants: constants,

        //scryfallImagesPrefix: 'https://img.scryfall.com/cards',
        iconLand: 'https://c-4tvylwolbz88x24nhtlwlkphx2ejbyzljkux2ejvt.g00.gamepedia.com/g00/3_c-4tan.nhtlwlkph.jvt_/c-4TVYLWOLBZ88x24oaawzx3ax2fx2fnhtlwlkph.jbyzljku.jvtx2ftanzhschapvu_nhtlwlkphx2f0x2f04x2fShuk_zftivs.zcnx3fclyzpvux3dj4691m071m4544409k709i17hj9k41j1x26p87j.thyrx3dpthnl_$/$/$/$/$',
        imgCardUnknown: 'https://cdn11.bigcommerce.com/s-0kvv9/images/stencil/1280x1280/products/266486/371622/classicmtgsleeves__43072.1532006814.jpg?c=2&imbypass=on',

        iconMana: {
            W: 'https://vignette.wikia.nocookie.net/mtg/images/d/da/Mana_W.png',
            U: 'https://vignette.wikia.nocookie.net/mtg/images/a/a8/Mana_U.png',
            B: 'https://vignette.wikia.nocookie.net/mtg/images/a/a6/Mana_B.png',
            R: 'https://vignette.wikia.nocookie.net/mtg/images/c/ce/Mana_R.png',
            G: 'https://vignette.wikia.nocookie.net/mtg/images/f/f7/Mana_G.png',
            C: 'https://vignette.wikia.nocookie.net/mtg/images/1/18/Mana_C.png'
        },

        mouseX: 0,
        mouseY: 0,
        showUploadCollectionModal: false,
        //showLoginModal: false,
        showModalShareDeck: false,
        showModalDonate: false,
        showModalExportDeck: false,
        showModalExportCollection: false,
        showModalLogin: false,
        showModalChangeAccountUserId: false,
        showModalAdPreorder: false,
        deckToShare: {},

        exportCollectionFormat: '$name,$amount,$rarity,$set,$number',
        exportCollectionIncludeNotOwned: false,
        exportCollectionHeader: false,

        showModalExportDeckString: '',

        //loginUserId: '',
        accountUserId: '',

        lotsOfDecks: 1000,

        //loginWithUserId: '',

        navbarBurgerActive: false,
        //currentSection: constants.sectionGeneral,
        currentPage: constants.pageCollection,
        currentPageHistory: constants.pageHistoryEconomyEvents,
        currentPageProfileLandsType: 'Plains',
        currentPageMtgaDeckDetail: constants.pageMtgaDeckDetailCards,
        currentPageCollectionColor: 'W',

        loading: [],
        scraperIdLoading: '',

        modelCardSelectedUrl: '',
        contactMessage: '',

        wildcardsOrder: {
            'C': 0,
            'U': 1,
            'R': 2,
            'M': 3
        },

        modelChangelog: [],

        modelAccount: {
            isAuthenticated: false,
            message: null
        },

        signin: {
            email: '',
            password: ''
        },

        signup: {
            email: '',
            password: ''
        },

        topAd: {},
        topAds: [{
                img: '/images/amazon.png',
                text: '🎁 Shop for Christmas',
                tooltip: 'Help improve the services simply by using this link for your Amazon purchases. Thanks to all supporters!',
                href: 'https://www.amazon.com?tag=mtgahelper01-20'
            },
            {
                img: 'https://c5.patreon.com/external/favicon/favicon-32x32.png?v=69kMELnXkB',
                text: 'Join us on Patreon',
                tooltip: 'Join us on Patreon if you like this service and wish to show your appreciation 💪 Thanks to all supporters!',
                href: 'https://www.patreon.com/mtgahelper'
            },
            {
                img: 'https://www.paypalobjects.com/webstatic/icon/pp32.png',
                text: 'Contribute to the coffee fund',
                tooltip: 'Contribute to the coffee fund ☕ Thanks to all supporters!',
                href: 'https://www.paypal.me/mtgahelper'
            }
        ],

        navBarInfo: 'rank',
        navBarInfos: [
            'rank',
            'wildcards',
            'currency'
        ],

        modelAllCards: [],

        // Personal MTGA decks
        modelMtgaDeckSelected: {
            deckId: '',
            matches: []
            // ...
        },

        // General Decks page
        modelDeckSelected: {
            id: '',
            cardsMain: [],
            cardsSideboard: []
            // ...
        },

        modelDeckSelectedManaCurveCostSelected: -1,
        modelDeckSelectedCardsForManaCurve: [],

        modelDecks: {
            filters: {
                scraperTypeId: '(All)',
                name: '',
                color: '',
                date: '',
                card: ''
            },
            totalDecks: 0,
            decks: []
        },
        modelDecksFiltered: {
            perPage: 200,
            currentPage: 0,
            decks: []
        },

        // Tracked decks page
        modelUserDeckSelected: {
            id: '',
            cardsMain: [],
            cardsSideboard: []
        },

        modelUserDecks: {
            filters: {
                scraperTypeId: '(All)',
                name: '',
                color: '',
                date: '',
                card: '',
                missingWeight: '',
                showUntracked: false
            },
            totalDecks: 0,
            decks: []
        },
        //Array of: { priorityFactor, wildcardsMissingMain, wildcardsMissingSideboard, ... }
        modelUserDecksFiltered: {
            perPage: 100,
            currentPage: 0,
            decks: []
        },

        modelMasteryPass: {
            expectedDailyWins: 10,
            expectedWeeklyWins: 15
        },

        modelDraftsCalculator: {
            defaultValues: {
                winsPerDraft: 3,
                packsPerDraft: 1.35,
                raresPerDraft: 2.5,
                mythicsPerDraft: 0.5,
                additionalPacks: 0
            },

            winsPerDraft: 3,
            packsPerDraft: 1.35,
            raresPerDraft: 2.5,
            mythicsPerDraft: 0.5,
            sets: ["THB", "ELD", "M20", "WAR", "RNA", "GRN", "M19", "DOM", "RIX", "XLN"],
            setSelected: "THB",
            result: null,

            gemsPerWin: {
                0: 50,
                1: 100,
                2: 200,
                3: 300,
                4: 450,
                5: 650,
                6: 850,
                7: 950
            }
        },

        modelUser: {
            id: '',
            //nbLogin: 0,
            //changesSinceLastLogin: false,
            collection: {
                collectionDate: 'Unknown',
                cards: [],
                inventory: {
                    wildcards: {
                        Common: 0,
                        Uncommon: 0,
                        Rare: 0,
                        Mythic: 0
                    }
                }
            },
            decks: [],
            scrapers: [],
            scraperGroups: [
                //{
                //    //type: '',
                //    //searchByUser: '',
                //    //bySection: [
                //    //    { ScraperDto }
                //    //],
                //    //byUser: [
                //    //    { ScraperDto }
                //    //]
                //}
            ],
            weights: {},
            weightsProposed: {
                Mythic: 0,
                RareLand: 0,
                RareNonLand: 0,
                Uncommon: 0,
                Common: 0
            },
            notificationsInactive: []
        },

        modelUserCollectionFiltered: {
            filtered: [],
            cardsMissing: [],

            filters: {
                formats: ['Standard', 'Historic'],
                sets: ['', 'XLN', 'RIX', 'DOM', 'M19', 'GRN', 'RNA', 'WAR', 'M20', 'ELD', 'THB'],
                rarities: ['', 'Mythic', 'Rare', 'Uncommon', 'Common'],

                format: 'Standard',
                set: '',
                rarity: '',
                card: '',
                showMissing: false,
                showOnlyInBoosters: false
            }
        },

        // User preferences
        themeIsDark: true,
        userCollectionSetsOrderBy: 'PctOwned',
        landsPickAll: false,

        userCollectionSetsOrderByList: [{
                key: 'PctOwned',
                value: '% owned'
            },
            {
                key: 'NewestFirst',
                value: 'Released date (newest first)'
            }
        ],

        modelUserHistory: {
            totalItems: 0,
            perPage: 7,
            currentPage: 0,
            history: [],
            history2: []
        },
        //modelUserHistorySelected: {},
        modelUserHistorySelected2: {
            economyEvents: [],
            rankUpdates: []
        },
        modelUserHistoryMatchSelected: {},

        modelUserDeck: {
            name: '',
            url: '',
            mtgaFormat: ''
        },

        modelDashboard: {
            summary: [],
            details: [],
            detailsFiltered: [],

            detailsFilters: {
                sets: ['', /*'XLN', 'RIX', 'DOM', 'M19',*/ 'GRN', 'RNA', 'WAR', 'M20', 'ELD', 'THB'],
                rarities: ['', 'Mythic', 'RareLand', 'RareNonLand', 'Uncommon', 'Common'],

                set: '',
                rarity: ''
            }
        },

        modelDetailsCardSelected: {
            card: '',
            decks: []
        },

        modelLands: [],
        modelSets: [],
        modelNews: [],
        modelArticles: [],
        modelArticleSelected: {},
        modelMtgaDecksSummary: []
    },
    created: function () {
        let added = Object.keys(this.themes).map(name => {
            return this.themeHelper.add(name, this.themes[name]);
        });

        Promise.all(added).then(sheets => {
            this.themeHelper.theme = this.themeIsDark ? 'dark' : 'light';
            //document.getElementById("divInitialLoader").classList.remove("is-active");
        });

        addEventListener('popstate', this.loadPageFromBackButton, false);
    },
    beforeDestroy() {
        removeEventListener('popstate', this.loadPageFromBackButton);
    },
    mounted: function () {
        this.registerUser();
        this.getSets();
        this.getNews();
        this.getArticles();

        ApiService.sendAjaxGet('/api/Misc/Changelog', function (statuscode, body) {
            vueApp.modelChangelog = JSON.parse(body);
        });
    },
    methods: {
        localPasswordSignin_KeyUp: function (e) {
            if (e.keyCode === 13) {
                this.doSignin();
            }
        },
        localPasswordSignup_KeyUp: function (e) {
            if (e.keyCode === 13) {
                this.doSignup();
            }
        },
        doSignin: function () {
            if (this.signin.email.trim() === '' || this.signin.password.trim() === '') {
                this.modelAccount.message = 'Please provide an email and password';
                return;
            }

            ApiService.sendAjaxGet('/api/Account/Signin?email=' + encodeURIComponent(this.signin.email) + '&password=' + encodeURIComponent(this.signin.password), (statuscode, body) => {
                vueApp.modelAccount = JSON.parse(body);
                vueApp.showModalLogin = vueApp.modelAccount.isAuthenticated === false;
                if (vueApp.modelAccount.isAuthenticated) {
                    vueApp.refreshAll(true);
                }
            });
        },
        doResetPassword() {
            if (this.signin.email.trim() === '') {
                this.modelAccount.message = 'Please provide an email address';
                return;
            }

            if (confirm('Are you sure you want to reset the password for \'' + this.signin.email + '\'?')) {
                ApiService.sendAjaxGet('/api/Account/RequestPasswordReset?email=' + encodeURIComponent(this.signin.email), (statuscode, body) => {
                    vueApp.modelAccount = JSON.parse(body);
                    vueApp.showModalLogin = vueApp.modelAccount.isAuthenticated === false;
                    if (vueApp.modelAccount.isAuthenticated) {
                        vueApp.refreshAll(true);
                    }
                });
            }
        },
        doSignup: function () {
            if (this.signup.email.trim() === '' || this.signup.password.trim() === '') {
                this.modelAccount.message = 'Please provide an email and password';
                return;
            }

            // Local login
            var body = {
                email: this.signup.email,
                password: this.signup.password
            };
            this.loadData(constants.loadSignup, true);
            ApiService.sendAjaxPost('/api/Account', body, null, (statuscode, body) => {
                vueApp.loadData(constants.loadSignup, false);
                vueApp.modelAccount = JSON.parse(body);
            });
        },
        resendVerificationCode: function () {
            // Local login
            var body = {
                email: this.signup.email,
                password: this.signup.password
            };

            if (body.email.trim() === '' || body.password.trim() === '') {
                body = {
                    email: this.signin.email,
                    password: this.signin.password
                };
            }

            this.loadData(constants.loadResendCode, true);
            ApiService.sendAjaxPost('/api/Account/ResendVerificationCode', body, null, (statuscode, body) => {
                this.loadData(constants.loadResendCode, false);
                vueApp.modelAccount.message = JSON.parse(body).message;
                //vueApp.modelAccount.status = '';
            });
        },
        //callForChangelogAttention() {
        //    var element = document.getElementById('iconChangelog');
        //    element.classList.remove('start-now');
        //    element.classList.add('pulse');
        //    setTimeout(function () {
        //        //element.offsetWidth = element.offsetWidth;
        //        element.classList.add('start-now');
        //    }, 10);
        //},
        formatSetToFullName(set) {
            switch (set) {
                case 'THB':
                    return 'Theros: Beyond Death';
                case 'ELD':
                    return 'Throne of Eldraine';
                case 'M20':
                    return 'Core Set 2020';
                case 'WAR':
                    return 'War of the Spark';
                case 'RNA':
                    return 'Ravnica Allegiance';
                case 'GRN':
                    return 'Guilds of Ravnica';
                case 'M19':
                    return 'Core Set 2019';
                case 'DOM':
                    return 'Dominaria';
                case 'RIX':
                    return 'Rivals of Ixalan';
                case 'XLN':
                    return 'Ixalan';
            }

            return set;
        },
        loadPage(pageName, doPushState, prm) {
            if (pageName === constants.pageHistory) {
                if (this.modelUserHistory.totalItems === 0)
                    this.refreshUserHistory();
            } else if (pageName === constants.pageMtgaDecks) {
                if (this.modelMtgaDecksSummary.length === 0)
                    this.refreshMtgaDeckSummary();
            } else if (pageName === constants.pageDraftBeforeBoosters) {
                this.refreshDraftsCalculator();
            }

            if (typeof doPushState === 'undefined')
                doPushState = true;

            this.navbarBurgerActive = false;

            if (this.currentPage === pageName)
                return;

            this.currentPage = pageName;

            //if (pageName === pageNews ||
            //    pageName === pageDecks ||
            //    pageName === pageMeta ||
            //    pageName === pageStreams) {
            //    this.currentSection = constants.sectionGeneral;
            //}
            //else if (pageName === pageDecksTracked ||
            //    pageName === pageCollection ||
            //    pageName === pageMtgaDeckSummary ||
            //    pageName === pageHistory ||
            //    pageName === pageDecksTracked ||
            //    pageName === pageScrapers ||
            //    pageName === pageDashboardSummary ||
            //    pageName === pageDashboardDetails) {
            //    this.currentSection = constants.sectionMyData;
            //}

            var route = pageName;

            if (pageName === constants.pageDeckSelected) {
                route = constants.pageDecks + '/' + prm;
            } else if (pageName === constants.pageArticleSelected) {
                route = constants.pageArticles + '/' + prm;
            }
            //else if (pageName === pageMtgaDeckSelected) {
            //    route = 'my/' + pageMtgaDecks + '/' + prm;
            //}
            else {
                var idx = findWithAttr(routes, 'pageName', pageName);
                if (idx !== -1)
                    route = routes[idx].route;
            }

            if (doPushState)
                history.pushState({
                    route: route
                }, '', '/' + route);
        },
        loadData(key, isLoading) {
            var elems = [];

            this.loading
                .filter(i => isLoading || key !== i)
                .forEach(i => elems.push(i));

            if (isLoading) {
                elems.push(key);
            }

            this.loading = elems;
        },
        getClassIsLoadingData(key) {
            if (this.isLoadingData(key))
                return {
                    'is-loading': true
                };

            return '';
        },
        isLoadingData(key) {
            return this.loading.indexOf(key) >= 0;
        },
        isLoadingLotsOfDecks() {
            return this.modelUserDecks.decks.length >= this.lotsOfDecks && this.loading.indexOf(constants.pageDecksTracked) >= 0;
        },
        isNotificationActive(key) {
            return this.modelUser.notificationsInactive.indexOf(key) < 0;
        },
        showMissingRarity(rarity, set) {
            this.modelUserCollectionFiltered.filters.rarity = rarity;
            this.modelUserCollectionFiltered.filters.set = set;
            this.modelUserCollectionFiltered.filters.showMissing = true;
            this.modelUserCollectionFiltered.filters.showOnlyInBoosters = true;
            vueApp.filterCollection();
            this.loadPage(constants.pageCollection);
        },
        showCard(imageUrl) {
            if (imageUrl === null) {
                this.modelCardSelectedUrl = '';
            } else {
                this.modelCardSelectedUrl = imageUrl; //.startsWith('http') ? imageUrl : this.scryfallImagesPrefix + imageUrl;
                this.$nextTick(function () {
                    var div = document.getElementById('divCardImg');
                    var l = (vueApp.mouseX - 333);
                    if (l < 0) l += 500;
                    if (div !== null) {
                        div.style.left = l + 'px';
                        div.style.top = (vueApp.mouseY - 160) + 'px';
                    }
                });
            }
        },
        showCardsForManaCurve(cardsMain, manaCost) {
            if (manaCost === this.modelDeckSelectedManaCurveCostSelected) {
                this.modelDeckSelectedCardsForManaCurve = [];
                this.modelDeckSelectedManaCurveCostSelected = -1;
                return;
            }

            this.modelDeckSelectedManaCurveCostSelected = manaCost;
            this.modelDeckSelectedCardsForManaCurve = cardsMain
                .filter(c => (manaCost < 7 ? c.cmc === manaCost : c.cmc >= manaCost) && c.type.indexOf('Land') === -1);
        },
        //tryToLoginWithUserId() {
        //    vueApp.loadData('tryToLoginWithUserId', true);
        //    ApiService.sendAjaxGet('/api/User/FromUserId?id=' + this.loginUserId, function (statuscode, body) {
        //        var data = JSON.parse(body);
        //        vueApp.loadData('tryToLoginWithUserId', false);

        //        if (statuscode === 200) {
        //            vueApp.showLoginModal = false;
        //            vueApp.registerUser();
        //        }
        //        else {
        //            alert(data.error);
        //        }
        //    });
        //},
        changeAccountUserId() {
            vueApp.loadData('changeAccountUserId', true);
            ApiService.sendAjaxGet('/api/User/changeAccountUserId?userId=' + this.accountUserId, function (statuscode, body) {
                var data = JSON.parse(body);
                vueApp.loadData('changeAccountUserId', false);

                if (statuscode === 200) {
                    vueApp.showModalChangeAccountUserId = false;
                    vueApp.registerUser();
                } else {
                    alert(data.error);
                }
            });
        },
        displayModalExportDeck(deckToExport) {
            this.showModalExportDeckString = deckToExport;
            this.showModalExportDeck = true;
            document.getElementById('txtDeckExport').focus();
            setTimeout(function () {
                document.getElementById('txtDeckExport').select();
            }, 100);
        },
        getTotalWildcards() {

            var totalWildcards = vueApp.modelUser.collection.inventory.wildcards.Mythic +
                vueApp.modelUser.collection.inventory.wildcards.Rare +
                vueApp.modelUser.collection.inventory.wildcards.Uncommon +
                vueApp.modelUser.collection.inventory.wildcards.Common;
            return totalWildcards;
        },
        calculateWeightsProposed() {
            var divider = 840;
            var totalWildcards = this.getTotalWildcards();
            var weightsProposed = {
                Mythic: (divider / (vueApp.modelUser.collection.inventory.wildcards.Mythic / totalWildcards) / 100).toFixed(1),
                RareLand: (divider / (vueApp.modelUser.collection.inventory.wildcards.Rare / totalWildcards) / 100).toFixed(1),
                RareNonLand: (divider / (vueApp.modelUser.collection.inventory.wildcards.Rare / totalWildcards) / 100).toFixed(1),
                Uncommon: (divider / (vueApp.modelUser.collection.inventory.wildcards.Uncommon / totalWildcards) / 100).toFixed(1),
                Common: (divider / (vueApp.modelUser.collection.inventory.wildcards.Common / totalWildcards) / 100).toFixed(1)
            };
            vueApp.modelUser.weightsProposed = weightsProposed;
        },
        registerUser() {
            ApiService.sendAjaxGet('/api/User/Register', function (statuscode, body) {
                var data = JSON.parse(body);
                vueApp.modelUser.id = data.userId;
                vueApp.modelUser.isSupporter = data.isSupporter;
                vueApp.modelUser.nbLogin = data.nbLogin;

                function calcTopAdIndex(nbLogin) {
                    var idx = 0;
                    if (nbLogin >= 20) {
                        if (nbLogin >= 50) {
                            idx = Math.floor((nbLogin / 10) % 3);
                        } else {
                            idx = Math.floor(((10 + nbLogin) / 10) % 2);
                        }
                    }
                    return idx;
                }

                vueApp.topAd = vueApp.topAds[calcTopAdIndex(data.nbLogin)];

                //vueApp.modelUser.changesSinceLastLogin = data.changesSinceLastLogin;
                vueApp.modelUser.notificationsInactive = data.notificationsInactive;
                vueApp.signin.email = data.email;

                ApiService.sendAjaxGet('/api/User/Preferences', function (statuscode, body) {
                    var data = JSON.parse(body);
                    if (statuscode === 200) {
                        vueApp.themeIsDark = (data.userPreferences.ThemeIsDark.toLowerCase() === 'true');
                        vueApp.userCollectionSetsOrderBy = data.userPreferences.CollectionSetsOrder;
                        vueApp.landsPickAll = (data.userPreferences.LandsPickAll.toLowerCase() === 'true');
                    } else {
                        alert(data.error);
                    }
                });

                //if (vueApp.modelUser.changesSinceLastLogin) {
                //    setTimeout(vueApp.callForChangelogAttention, 10000);
                //}

                var urlParams = new URLSearchParams(window.location.search);
                vueApp.loadPageFromUrl(urlParams.get('r'), true);

                ApiService.sendAjaxGet('/api/Account', (statuscode, body) => {
                    vueApp.modelAccount = JSON.parse(body);
                });

                ApiService.sendAjaxGet('/api/Misc/Cards', (statuscode, body) => {
                    vueApp.modelAllCards = JSON.parse(body).cards;
                });

                vueApp.refreshAll(true);
            });
        },
        loadPageFromBackButton(e) {
            this.loadPageFromUrl(history.state === null ? null : history.state.route, false);
            e.preventDefault();
        },
        loadPageFromUrl(route, doPushState) {
            if (route !== null) {
                // Avoid dynamic landing if a route is used
                this.dynamicLanding = false;

                var routeParts = route.split('/');
                var pageName = routeParts[0];
                var prm = null;

                if (pageName === 'thanks') {
                    this.showModalDonate = true;
                    return;
                } else if (pageName === 'matchDetails') {
                    // HACK to not crash since direct landing on /matchDetails is not supported (no parameters)
                    pageName = 'my';
                    route = 'my/collection'
                    routeParts = ['my', 'collection'];
                }

                if (pageName === 'my')
                    pageName = routes[findWithAttr(routes, 'route', route)].pageName;

                if (pageName === constants.pageLands)
                    this.getLands();

                if (routeParts[0] !== 'my' && routeParts.length > 1) {
                    prm = routeParts[1];
                    switch (pageName) {
                        case constants.pageDecks:
                            pageName = constants.pageDeckSelected;
                            var hash = prm.split('-').pop(); // pop gets the last item
                            this.getDeckByHash(hash);
                            break;
                        case constants.pageArticles:
                            pageName = constants.pageArticleSelected;
                            this.modelArticleSelected = this.modelArticles[findWithAttr(this.modelArticles, 'id', prm)];
                            break;
                    }
                }

                this.loadPage(pageName, doPushState, prm);
            }
        },
        refreshAll(refreshCollection) {
            this.refreshDecks();
            this.refreshDecksTracked();
            this.refreshDashboard();
            this.refreshMasteryPass(true);

            if (refreshCollection) {
                this.loadData('collectionGet', true);
                this.isAppLoaded = true;
                ApiService.sendAjaxGet('/api/User/Collection', (statuscode, body) => {
                    vueApp.loadData('collectionGet', false);
                    vueApp.modelUser.collection = JSON.parse(body);

                    if (this.getTotalWildcards() > 0) {
                        vueApp.calculateWeightsProposed();
                    }

                    if (vueApp.dynamicLanding && vueApp.modelUser.collection.cards.length > 0)
                        vueApp.currentSection = constants.sectionMyData;

                    if (vueApp.modelUser.collection.cards.length === 0) {
                        document.getElementsByTagName('html')[0].setAttribute('class', 'adjustBgPos');
                    }

                    vueApp.filterCollection();
                });

                this.refreshCardsMissing();
            }

            this.filterCollection();
            this.refreshUserDecks();
            this.refreshUserScrapers();
            this.refreshUserWeights();
        },
        refreshCardsMissing() {
            this.loadData('collectionMissingGet', true);
            ApiService.sendAjaxGet('/api/User/Collection/Missing', (statuscode, body) => {
                vueApp.loadData('collectionMissingGet', false);
                vueApp.modelUserCollectionFiltered.cardsMissing = JSON.parse(body).cardsMissing;
            });
        },
        refreshMasteryPass(initRequest) {
            if (typeof initRequest === 'undefined') initRequest = true;

            var request = '/api/User/MasteryPass';
            if (initRequest === false)
                request += '?dailyWins=' + this.modelMasteryPass.expectedDailyWins + '&weeklyWins=' + this.modelMasteryPass.expectedWeeklyWins;

            this.loadData(constants.pageMasteryPass, true);
            ApiService.sendAjaxGet(request, (statuscode, body) => {
                vueApp.loadData(constants.pageMasteryPass, false);
                vueApp.modelMasteryPass = JSON.parse(body);
            });
        },
        calculateDraftGemsWon(nbDrafts) {
            var floor = this.modelDraftsCalculator.gemsPerWin[Math.floor(this.modelDraftsCalculator.winsPerDraft)];
            var ceiling = this.modelDraftsCalculator.gemsPerWin[Math.ceil(this.modelDraftsCalculator.winsPerDraft)];
            return (floor + ceiling) / 2 * nbDrafts;
        },
        resetDraftCalculator() {
            this.modelDraftsCalculator.winsPerDraft = 3;
            this.modelDraftsCalculator.raresPerDraft = this.modelDraftsCalculator.defaultValues.raresPerDraft;
            this.modelDraftsCalculator.mythicsPerDraft = this.modelDraftsCalculator.defaultValues.mythicsPerDraft;
            this.modelDraftsCalculator.packsPerDraft = this.modelDraftsCalculator.defaultValues.packsPerDraft;
            this.modelDraftsCalculator.additionalPacks = 0;
            this.refreshDraftsCalculator();
        },
        refreshDraftsCalculator() {
            //if (typeof initRequest === 'undefined') initRequest = true;

            var request = "/api/User/DraftBoostersCriticalPoint";
            //if (initRequest === false)
            //    request += '?dailyWins=' + this.modelMasteryPass.expectedDailyWins + '&weeklyWins=' + this.modelMasteryPass.expectedWeeklyWins;

            request +=
                "?set=" +
                this.modelDraftsCalculator.setSelected +
                "&raresPerDraft=" +
                this.modelDraftsCalculator.raresPerDraft +
                "&mythicsPerDraft=" +
                this.modelDraftsCalculator.mythicsPerDraft +
                "&packsPerDraft=" +
                this.modelDraftsCalculator.packsPerDraft +
                "&additionalPacks=" +
                (parseInt(this.modelDraftsCalculator.additionalPacks) || 0);

            this.loadData(constants.pageDraftBeforeBoosters, true);
            ApiService.sendAjaxGet(request, (statuscode, body) => {
                vueApp.loadData(constants.pageDraftBeforeBoosters, false);
                vueApp.modelDraftsCalculator.result = JSON.parse(body).result;
            });
        },
        refreshUserHistory() {
            this.loadData('userHistory', true);
            ApiService.sendAjaxGet('/api/User/History?currentPage=' + vueApp.modelUserHistory.currentPage + '&perPage=' + vueApp.modelUserHistory.perPage, (statuscode, body) => {
                vueApp.modelUserHistory.history = JSON.parse(body).history;
                vueApp.modelUserHistory.history2 = JSON.parse(body).history2;
                vueApp.modelUserHistory.totalItems = JSON.parse(body).totalItems;
                vueApp.modelUserHistorySelected = {};
                vueApp.modelUserHistoryMatchSelected = {};
                vueApp.loadData('userHistory', false);
            });
        },
        refreshUserHistoryForDate(date) {
            this.loadPage(constants.pageHistorySelected);
            this.loadData('userHistoryForDate', true);
            ApiService.sendAjaxGet('/api/User/History/' + moment(date).format('YYYYMMDD'), (statuscode, body) => {
                vueApp.modelUserHistorySelected = JSON.parse(body).history;
                vueApp.modelUserHistorySelected2 = JSON.parse(body).history2;
                vueApp.modelUserHistoryMatchSelected = {};
                vueApp.loadData('userHistoryForDate', false);
            });
        },
        refreshDecks: debounce(function () {
            this.loadData(constants.pageDecks, true);
            ApiService.sendAjaxGet('/api/Decks?card=' + this.modelDecks.filters.card, (statuscode, body) => {
                var data = JSON.parse(body);
                vueApp.modelDecks.decks = data.decks;
                vueApp.modelDecks.totalDecks = data.totalDecks;
                vueApp.filterDecks(false, false);
                vueApp.loadData(constants.pageDecks, false);
            });
        }),
        refreshDecksTracked: debounce(function () {

            this.loadData(constants.pageDecksTracked, true);
            ApiService.sendAjaxGet('/api/User/Decks?card=' + this.modelUserDecks.filters.card, (statuscode, body) => {
                var data = JSON.parse(body);
                vueApp.modelUserDecks.decks = data.decks;
                vueApp.modelUserDecks.totalDecks = data.totalDecks;
                vueApp.filterDecks(true, false);
                vueApp.loadData(constants.pageDecksTracked, false);
            });
        }),
        refreshUserDecks() {
            this.loadData('userdecksGet', true);
            ApiService.sendAjaxGet('/api/User/CustomDecks', (statuscode, body) => {
                vueApp.modelUser.decks = JSON.parse(body).decks;
                vueApp.filterDecks();
                vueApp.loadData('userdecksGet', false);
            });
        },
        refreshMtgaDeckSummary() {
            this.loadData(constants.pageMtgaDecks, true);
            ApiService.sendAjaxGet('/api/User/MtgaDeckSummary', (statuscode, body) => {
                var summary = JSON.parse(body).summary;
                // Sort descending by lastPlayed
                summary.sort((a, b) => a.lastPlayed > b.lastPlayed ? -1 : b.lastPlayed > a.lastPlayed ? 1 : 0);
                vueApp.modelMtgaDecksSummary = summary;
                vueApp.loadData(constants.pageMtgaDecks, false);
            });
        },
        refreshDashboard() {
            this.loadData('dashboard', true);
            ApiService.sendAjaxGet('/api/Dashboard', (statuscode, body) => {
                if (statuscode === 200) {
                    var data = JSON.parse(body);
                    vueApp.modelDashboard.details = data.details;
                    vueApp.modelDashboard.summary = data.summary;
                    vueApp.filterDashboardDetails();
                    vueApp.loadData('dashboard', false);
                }
            });
        },
        refreshUserScrapers() {
            this.loadData('userscrapersGet', true);
            ApiService.sendAjaxGet('/api/User/Scrapers', (statuscode, body) => {
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    var scrapersByType = data.scrapersByType
                        .groupBy('type')
                        .map(i => {
                            return {
                                type: i.key,
                                searchByUser: '',
                                bySection: i.values.filter(x => {
                                    return x.isByUser === false;
                                }),
                                byUser: i.values.filter(x => {
                                    return x.isByUser === true;
                                }),
                                group: i.key === 'aetherhub' ? 0 : i.key === 'mtggoldfish' || i.key === 'mtgtop8' || i.key === 'mtgatool' || i.key === 'userdecksource' ? 1 : 2
                            };
                        });

                    var scraperGroups = scrapersByType
                        .groupBy('group');

                    vueApp.$set(this.modelUser, 'scrapers', scrapersByType);
                    vueApp.$set(this.modelUser, 'scraperGroups', scraperGroups);
                } else {
                    alert(data.error);
                }

                vueApp.filterDecks();
                vueApp.loadData('userscrapersGet', false);
            });
        },
        refreshUserWeights() {
            vueApp.loadData('getWeights', true);
            ApiService.sendAjaxGet('/api/User/Weights', (statuscode, body) => {
                vueApp.loadData('getWeights', false);
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    vueApp.modelUser.weights = data.weights;
                } else {
                    alert(data.error);
                }
            });
        },
        loadMatchDetails(matchId, matchDate) {
            vueApp.loadData('getMatchDetails', true);
            ApiService.sendAjaxGet('/api/User/MatchDetails?matchId=' + matchId + '&matchDate=' + moment(matchDate).format('YYYYMMDD'), (statuscode, body) => {
                vueApp.loadData('getMatchDetails', false);
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    vueApp.viewMatchDetails(data.match);
                } else {
                    alert(data.error);
                }
            });
        },
        getSets() {
            this.loadData('getSets', true);
            ApiService.sendAjaxGet('/api/Misc/Sets', (statuscode, body) => {
                vueApp.loadData('getSets', false);
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    vueApp.modelSets = data.sets;
                } else {
                    alert(data.error);
                }
            });
        },
        getNews() {
            this.loadData('getNews', true);
            ApiService.sendAjaxGet('/api/Misc/News', (statuscode, body) => {
                vueApp.loadData('getNews', false);
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    vueApp.modelNews = data;
                } else {
                    alert(data.error);
                }
            });
        },
        getArticles() {
            this.loadData('getArticles', true);
            ApiService.sendAjaxGet('/api/Misc/Articles', (statuscode, body) => {
                vueApp.loadData('getArticles', false);
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    vueApp.modelArticles = data;
                } else {
                    alert(data.error);
                }
            });
        },
        computeSets() {
            var data = this.modelSets
                .filter(function (i) {
                    return vueApp.modelUserCollectionFiltered.filters.format === '' || i.formats.indexOf(vueApp.modelUserCollectionFiltered.filters.format) >= 0;
                })
                .groupBy('name')
                .map(function (i) {
                    return {
                        name: i.key,
                        totalCards: i.values.reduce(function (a, b) {
                            return a + b.totalCards;
                        }, 0)
                    };
                });

            var computed = data
                .map(function (set) {
                    return {
                        name: set.name,
                        nbOwned: vueApp.modelUser.collection.cards.filter(i => i.set === set.name && i.notInBooster === false).reduce(function (a, b) {
                            return a + b.amount;
                        }, 0),
                        nbTotal: set.totalCards * 4,
                        pct: vueApp.modelUser.collection.cards.filter(i => i.set === set.name && i.notInBooster === false).reduce(function (a, b) {
                            return a + b.amount;
                        }, 0) / (set.totalCards * 4)
                    };
                });

            computed.sort(function (a, b) {
                switch (vueApp.userCollectionSetsOrderBy) {
                    case 'NewestFirst':
                        // Less than ideal workaround to determine sets order
                        return vueApp.modelUserCollectionFiltered.filters.sets.indexOf(b.name) - vueApp.modelUserCollectionFiltered.filters.sets.indexOf(a.name);

                        //case 'PctOwned':
                    default:
                        return b.pct - a.pct;
                }
            });

            return computed;
        },
        getLands() {
            this.loadData('getLands', true);
            ApiService.sendAjaxGet('/api/Misc/Lands', (statuscode, body) => {
                vueApp.loadData('getLands', false);
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    var landsGrouped = data.lands
                        .groupBy('name')
                        .map(i => {
                            return {
                                type: i.key,
                                cards: i.values
                            };
                        });
                    vueApp.modelLands = landsGrouped;
                } else {
                    alert(data.error);
                }
            });
        },
        toggleLand(land) {
            land.isSelected = !land.isSelected;
        },
        saveLandsPreference: debounce(function () {
            vueApp.loadData('setLands', true);

            var landsSelected = vueApp.modelLands
                .reduce((a, b) => {
                    return a.concat(b.cards);
                }, [])
                .filter(i => i.isSelected)
                .map(i => i.grpId);

            var body = {
                lands: landsSelected
            };
            ApiService.sendAjaxPut('/api/User/Lands', body, null, (statuscode, body) => {
                vueApp.loadData('setLands', false);
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    var i = 0;
                } else {
                    alert(data.error);
                }
            });
        }, 2000),
        filterCollection() {
            var format = this.modelUserCollectionFiltered.filters.format.trim();
            var card = this.modelUserCollectionFiltered.filters.card.trim();
            var rarity = this.modelUserCollectionFiltered.filters.rarity;
            var set = this.modelUserCollectionFiltered.filters.set.trim();
            var showOnlyInBoosters = this.modelUserCollectionFiltered.filters.showOnlyInBoosters;

            var filtered = [];

            var source = this.modelUserCollectionFiltered.filters.showMissing ? this.modelUserCollectionFiltered.cardsMissing : this.modelUser.collection.cards;

            source.forEach(i => {
                var f = true;

                if (format !== '') {
                    var idxSet = findWithAttr(vueApp.modelSets, 'name', i.set);

                    if (idxSet === -1)
                        f &= format === 'Historic';
                    else
                        f &= vueApp.modelSets[idxSet].formats.indexOf(format) >= 0;
                }

                f &= set === '' || i.set === set;
                f &= rarity === '' || i.rarity === rarity;
                f &= card === '' || i.name.toLowerCase().indexOf(card.toLowerCase()) >= 0;
                f &= showOnlyInBoosters === false || i.notInBooster === false;

                if (f) filtered.push(i);
            });

            this.modelUserCollectionFiltered.filtered = filtered;
            this.$forceUpdate();
        },
        collectionIsFiltered() {
            return this.modelUserCollectionFiltered.filters.rarity !== '' ||
                this.modelUserCollectionFiltered.filters.format !== 'Standard' ||
                this.modelUserCollectionFiltered.filters.set !== '' ||
                this.modelUserCollectionFiltered.filters.card !== '' ||
                this.modelUserCollectionFiltered.filters.showMissing ||
                this.modelUserCollectionFiltered.filters.showOnlyInBoosters;
        },
        clearFiltersCollection() {
            this.modelUserCollectionFiltered.filters.rarity = '';
            this.modelUserCollectionFiltered.filters.format = 'Standard';
            this.modelUserCollectionFiltered.filters.set = '';
            this.modelUserCollectionFiltered.filters.card = '';
            this.modelUserCollectionFiltered.filters.showMissing = false;
            this.modelUserCollectionFiltered.filters.showOnlyInBoosters = false;
            this.filterCollection();
        },
        sortCollectionSets() {
            // Ugly hack for now
            // When refactoring, stop using computeSets() as the data source, rather use a computed field or something
            this.$forceUpdate();

            this.saveCollectionSetsOrder();
        },
        orderColorsWubrg(str) {
            var dictOrder = {
                W: 0,
                U: 1,
                B: 2,
                R: 3,
                G: 4
            };
            var colors = str.split('').sort(function (a, b) {
                return dictOrder[a] > dictOrder[b] ? 1 : dictOrder[a] < dictOrder[b] ? -1 : 0
            });
            return colors.join('');
        },
        filterDecks(tracked, reloadDecksIfRequired) {
            // default values
            if (typeof tracked === 'undefined') tracked = true;
            if (typeof reloadDecksIfRequired === 'undefined') reloadDecksIfRequired = true;

            var scraperTypeId = this.modelDecks.filters.scraperTypeId;
            var name = this.modelDecks.filters.name.trim();
            var color = this.orderColorsWubrg(this.modelDecks.filters.color.trim().toUpperCase());
            var daysAgo = this.modelDecks.filters.date.trim();
            var card = this.modelDecks.filters.card.trim();
            // tracked only
            var weight = this.modelUserDecks.filters.missingWeight;
            var showUntracked = this.modelUserDecks.filters.showUntracked;

            if (tracked) {
                scraperTypeId = this.modelUserDecks.filters.scraperTypeId;
                name = this.modelUserDecks.filters.name.trim();
                color = this.orderColorsWubrg(this.modelUserDecks.filters.color.trim().toUpperCase());
                daysAgo = this.modelUserDecks.filters.date.trim();
                card = this.modelUserDecks.filters.card.trim();
                //weight = this.modelUserDecks.filters.missingWeight;
                //showUntracked = this.modelUserDecks.filters.showUntracked;
            }

            if (reloadDecksIfRequired && card !== '') {
                tracked ? this.refreshDecksTracked() : this.refreshDecks();
                return;
            }

            var filtered = [];

            function isDateInRange(dateCreated) {
                var datePast = moment().add(-daysAgo, 'days');
                return moment(dateCreated) >= datePast;
            }

            function isWeightInRange(deckWeight) {
                if (weight.startsWith('>'))
                    return deckWeight > weight.slice(1).trim();
                else if (weight.startsWith('<'))
                    return deckWeight < weight.slice(1).trim();

                return false;
            }

            var decks = tracked ? this.modelUserDecks.decks : this.modelDecks.decks;
            decks.forEach(i => {
                var f = true;

                var fSourceFound = i.scraperTypeId !== null && scraperTypeId !== null && i.scraperTypeId.toLowerCase().indexOf(scraperTypeId.toLowerCase()) >= 0;
                var fSourceUnknown = scraperTypeId !== '' || i.scraperTypeId === '';
                var fSourceNull = i.scraperTypeId === null && scraperTypeId === null;
                f &= scraperTypeId === '(All)' || (fSourceFound && fSourceUnknown) || fSourceNull;

                f &= name === '' || i.name.toLowerCase().indexOf(name.toLowerCase()) >= 0;
                f &= color === '' || i.color === color;
                f &= daysAgo === '' || isDateInRange(i.dateCreated);

                if (tracked) {
                    f &= weight === '' || isWeightInRange(i.missingWeight);
                    f &= i.priorityFactor > 0 || showUntracked;
                }

                if (f) filtered.push(clone(i));
            });

            if (tracked) {
                this.modelUserDecksFiltered = {
                    decks: filtered,
                    perPage: 100,
                    currentPage: 0,
                };
            } else {
                this.modelDecksFiltered = {
                    decks: filtered,
                    perPage: 200,
                    currentPage: 0
                };
            }
        },
        decksAreFiltered(tracked) {
            // default value
            if (typeof tracked === 'undefined') tracked = true;

            if (tracked) {
                return this.modelUserDecks.filters.scraperTypeId !== '(All)' ||
                    this.modelUserDecks.filters.name !== '' ||
                    this.modelUserDecks.filters.color !== '' ||
                    this.modelUserDecks.filters.date !== '' ||
                    this.modelUserDecks.filters.card !== '' ||
                    this.modelUserDecks.filters.missingWeight !== '' ||
                    this.modelUserDecks.filters.showUntracked;
            } else {
                return this.modelDecks.filters.scraperTypeId !== '(All)' ||
                    this.modelDecks.filters.name !== '' ||
                    this.modelDecks.filters.color !== '' ||
                    this.modelDecks.filters.card !== '' ||
                    this.modelDecks.filters.date !== '';
            }
        },
        clearFiltersDecks(tracked) {
            // default value
            if (typeof tracked === 'undefined') tracked = true;

            var cardWasFiltered = false;

            if (tracked) {
                cardWasFiltered = this.modelUserDecks.filters.card !== '';
                this.modelUserDecks.filters.scraperTypeId = '(All)';
                this.modelUserDecks.filters.name = '';
                this.modelUserDecks.filters.color = '';
                this.modelUserDecks.filters.date = '';
                this.modelUserDecks.filters.card = '';
                this.modelUserDecks.filters.missingWeight = '';
                this.modelUserDecks.filters.showUntracked = false;
            } else {
                cardWasFiltered = this.modelDecks.filters.card !== '';
                this.modelDecks.filters.scraperTypeId = '(All)';
                this.modelDecks.filters.name = '';
                this.modelDecks.filters.color = '';
                this.modelDecks.filters.date = '';
                this.modelDecks.filters.card = '';
            }

            if (cardWasFiltered) {
                tracked ? this.refreshDecksTracked() : this.refreshDecks();
            } else {
                this.filterDecks(tracked);
            }
        },
        displayTotalCards(cards) {
            var nb = 0;
            if (typeof (cards) !== 'undefined') {
                nb = cards.reduce((a, b) => a += b.amount, 0);
            }
            return nb;
        },
        setDeckPriorityFactor(deckId, priorityFactor) {
            var p = parseFloat(priorityFactor);
            if (isNaN(p) || p < 0) {
                alert("Priority factor value is invalid");
                return;
            }

            if (p === 0) {
                this.stopTracking(deckId);
                return;
            }

            var idxFiltered = findWithAttr(this.modelUserDecksFiltered.decks, 'id', deckId);
            this.$set(this.modelUserDecksFiltered.decks[idxFiltered], 'priorityFactor', p);
            this.$set(this.modelUserDecksFiltered.decks[idxFiltered], 'missingWeight', this.modelUserDecksFiltered.decks[idxFiltered].missingWeightBase * this.modelUserDecksFiltered.decks[idxFiltered].priorityFactor);

            this.loadData('dashboard', true);
            ApiService.sendAjaxPatch('/api/User/DeckPriorityFactor', {
                DeckId: deckId,
                Value: p
            }, null, (statuscode, body) => {
                vueApp.refreshDashboard();
            });
        },
        stopTracking(deckId) {
            var idx = findWithAttr(this.modelUserDecks.decks, 'id', deckId);
            this.modelUserDecks.decks[idx].priorityFactor = 0;

            var idxFiltered = findWithAttr(this.modelUserDecksFiltered.decks, 'id', deckId);
            this.$set(this.modelUserDecksFiltered.decks[idxFiltered], 'priorityFactor', 0);

            this.loadData('dashboard', true);
            ApiService.sendAjaxPatch('/api/User/DeckPriorityFactor', {
                DeckId: deckId,
                Value: 0
            }, null, (statuscode, body) => {
                vueApp.refreshDashboard();
            });

            if (this.modelUserDecks.filters.showUntracked) {
                // Still preserve item in filtered list for display
            } else {
                this.modelUserDecksFiltered.decks.splice(idxFiltered, 1);

                if (this.modelUserDeckSelected.id === deckId) {
                    this.clearSelectedDeck();
                }
                //else {

                //}
            }
        },
        resetDecksPriorityFactor(value) {
            this.loadData(constants.pageDecksTracked, true);
            this.loadData('dashboard', true);
            ApiService.sendAjaxPatch('/api/User/DeckPriorityFactor/ResetAll', {
                Value: value
            }, null, (statuscode, body) => {
                vueApp.refreshDecksTracked();
                vueApp.refreshDashboard();
            });
        },
        trackFilteredDecks(doTrack) {
            this.loadData(constants.pageDecksTracked, true);
            this.loadData('dashboard', true);
            var decks = this.modelUserDecksFiltered.decks.map((d) => d.id);
            ApiService.sendAjaxPatch('/api/User/DeckPriorityFactor/FilteredDecks', {
                DoTrack: doTrack,
                Decks: decks
            }, null, (statuscode, body) => {
                vueApp.refreshDecksTracked();
                vueApp.refreshDashboard();
            });
        },
        getPages(currentPage, totalPages) {
            var arr = Array.from(Array(totalPages).keys());
            var arr2 = arr.map(i => Math.abs(i - currentPage) < 4 || i === totalPages - 1 || i === 0 ? i : '...');

            var arr3 = [];
            var last = '';
            arr2.forEach(i => {
                if (i !== last) arr3.push(i);
                last = i;
            });

            return arr3;
        },
        getUserHistoryPages() {
            return this.getPages(this.modelUserHistory.currentPage, this.historyTotalPages);
        },
        getUserHistoryPages2() {
            return this.getPages(this.modelUserHistory.currentPage, this.historyTotalPages2);
        },
        loadUserHistoryPage(pageNumber) {
            this.modelUserHistory.currentPage = pageNumber;
            this.refreshUserHistory();
        },
        getDecksPages(tracked) {
            // default value
            if (typeof tracked === 'undefined') tracked = true;

            var currentPage = tracked ? this.modelUserDecksFiltered.currentPage : this.modelDecksFiltered.currentPage;
            var totalPages = tracked ? this.decksTrackedTotalPages : this.decksTotalPages;
            return this.getPages(currentPage, totalPages);
        },
        getMtgaDeck(mtgaDeckSummary) {
            //if (this.modelMtgaDeckSelected.id === mtgaDeck.id)
            //    return;

            //this.modelMtgaDeckSelected = mtgaDeck;
            this.loadData(constants.loadMtgaDeck, true);

            // Should be decoupled!
            this.modelDeckSelectedManaCurveCostSelected = -1;
            this.modelDeckSelectedCardsForManaCurve = [];

            //this.loadPage(pageMtgaDeckSelected, false, mtgaDeckSummary.deckId);

            ApiService.sendAjaxGet('/api/User/MtgaDeckDetail?deckId=' + mtgaDeckSummary.deckId, function (statuscode, body) {
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    window.scrollTo(0, 0);
                    vueApp.modelMtgaDeckSelected = data.detail;
                    vueApp.loadData(constants.loadMtgaDeck, false);
                } else {
                    alert(data.error);
                }
            });
        },
        getDeck(deck) {
            //if (this.modelDeckSelected.id === deck.id)
            //    return;

            this.modelDeckSelected = deck;
            this.loadData(constants.loadDeck, true);

            // Should be decoupled!
            this.modelDeckSelectedManaCurveCostSelected = -1;
            this.modelDeckSelectedCardsForManaCurve = [];

            this.loadPage(constants.pageDeckSelected, true, this.getDeckUrl(deck, false));

            ApiService.sendAjaxGet('/api/Decks/' + deck.id, function (statuscode, body) {
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    vueApp.modelDeckSelected = data.deck;
                    vueApp.loadData(constants.loadDeck, false);
                } else {
                    alert(data.error);
                }
            });
        },
        getDeckTracked(deckId) {
            //if (this.modelUserDeckSelected.id === deckId)
            //    return;

            this.modelUserDeckSelected.id = deckId;
            this.loadData(constants.loadDeckTracked, true);

            // Should be decoupled!
            this.modelDeckSelectedManaCurveCostSelected = -1;
            this.modelDeckSelectedCardsForManaCurve = [];

            ApiService.sendAjaxGet('/api/Decks/' + deckId, function (statuscode, body) {
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    vueApp.modelUserDeckSelected = data.deck;
                    vueApp.loadData(constants.loadDeckTracked, false);
                } else {
                    alert(data.error);
                }
            });
        },
        getDeckByHash(hash) {
            this.loadData('deck', true);

            ApiService.sendAjaxGet('/api/Decks/ByHash/' + hash, function (statuscode, body) {
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    vueApp.modelDeckSelected = data.deck;
                } else {
                    alert(data.error);
                    vueApp.loadPage(constants.pageDecks);
                }

                vueApp.loadData('deck', false);
            });
        },
        clearSelectedDeck() {
            this.modelUserDeckSelected = {
                id: '',
                cardsMain: [],
                cardsSideboard: []
            };
        },
        filterDashboardDetails() {
            var set = this.modelDashboard.detailsFilters.set;
            var rarity = this.modelDashboard.detailsFilters.rarity;

            var filtered = [];

            this.modelDashboard.details
                .forEach(i => {
                    var f = true;
                    f &= set === '' || i.set === set;
                    f &= rarity === '' || i.rarity === rarity;

                    if (f) filtered.push(i);
                });

            this.modelDashboard.detailsFiltered = filtered;
            //this.modelDashboard = {
            //    summary: this.modelDashboard.summary,
            //    details: this.modelDashboard.details,
            //    detailsFiltered: filtered
            //};
            this.$forceUpdate();
        },
        dashboardDetailsAreFiltered() {
            return this.modelDashboard.detailsFilters.rarity !== '' ||
                this.modelDashboard.detailsFilters.set !== '';
        },
        clearFiltersDashboardDetails() {
            this.modelDashboard.detailsFilters.rarity = '';
            this.modelDashboard.detailsFilters.set = '';
            this.filterDashboardDetails();
        },
        getDecksForCard(card) {
            this.modelDetailsCardSelected.card = card;
            this.loadData('dashboardDetailsCardUsedIn', true);
            ApiService.sendAjaxGet('/api/Dashboard/DecksByCard?card=' + card, function (statuscode, body) {
                vueApp.loadData('dashboardDetailsCardUsedIn', false);
                vueApp.$set(vueApp.modelDetailsCardSelected, 'decks', JSON.parse(body).infoByDeck);
            });
        },
        openDashboardDetails(set, rarity) {
            this.modelDashboard.detailsFilters.set = set;
            this.modelDashboard.detailsFilters.rarity = rarity;

            this.filterDashboardDetails();

            this.loadPage(constants.pageDashboardDetails);
        },
        goToDeck(deckId, deckName) {
            this.clearFiltersDecks();
            this.modelUserDecks.filters.name = deckName;
            this.modelUserDecks.filters.showUntracked = true;
            this.filterDecks();

            this.loadPage(constants.pageDecksTracked);
            this.getDeckTracked(deckId);
        },
        getDeckFromUrl() {
            var url = this.modelUserDeck.url.toLowerCase();
            if (url.startsWith('https://aetherhub.com/deck/public') ||
                url.startsWith('https://www.mtggoldfish.com/')) {
                this.loadData('userDeckFromUrl', true);

                ApiService.sendAjaxPost('/api/Decks/FromUrl', {
                    url: url
                }, null, function (statuscode, body) {
                    var data = JSON.parse(body);
                    vueApp.loadData('userDeckFromUrl', false);
                    if (statuscode === 200) {
                        vueApp.modelUserDeck = {
                            url: url,
                            name: data.name,
                            mtgaFormat: data.mtgaFormat
                        };
                    } else {
                        alert(data.error);
                    }
                });
            }
        },
        addUserDeck() {
            var body = {
                name: this.modelUserDeck.name.trim(),
                url: this.modelUserDeck.url.trim(),
                mtgaFormat: this.modelUserDeck.mtgaFormat.trim()
            };

            vueApp.loadData('postCustomDeck', true);
            ApiService.sendAjaxPost('/api/User/CustomDecks', body, null, (statuscode, body) => {
                var data = JSON.parse(body);
                if (statuscode === 200) {
                    vueApp.modelUserDeck.name = '';
                    vueApp.modelUserDeck.url = '';
                    vueApp.modelUserDeck.mtgaFormat = '';

                    vueApp.refreshDecksTracked();
                    vueApp.refreshUserDecks();
                    vueApp.refreshDashboard();
                } else {
                    alert(data.error);
                }
                vueApp.loadData('postCustomDeck', false);
            });
        },
        deleteUserDeck(deckId) {
            ApiService.sendAjaxDelete('/api/User/CustomDecks/' + deckId, null, null, (statuscode, body) => {
                if (vueApp.modelUserDeckSelected.id === deckId) {
                    vueApp.clearSelectedDeck();
                }
                vueApp.refreshDecksTracked();
                vueApp.refreshUserDecks();
                vueApp.refreshDashboard();
            });
        },
        addUserScraper(type, name) {
            if (this.isLoadingData('userScraperAsync')) {
                alert('Please wait for the current operation to complete');
                return;
            }

            if (type !== 'streamdecker') {
                name = 'user_' + name;
            }

            if (this.getScrapersFlattened().filter(i => i.id === type + '-' + name.toLowerCase()).length > 0) {
                alert('This user is already monitored.');
                return;
            }

            var body = {
                id: type + '-' + name
            };
            this.scraperIdLoading = body.id;
            this.loadData('userScraperAsync', true);
            ApiService.sendAjaxPost('/api/User/Scrapers', body, null, (statuscode, body) => {
                var data = JSON.parse(body);
                this.loadData('userScraperAsync', false);
                if (statuscode === 200) {
                    vueApp.scraperIdLoading = '';
                    vueApp.refreshDecksTracked();
                    vueApp.refreshUserScrapers();
                    vueApp.refreshDashboard();
                } else {
                    alert(data.error);
                }
            });
        },
        getScrapersFlattened() {
            return this.modelUser.scrapers
                .reduce(function (a, b) {
                    return a.concat(typeof b.bySection === 'undefined' ? [] : b.bySection.concat(b.byUser));
                }, []);
        },
        saveUserScrapers: debounce(function () {
            //var idx = findWithAttr(this.modelUser.scrapers, 'id', scraperId);
            //var scraperInfo = this.modelUser.scrapers[idx];
            //var nbDecksAfter = this.modelUserDecks.decks.length + scraperInfo.nbDecks;
            var mergedActive = vueApp.getScrapersFlattened().filter(i => i.isActivated);

            var nbDecksAfter = mergedActive.reduce((a, b) => a += b.nbDecks, 0);
            if ( /*activate &&*/ nbDecksAfter > vueApp.modelUserDecks.decks.length && nbDecksAfter >= vueApp.lotsOfDecks) {
                if (confirm('Monitoring a large amount of decks might cause the app to slow down. Are you sure?') === false) {
                    // User cancelled: Revert the value and don't call the server
                    //this.$set(scraperInfo, 'isActivated', false);
                    //this.$nextTick(function () {
                    //    var chkId = 'scraper' + scraperId.replace('-', '');
                    //    var chk = document.getElementById(chkId);
                    //    chk.checked = false;
                    //});
                    //return;
                    vueApp.refreshUserScrapers();
                    return;
                }
            }

            var scrapersActive = mergedActive.map(i => i.id);
            ApiService.sendAjaxPut('/api/User/Scrapers', {
                ScrapersActive: scrapersActive
            }, null, (statuscode, body) => {
                if (statuscode === 200) {
                    vueApp.refreshDecksTracked();
                    vueApp.refreshDashboard();
                } else {
                    var data = JSON.parse(body);
                    alert(data.error);
                }
            });
        }, 1000),
        formatScraperKey(key, keepType) {
            if (key === null)
                return '';

            if (key.startsWith('usercustomdeck'))
                return 'User custom deck';

            var parts = key.split('-');
            var type = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

            var name = '';
            if (parts.length > 1)
                name = parts[1];

            if (name === 'averagearchetype') name = 'Average archetype';
            else if (name === 'meta') name = 'Meta';
            else if (name === 'metapaper') name = 'Meta (Paper)';
            else if (name === 'metaarena') name = 'Meta (Arena)';
            else if (name === 'againsttheodds') name = 'Against the Odds';
            else if (name === 'instantdecktech') name = 'Instant Deck Tech';
            else if (name === 'budgetmagic') name = 'Budget Magic';
            else if (name === 'goldfishgladiators') name = 'Goldfish Gladiators';
            else if (name === 'budgetarena') name = 'Budget Arena';
            else if (name === 'fishfiveo') name = 'Fish Five-0';
            else if (name === 'muchabrew') name = 'Much Abrew About Nothing';
            else if (name === 'singlescoop') name = 'Single Scoop';
            else if (name === 'streamhighlights') name = 'Stream Highlights';
            else if (name === 'tier1') name = 'Tier 1';
            else if (name === 'deckstobeat') name = 'Decks to beat';
            else if (name === 'mtgadeck') name = 'MTGA decks';
            else if (name.startsWith('user_')) name = name.substring(5, name.length);
            else if (name === 'bo1') name = 'Metagame Best of 1';
            else if (name === 'bo3') name = 'Metagame Best of 3';

            if (key.indexOf('-arenastandard') >= 0) name = name + ' (Arena)';
            if (key.indexOf('-standard') >= 0) name = name + ' (Standard)';

            name = name.charAt(0).toUpperCase() + name.slice(1);

            if (keepType)
                name = this.formatScraperType(type.toLowerCase()) + ' ' + name;

            return name;
        },
        formatScraperType(type) {
            if (type === 'aetherhub') type = 'AetherHub';
            else if (type === 'streamdecker') type = 'StreamDecker';
            else if (type === 'mtggoldfish') type = 'MtgGoldfish';
            else if (type === 'mtgdecks') type = 'MtgDecks';
            else if (type === 'mtgtop8') type = 'MtgTop8';
            else if (type === 'userdecksource') type = 'Your custom sources';
            else if (type === 'mtgatool') type = 'MTG Arena Tool';

            return type;
        },
        saveTheme() {
            ApiService.sendAjaxPost('/api/User/Preference?key=ThemeIsDark&value=' + this.themeIsDark, null, null, (statuscode, body) => {
                if (statuscode !== 200) {
                    var data = JSON.parse(body);
                    alert(data.error);
                }
            });
        },
        saveCollectionSetsOrder() {
            ApiService.sendAjaxPost('/api/User/Preference?key=CollectionSetsOrder&value=' + this.userCollectionSetsOrderBy, null, null, (statuscode, body) => {
                if (statuscode !== 200) {
                    var data = JSON.parse(body);
                    alert(data.error);
                }
            });
        },
        saveLandsPickAll() {
            ApiService.sendAjaxPost('/api/User/Preference?key=LandsPickAll&value=' + this.landsPickAll, null, null, (statuscode, body) => {
                if (statuscode !== 200) {
                    var data = JSON.parse(body);
                    alert(data.error);
                }
            });
        },
        setUserWeights() {
            if (isNaN(this.modelUser.weights.Mythic.main) || isNaN(this.modelUser.weights.Mythic.sideboard) ||
                isNaN(this.modelUser.weights.RareLand.main) || isNaN(this.modelUser.weights.RareLand.sideboard) ||
                isNaN(this.modelUser.weights.RareNonLand.main) || isNaN(this.modelUser.weights.RareNonLand.sideboard) ||
                isNaN(this.modelUser.weights.Uncommon.main) || isNaN(this.modelUser.weights.Uncommon.sideboard) ||
                isNaN(this.modelUser.weights.Common.main) || isNaN(this.modelUser.weights.Common.sideboard)) {
                alert('Some weights are invalid');
                return;
            }

            var weightsToSend = {
                Mythic: {
                    main: parseFloat(this.modelUser.weights.Mythic.main),
                    sideboard: parseFloat(this.modelUser.weights.Mythic.sideboard)
                },
                RareLand: {
                    main: parseFloat(this.modelUser.weights.RareLand.main),
                    sideboard: parseFloat(this.modelUser.weights.RareLand.sideboard)
                },
                RareNonLand: {
                    main: parseFloat(this.modelUser.weights.RareNonLand.main),
                    sideboard: parseFloat(this.modelUser.weights.RareNonLand.sideboard)
                },
                Uncommon: {
                    main: parseFloat(this.modelUser.weights.Uncommon.main),
                    sideboard: parseFloat(this.modelUser.weights.Uncommon.sideboard)
                },
                Common: {
                    main: parseFloat(this.modelUser.weights.Common.main),
                    sideboard: parseFloat(this.modelUser.weights.Common.sideboard)
                }
            };

            vueApp.loadData('setWeights', true);
            ApiService.sendAjaxPut('/api/User/Weights', {
                weights: weightsToSend
            }, null, (statuscode, body) => {
                vueApp.loadData('setWeights', false);
                if (statuscode === 200) {
                    vueApp.refreshDecksTracked();
                    vueApp.refreshDashboard();
                } else {
                    var data = JSON.parse(body);
                    alert(data.error);
                }
            });
        },
        resetUserWeights() {
            vueApp.loadData('setWeights', true);
            ApiService.sendAjaxPut('/api/User/Weights', {
                weights: null
            }, null, (statuscode, body) => {
                vueApp.loadData('setWeights', false);
                if (statuscode === 200) {
                    vueApp.refreshDecksTracked();
                    vueApp.refreshDashboard();
                    vueApp.refreshUserWeights();
                } else {
                    var data = JSON.parse(body);
                    alert(data.error);
                }
            });
        },
        showWeightsProposed() {
            return vueApp.modelUser.collection.inventory.wildcards.Mythic > 1 &&
                vueApp.modelUser.collection.inventory.wildcards.Rare > 1 &&
                vueApp.modelUser.collection.inventory.wildcards.Uncommon > 1 &&
                vueApp.modelUser.collection.inventory.wildcards.Common > 1;
        },
        applyUserWeightsProposed() {
            this.modelUser.weights.Mythic.main = this.modelUser.weightsProposed.Mythic;
            this.modelUser.weights.RareLand.main = this.modelUser.weightsProposed.RareLand;
            this.modelUser.weights.RareNonLand.main = this.modelUser.weightsProposed.RareNonLand;
            this.modelUser.weights.Uncommon.main = this.modelUser.weightsProposed.Uncommon;
            this.modelUser.weights.Common.main = this.modelUser.weightsProposed.Common;

            setTimeout(function () {
                if (confirm('Do you want to update the weights right away?')) {
                    vueApp.setUserWeights();
                }
            }, 100);
        },
        sendMessage() {
            vueApp.loadData('sendMessage', true);
            ApiService.sendAjaxPost('/api/Misc/Message', {
                Message: this.contactMessage
            }, null, (statuscode, body) => {
                vueApp.loadData('sendMessage', false);
                if (statuscode === 200) {
                    alert('Message sent!');
                    vueApp.contactMessage = '';
                } else {
                    var data = JSON.parse(body);
                    alert(data.error);
                }
            });
        },
        stopNotification(notifId) {
            this.modelUser.notificationsInactive.push(notifId);

            ApiService.sendAjaxPost('/api/User/StopNotification?notificationId=' + notifId, null, null, (statuscode, body) => {
                if (statuscode !== 200) {
                    var data = JSON.parse(body);
                    alert(data.error);
                }
            });
        },
        resetNotifications() {
            this.modelUser.notificationsInactive = [];

            ApiService.sendAjaxPost('/api/User/ResetNotifications', null, null, (statuscode, body) => {
                if (statuscode !== 200) {
                    var data = JSON.parse(body);
                    alert(data.error);
                }
            });
        },
        getDeckUrl(deck, fullUrl) {
            if (typeof deck.name === 'undefined') return '';

            if (typeof fullUrl === 'undefined') fullUrl = true;

            var nameSanitized = deck.name.toLowerCase().replace(/[^a-zA-Z\d]{3}/g, ' ').replace(/ /g, '-').replace(/[^a-zA-Z0-9-]+/gi, '');

            var prm = nameSanitized + '-' + deck.hash;

            if (fullUrl)
                prm = 'https://' + window.location.host + '/decks/' + prm;

            return prm;
        },
        tooltipRanking(isConstructed, rankInfo) {
            var prefix = isConstructed ? 'Constructed' : 'Limited';
            var tooltip = prefix + ' Ranking: ' + rankInfo.class + ' ' + rankInfo.level;
            if (rankInfo.percentile > 0)
                tooltip += ' (Top ' + rankInfo.percentile + '%)';
            return tooltip;
        },
        parseManaCost(manaCost) {
            if (manaCost === null) return [];
            var matches = manaCost.match(/{([^}]+)}/g);
            if (matches === null) return [];
            return matches.map(i => i.replace('{', '').replace('}', '').replace('/', ''));
        },
        viewMatchDetails(match) {
            this.modelUserHistoryMatchSelected = match;
            this.loadPage(constants.pageMatchDetails);
        },
        tooltipRank(rankDelta) {
            if (rankDelta.deltaSteps === 420) {
                return rankDelta.rankEnd.format + ': ' + rankDelta.rankEnd.class + ' ' + rankDelta.rankEnd.level;
            } else {
                return rankDelta.rankEnd.format + ': ' +
                    numeral(rankDelta.deltaSteps).format('+0,0') + ' step' + (Math.abs(rankDelta.deltaSteps) === 1 ? '' : 's') +
                    ' to ' + rankDelta.rankEnd.class + ' ' + rankDelta.rankEnd.level + '.' + rankDelta.rankEnd.step;

            }
        }
    },
    computed: {
        isLoadingSomething: function () {
            return this.isAppLoaded === false || this.isLoadingData('collectionPost') || this.isLoadingData('collectionGet') || this.isLoadingLotsOfDecks();
        },
        decksTotalPages: function () {
            return Math.max(1, Math.ceil(this.modelDecksFiltered.decks.length / this.modelDecksFiltered.perPage));
        },
        decksTrackedTotalPages: function () {
            return Math.max(1, Math.ceil(this.modelUserDecksFiltered.decks.length / this.modelUserDecksFiltered.perPage));
        },
        historyTotalPages: function () {
            return Math.max(1, Math.ceil(this.modelUserHistory.history.length / this.modelUserHistory.perPage));
        },
        historyTotalPages2: function () {
            return Math.max(1, Math.ceil(this.modelUserHistory.totalItems / this.modelUserHistory.perPage));
        },
        paginatedHistory: function () {
            var list = this.modelUserHistory.history;

            if (this.modelUserHistory.currentPage >= this.historyTotalPages) {
                this.modelUserHistory.currentPage = this.historyTotalPages - 1;
            }
            var index = this.modelUserHistory.currentPage * this.modelUserHistory.perPage;
            return list.slice(index, index + this.modelUserHistory.perPage);
        },
        paginatedDecks: function () {
            var list = this.modelDecksFiltered.decks;

            if (this.modelDecksFiltered.currentPage >= this.decksTotalPages) {
                this.modelDecksFiltered.currentPage = this.decksTotalPages - 1;
            }
            var index = this.modelDecksFiltered.currentPage * this.modelDecksFiltered.perPage;
            return list.slice(index, index + this.modelDecksFiltered.perPage);
        },
        paginatedDecksTracked: function () {
            var list = this.modelUserDecksFiltered.decks;

            if (this.modelUserDecksFiltered.currentPage >= this.decksTrackedTotalPages) {
                this.modelUserDecksFiltered.currentPage = this.decksTrackedTotalPages - 1;
            }
            var index = this.modelUserDecksFiltered.currentPage * this.modelUserDecksFiltered.perPage;
            return list.slice(index, index + this.modelUserDecksFiltered.perPage);
        },
        dictScraperUrl: function () {
            var info = vueApp.modelUser.scrapers
                .map(i => i.bySection.map(j => {
                    return {
                        id: j.id,
                        url: j.url
                    };
                }).concat(i.byUser.map(j => {
                    return {
                        id: j.id,
                        url: j.url
                    };
                })));

            return info.reduce((a, b) => a.concat(b), []).reduce((a, b) => {
                a[b.id] = b.url;
                return a;
            }, {});
        },
        isPagePublic: function () {
            return this.currentPage !== constants.pageInventory &&
                this.currentPage !== constants.pageMasteryPass &&
                this.currentPage !== constants.pageDraftBeforeBoosters &&
                this.currentPage !== constants.pageBacklog &&
                this.currentPage !== constants.pageCollection &&
                this.currentPage !== constants.pageHistory &&
                this.currentPage !== constants.pageMtgaDecks &&
                this.currentPage !== constants.pageScrapers &&
                this.currentPage !== constants.pageDecksTracked &&
                this.currentPage !== constants.pageDashboardSummary &&
                this.currentPage !== constants.pageDashboardDetails &&
                this.currentPage !== constants.pageCustomDecks &&
                this.currentPage !== constants.pageProfile;
        },
        modelUserHistorySelectedEconomyEventsNewCards: function () {
            return this.modelUserHistorySelected2.economyEvents.map(i => i.newCards).flat(1).groupBy('rarity').sort((a, b) => this.wildcardsOrder[a.key[0]] > this.wildcardsOrder[b.key[0]] ? 1 : -1);
        }
    },
    watch: {
        'themeIsDark': function (themeIsDark) {
            vueApp.themeHelper.theme = themeIsDark ? 'dark' : 'light';
        }
    }
});

window.vueApp = vueApp;