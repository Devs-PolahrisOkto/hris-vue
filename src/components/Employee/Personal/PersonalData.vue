<template>
  <div>
    <education></education>
    <addresses></addresses>
    <contacts></contacts>
  </div>
</template>

<script>
export default {
  components: {
    Education: () => import('@/components/Employee/Personal/Education/Education.vue'),
    Addresses: () => import('@/components/Employee/Personal/Address/Addresses.vue'),
    Contacts: () => import('@/components/Employee/Personal/Contact/Contacts.vue'),
  },

  data () {
    return {
      activeTab: 0,
    };
  },
};
</script>
