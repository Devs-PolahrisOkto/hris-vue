export default {
  methods: {
    getProfileImageUrl (user) {
      const { avatar, user: { firstname, lastname } } = user;
      if (avatar) {
        return avatar;
      }
      return `https://ui-avatars.com/api?size=256&name=${firstname}+${lastname && lastname.replace(' ', '')}`;
    },
  },
};
