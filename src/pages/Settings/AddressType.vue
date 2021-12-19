<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li class="is-active"><a href="#" aria-current="page">Address Types</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->

    <!-- Address Type Table -->
    <setting-layout>
      <div class="is-flex is-justify-content-space-between py-2">
        <b-input
          v-model="searchField"
          placeholder="Search..."
          type="search"
          icon="magnify">
        </b-input>
        <b-tooltip label="Add Address Type">
          <b-button
            icon-right="plus"
            @click="add"
          />
        </b-tooltip>
      </div>
      <b-table
        :data="isEmpty ? [] : filteredAddressTypes"
        :striped="isStriped"
        :hoverable="isHoverable"
        :mobile-cards="hasMobileCards"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :pagination-rounded="isPaginationRounded"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        default-sort="name"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template v-for="(column, index) in columns">
          <b-table-column
            :key="index"
            v-slot="props"
            :label="column.title"
            :field="column.field"
            :visible="column.visible"
            sortable
          >
            {{ props.row[column.field] }}
          </b-table-column>
        </template>
        <b-table-column
          v-slot="props" field="option"
          width="100"
          centered
        >
          <b-button
            size="is-small"
            type="is-primary"
            icon-right="pencil"
            @click="edit(props.row)"
          />
        </b-table-column>
        <template #empty>
          <no-record></no-record>
        </template>
      </b-table>
    </setting-layout>
    <!-- Address Type Table -->

    <!-- Start Modals -->
    <add-address-type-modal
      :active="addAddressTypeModal"
      @close="addAddressTypeModal = !addAddressTypeModal"
    ></add-address-type-modal>

    <edit-address-type-modal
      :active="editAddressTypeModal"
      @close="editAddressTypeModal = !editAddressTypeModal"
    ></edit-address-type-modal>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    SettingLayout: () => import('@/layouts/SettingLayout.vue'),
    AddAddressTypeModal: () => import('@/components/Settings/AddressType/AddModal.vue'),
    EditAddressTypeModal: () => import('@/components/Settings/AddressType/EditModal.vue'),
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
  },

  data () {
    return {
      layout: 'table',
      columns: [
        { title: 'Name', field: 'name', visible: true },
        { title: 'Description', field: 'description', visible: true },
      ],
      isEmpty: false,
      isStriped: false,
      isHoverable: true,
      hasMobileCards: true,
      isPaginated: false,
      isPaginationSimple: true,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 10,
      addAddressTypeModal: false,
      editAddressTypeModal: false,
      searchField: '',
    };
  },

  computed: {
    ...mapGetters({
      addressTypes: 'addressType/list',
    }),
    filteredAddressTypes () {
      return this.addressTypes.filter(addressType => addressType
        .name
        .toLowerCase()
        .includes(this.searchField.toLowerCase()));
    },
  },

  methods: {
    ...mapActions({
      setForm: 'addressType/setForm',
      getList: 'addressType/list',
    }),
    add () {
      const addressType = {
        name: '',
        description: '',
      };
      this.setForm(addressType);
      this.addAddressTypeModal = true;
    },
    edit (addressType) {
      this.setForm(addressType);
      this.editAddressTypeModal = true;
    },
  },

  created () {
    this.getList();
  },
};
</script>
