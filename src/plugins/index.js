/** VUE */
import Vue from 'vue';

/** BUEFY */
import Buefy from 'buefy';
Vue.use(Buefy, {
    defaultIconPack: 'mdi',
});

/** MATERIAL DESIGN ICONS */
import '@mdi/font/css/materialdesignicons.css';

// import vee-validate
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full.esm';
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

// import moment
import moment from 'moment';
Vue.prototype.$moment = moment;