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
                    <b-icon icon="grid-large" size="is-small"></b-icon>
                    <h6 class="is-size-6 has-text-weight-bold px-3">Layout</h6>
                </h6>
                <button
                    type="button"
                    class="delete"
                    @click="$emit('close')"></button>
            </header>
            <section class="modal-card-body">
                <h6 class="is-size-6 has-text-weight-light mb-5">Choose preferred layout.</h6>
                <div class="is-flex is-justify-content-center">
                    <b-field class="px-3">
                        <b-radio
                            v-model="currentLayout"
                            size="is-medium"
                            native-value="table"
                            @input="$emit('change-layout', currentLayout)"
                        >
                            Table Layout
                        </b-radio>
                    </b-field>
                    <b-field class="px-3">
                        <b-radio
                            v-model="currentLayout"
                            size="is-medium"
                            native-value="grid"
                            @input="$emit('change-layout', currentLayout)"
                        >
                            Grid Layout
                        </b-radio>
                    </b-field>
                </div>
            </section>
            <footer class="modal-card-foot">
                <b-button
                    label="Cancel"
                    @click="$emit('close')" />
                <b-button
                    label="Save as default"
                    type="is-primary" />
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
    layout: {
      type: String,
    },
  },

  data () {
    return {
      currentLayout: this.layout,
    };
  },
};
</script>
