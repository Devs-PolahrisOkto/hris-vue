import Vue from 'vue';
import AuthenticationClient from '@/api/clients/authentication-client';

const appUrl = 'https://apistaging.polahrisokto.com/api';

const api = {
  authentication: new AuthenticationClient(appUrl),
};

Vue.prototype.$api = api;
