<template>
  <b-modal
    v-model="active"
    :width="640"
    :can-cancel="['x']"
  >
    <div class="modal-card">
      <header class="modal-card-head is-flex is-justify-content-space-between">
        <h6 class="is-size-6 has-text-weight-bold">
          Upload Document
        </h6>
        <button
          type="button"
          class="delete"
          @click="$emit('close')"
        ></button>
      </header>
      <section class="modal-card-body is-flex is-flex-direction-column is-align-items-center">
        <span v-show="fileName" class="tag is-primary my-3">{{ fileName }}</span>
        <b-upload drag-drop>
          <input ref="fileInput" type="file" @change="change">
          <section class="section">
            <div class="content has-text-centered py-5">
              <p>
                <b-icon
                  icon="upload"
                  size="is-large"
                ></b-icon>
              </p>
              <p>Drop your files here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </section>
      <footer class="modal-card-foot">
        <b-button
          label="Close"
          @click="$emit('close')"
        />
        <b-button
          native-type="submit"
          label="Save"
          type="is-primary"
          @click="upload()"
        />
      </footer>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    active: {
      type: Boolean,
    },
  },

  data () {
    return {
      file: null,
      fileName: '',
    };
  },

  methods: {
    ...mapActions({
      uploadDocument: 'employee/uploadDocument',
    }),
    change (evt) {
      const file = evt.target.files;
      const [ firstFile ] = file;
      this.file = firstFile;
      this.fileName = firstFile.name;
    },
    upload () {
      this.uploadDocument({ file: this.file, id: this.$route.params.id })
        .then(() => this.$emit('close'));
    },
  },
};
</script>
