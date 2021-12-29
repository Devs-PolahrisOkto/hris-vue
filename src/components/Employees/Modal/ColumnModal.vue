<template>
  <b-modal
    v-model="active"
    :width="640"
    :can-cancel="['x']"
  >
    <form action="">
      <div class="modal-card">
        <header class="modal-card-head is-flex is-justify-content-space-between">
          <h6 class="is-flex is-align-items-center">
            <b-icon icon="table-column" size="is-small"></b-icon>
            <h6 class="is-size-6 has-text-weight-bold px-3">Columns</h6>
          </h6>
          <button
            type="button"
            class="delete"
            @click="$emit('close')"
          ></button>
        </header>
        <section class="modal-card-body">
          <h6 class="is-size-6 has-text-weight-light mb-3">Hide or Show table columns.</h6>
          <template v-for="(column, index) in columns">
            <div
              :key="index"
              class="has-background-light
              px-5 py-3 mb-2 is-flex
              is-justify-content-space-between
              is-align-items-center"
            >
              <span class="is-size-6 has-text-weight-semibold">{{ column.title }}</span>
              <b-checkbox v-model="column.visible" :disabled="column.field === 'employeeName'"></b-checkbox>
            </div>
          </template>
        </section>
        <footer class="modal-card-foot is-flex is-justify-content-end">
          <b-button
            label="Cancel"
            @click="$emit('close')"
          />
          <b-button
            label="Save as default"
            type="is-primary"
          />
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
