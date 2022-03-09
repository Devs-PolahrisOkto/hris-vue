export default {
  authToken: localStorage.getItem('authToken'),
  authUser: JSON.parse(localStorage.getItem('authUser')),
  errors: {
    errors: {},
    message: '',
  },
};
