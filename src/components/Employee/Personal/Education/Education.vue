<template>
  <div class="card mb-4">
    <header class="is-flex is-justify-content-space-between is-align-items-center py-2 pr-2">
      <h6 class="is-size-6 has-text-weight-light px-3">Educational Background</h6>
      <b-button
        size="is-small"
        icon-right="plus"
        @click="addEducationModal = true"
      />
    </header>
    <!-- Employee Educational Background -->
    <template v-for="item in education">
      <div
        :key="item.id"
        class="p-3"
      >
        <h6 class="is-size-6 has-text-weight-medium">{{ item.school }}</h6>
        <h6 class="is-size-6">{{ item.degree }}</h6>
        <h6 class="is-size-6">{{ item.inclusiveDates }}</h6>
      </div>
    </template>
    <!-- Employee Educational Background -->
    <!-- Start Modals -->
    <add-modal
      :active="addEducationModal"
      @close="addEducationModal = !addEducationModal"
    ></add-modal>
    <!-- End Modals -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    AddModal: () => import('@/components/Employee/Personal/Education/AddModal.vue'),
  },

  data () {
    return {
      addEducationModal: false,
    };
  },

  computed: {
    ...mapGetters({
      education: 'employee/selected/education',
    }),
  },
};
</script>

<style lang="scss" scoped>
/deep/ .table td,
/deep/ .table th {
    border: none;
}

/deep/ .pagination {
    padding-bottom: 10px;
    padding-right: 10px;
}
</style>
