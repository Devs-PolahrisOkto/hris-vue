<template>
  <b-modal
    v-model="active"
    :width="800"
    :can-cancel="['x']"
  >
    <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
      <form @submit.prevent="passes(submit)">
        <div class="modal-card">
          <header class="modal-card-head is-flex is-justify-content-space-between">
            <h6 class="is-size-6 has-text-weight-bold">
              Upload New Avatar
            </h6>
            <button
              type="button"
              class="delete"
              @click="$emit('close')"
            ></button>
          </header>
          <section class="modal-card-body py-5">
            <div class="is-flex is-justify-content-center">
              <vue-avatar
                ref="vueavatar"
                :border="0"
                :width="200"
                :height="200"
                :rotation="rotation"
                :borderRadius="borderRadius"
                :scale="scale"
                style="background-color: rgba(108, 117, 125, 0.6);"
                placeholderSvg=""
                @vue-avatar-editor:image-ready="onImageReady"
              ></vue-avatar>
            </div>
            <div class="mt-5 px-4">
              <b-field :label="`Zoom : ${scale}x`">
                <b-slider
                  v-model.number="scale"
                  size="is-small"
                  type="is-primary"
                  :min="1"
                  :max="3"
                  :step="0.02"
                ></b-slider>
              </b-field>
              <b-field :label="`Rotation : ${rotation}`">
                <b-slider
                  v-model.number="rotation"
                  size="is-small"
                  type="is-primary"
                  :min="0"
                  :max="360"
                  :step="1"
                ></b-slider>
              </b-field>
              <b-field :label="`Radius : ${borderRadius}`">
                <b-slider
                  v-model.number="borderRadius"
                  size="is-small"
                  type="is-primary"
                  :min="0"
                  :max="200"
                  :step="1"
                ></b-slider>
              </b-field>
            </div>
          </section>
          <footer class="modal-card-foot is-flex is-justify-content-end">
            <b-button
              label="Cancel"
              @click="$emit('close')"
            />
            <b-button
              :disabled="invalid"
              native-type="submit"
              label="Save"
              type="is-primary"
            />
          </footer>
        </div>
      </form>
    </ValidationObserver>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';
import { VueAvatar } from 'vue-avatar-editor-improved';

export default {
  props: {
    active: {
      type: Boolean,
    },
  },

  components: {
    VueAvatar,
  },

  data () {
    return {
      rotation: 0,
      scale: 1,
      borderRadius: 0,
    };
  },

  methods: {
    ...mapActions({
      uploadNewAvatar: 'employee/uploadNewAvatar',
    }),
    submit () {
      const img = this.$refs.vueavatar.getImageScaled();
      const imgDataUrl = img.toDataURL();
      this.uploadNewAvatar(imgDataUrl).then(this.$emit('close'));
    },
    onImageReady () {
      this.scale = 1;
      this.rotation = 0;
    },
  },
};
</script>
