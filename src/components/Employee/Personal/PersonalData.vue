<template>
<div>
    <educational-background></educational-background>
    <addresses-table></addresses-table>
    <contacts-table></contacts-table>
</div>
</template>

<script>
export default {
  components: {
    EducationalBackground: () => import('@/components/Employee/Personal/EducationalBackground.vue'),
    AddressesTable: () => import('@/components/Employee/Personal/Addresses.vue'),
    ContactsTable: () => import('@/components/Employee/Personal/Contacts.vue'),
  },

  data () {
    return {
      activeTab: 0,
    };
  },
};
</script>
