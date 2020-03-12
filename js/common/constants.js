export const ThemeHelper = function () {
    const preloadTheme = (href) => {
        let link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);

        return new Promise((resolve, reject) => {
            link.onload = e => {
                const sheet = e.target.sheet;
                sheet.disabled = true;
                resolve(sheet);
            };
            link.onerror = reject;
        });
    };

    const selectTheme = (themes, name) => {
        //if (name && !themes[name]) {
        //    throw new Error(`"${name}" has not been defined as a theme.`);
        //}
        Object.keys(themes).forEach(n => themes[n].disabled = (n !== name));
    };

    let themes = {};

    return {
        add(name, href) {
            return preloadTheme(href).then(s => themes[name] = s);
        },
        set theme(name) {
            selectTheme(themes, name);
        },
        get theme() {
            return Object.keys(themes).find(n => !themes[n].disabled);
        }
    };
};

export const sectionGeneral = 'general';
export const sectionMyData = 'myData';

export const pageHome = 'home';
export const pageNews = 'news';
export const pageArticles = 'articles';
export const pageArticleSelected = 'articleSelected';
export const pageStreams = 'streams';
export const pageMeta = 'meta';
export const pageAllCards = 'cards';
export const pageDecks = 'decks';
export const pageMasteryPass = 'masteryPass';
export const pageDeckSelected = 'deckSelected';
export const pageCollection = 'collection';
export const pageMtgaDecks = 'mtgaDecks';
export const pageMtgaDeckDetailCards = 'mtgaDeckDetailsCards';
export const pageMtgaDeckDetailMatches = 'mtgaDeckDetailsMatches';
//const pageMtgaDeckSelected = 'mtgaDeckSelected';
export const pageHistory = 'history';
export const pageHistorySelected = 'historySelected';
export const pageInventory = 'inventory';
export const pageDraftBeforeBoosters = 'draftsBeforeBoosters';
export const pageMatchDetails = 'matchDetails';
export const pageScrapers = 'scrapers';
export const pageDecksTracked = 'decksTracked';
export const pageDashboardSummary = 'dashboardSummary';
export const pageDashboardDetails = 'dashboardDetails';
export const pageProfile = 'profile';
export const pageCustomDecks = 'customDecks';
export const pageLands = 'lands';
export const pageContact = 'contact';
export const pageChangelog = 'changelog';
export const pagePrivacy = 'privacy';
export const pageTerms = 'terms';
export const pageAbout = 'about';
export const pageThanks = 'thanks';
export const pageBacklog = 'backlog';

export const pageHistoryCards = 'cards';
export const pageHistoryEconomyEvents = 'economyEvents';
export const pageHistoryMatches = 'matches';
//const pageHistoryRankUpdates = 'rankUpdates';

export const loadSignup = 'signup';
export const loadResendCode = 'loadResendCode';

export const loadDeck = 'deck';
export const loadDeckTracked = 'deckTracked';
export const loadMtgaDeck = 'mtgaDeck';