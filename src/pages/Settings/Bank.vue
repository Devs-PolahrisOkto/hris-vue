<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li class="is-active"><a href="#" aria-current="page">Banks</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->

    <!-- Bank Table -->
    <setting-layout>
      <div class="is-flex is-justify-content-space-between py-2">
        <b-input
          v-model="searchField"
          placeholder="Search..."
          type="search"
          icon="magnify">
        </b-input>
        <b-tooltip label="Add Bank">
          <b-button
            icon-right="plus"
            @click="add"
          />
        </b-tooltip>
      </div>
      <b-table
        :data="meta.isEmpty ? [] : filteredBanks"
        :striped="meta.isStriped"
        :hoverable="meta.isHoverable"
        :mobile-cards="meta.hasMobileCards"
        :paginated="meta.isPaginated"
        :per-page="meta.perPage"
        :current-page.sync="meta.currentPage"
        :pagination-simple="meta.isPaginationSimple"
        :pagination-position="meta.paginationPosition"
        :default-sort-direction="meta.defaultSortDirection"
        :pagination-rounded="meta.isPaginationRounded"
        :sort-icon="meta.sortIcon"
        :sort-icon-size="meta.sortIconSize"
        :default-sort="meta.defaultSortColumn"
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
    <!-- Bank Table -->

    <!-- Start Modals -->
    <add-bank-modal
      :active="addBankModal"
      @close="addBankModal = !addBankModal"
    ></add-bank-modal>

    <edit-bank-modal
      :active="editBankModal"
      @close="editBankModal = !editBankModal"
    ></edit-bank-modal>
    <!-- End Modals -->
  </main-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    SettingLayout: () => import('@/layouts/SettingLayout.vue'),
    AddBankModal: () => import('@/components/Settings/Bank/AddModal.vue'),
    EditBankModal: () => import('@/components/Settings/Bank/EditModal.vue'),
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
  },

  data () {
    return {
      searchField: '',
      addBankModal: false,
      editBankModal: false,
    };
  },

  computed: {
    ...mapGetters({
      columns: 'bank/table/columns',
      list: 'bank/table/list',
      meta: 'bank/table/meta',
    }),
    filteredBanks () {
      return this.list.filter(bank => bank
        .name
        .toLowerCase()
        .includes(this.searchField.toLowerCase()));
    },
  },

  methods: {
    ...mapActions({
      setForm: 'bank/setForm',
      getList: 'bank/list',
    }),
    add () {
      const bank = {
        name: '',
        description: '',
      };
      this.setForm(bank);
      this.addBankModal = true;
    },
    edit (bank) {
      this.setForm(bank);
      this.editBankModal = true;
    },
  },

  created () {
    this.getList();
  },
};
</script>
