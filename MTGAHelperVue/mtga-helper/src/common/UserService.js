import {ApiService} from './ApiService';

const baseUrl = '/api/User/';

export const UserService = {
    getCollection() {
        console.log('getCollection');
        // TODO: figure out how to get cookies working
        return ApiService.sendAjaxGet(`${baseUrl}Collection`);
            // vueApp.loadData('collectionGet', false);
            // vueApp.modelUser.collection = JSON.parse(body);

            // if (this.getTotalWildcards() > 0) {
            //     vueApp.calculateWeightsProposed();
            // }

            // if (vueApp.dynamicLanding && vueApp.modelUser.collection.cards.length > 0)
            //     vueApp.currentSection = constants.sectionMyData;

            // if (vueApp.modelUser.collection.cards.length === 0) {
            //     document.getElementsByTagName('html')[0].setAttribute('class', 'adjustBgPos');
            // }

            // vueApp.filterCollection();
    }
};

export default UserService;
