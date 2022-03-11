<template>
  <main-layout>
    <!-- Start Breadcrumb -->
    <nav class="breadcrumb px-5" aria-label="breadcrumbs">
      <ul class="px-3 pt-3">
        <li><a href="#">Admin</a></li>
        <li><a href="#">Employees</a></li>
        <li class="is-active"><a href="#" aria-current="page">Import Employees</a></li>
      </ul>
    </nav>
    <!-- End Breadcrumb -->

    <!-- Import Employees -->
    <div class="container is-fluid my-5">
      <div class="card p-2">
        <div
          class="is-flex is-justify-content-flex-end
          is-align-items-center is-flex-wrap-wrap"
        >
          <div class="is-flex is-flex-wrap-wrap">
            <b-field class="file mr-1">
              <span v-if="fileName" class="is-size-6 px-3 py-2">{{ fileName }}</span>
              <b-upload>
                <a class="button">
                  <b-icon icon="file-import" size="is-small"></b-icon>
                  <span class="is-size-6 has-text-weight-light">Import Excel File</span>
                </a>
                <input ref="fileInput" type="file" @change="change">
              </b-upload>
            </b-field>
            <b-tooltip label="Upload">
              <b-button
                icon-right="cloud-upload"
                class="mr-1"
                :disabled="!file"
                @click="uploadFile()"
              />
            </b-tooltip>
            <b-tooltip label="Template">
              <b-button
                icon-right="file-download"
                @click="downloadTemplate()"
              />
            </b-tooltip>
          </div>
        </div>
        <!-- Errors -->
        <upload-error-messages
          v-if="hasErrors"
          :errors="errors"
        ></upload-error-messages>
        <!-- Errors -->
        <!-- Imported Data Table -->
        <template v-if="importedData.length">
          <b-table
            :data="importedData"
            :columns="columns"
            :sticky-header="stickyHeaders"
            striped
            narrowed
            hoverable
          >
            <template #empty>
              <no-record></no-record>
            </template>
          </b-table>
        </template>
        <!-- Imported Data Table -->
        <!-- Empty State -->
        <template v-else>
          <no-record></no-record>
        </template>
        <!-- Empty State -->
      </div>
    </div>
    <!-- Import Employees -->
  </main-layout>
</template>

<script>
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    MainLayout: () => import('@/layouts/MainLayout.vue'),
    NoRecord: () => import('@/components/Placeholder/NoRecord.vue'),
    UploadErrorMessages: () => import('@/components/Notification/UploadErrorMessages.vue'),
  },

  data () {
    return {
      file: null,
      fileName: '',
      importedData: [],
      columns: [
        {
          field: 'company number',
          label: 'Company No.',
        },
        {
          field: 'username',
          label: 'Username',
        },
        {
          field: 'email',
          label: 'Email',
        },
        {
          field: 'firstname',
          label: 'First Name',
        },
        {
          field: 'middlename',
          label: 'Middle Name',
        },
        {
          field: 'lastname',
          label: 'Last Name',
        },
        {
          field: 'nickname',
          label: 'Nickname',
        },
        {
          field: 'title',
          label: 'Title',
        },
        {
          field: 'extension',
          label: 'Extension',
        },
        {
          field: 'birth date',
          label: 'Birthdate',
        },
        {
          field: 'gender',
          label: 'Gender',
          centered: true,
        },
        {
          field: 'civil status',
          label: 'Civil Status',
        },
        {
          field: 'employment',
          label: 'Employment Type',
        },
        {
          field: 'company',
          label: 'Company',
        },
        {
          field: 'branch',
          label: 'Branch',
        },
        {
          field: 'department',
          label: 'Department',
        },
      ],
      stickyHeaders: true,
    };
  },

  computed: {
    ...mapGetters({
      errors: 'employee/import/errors',
      hasErrors: 'employee/import/hasErrors',
    }),
  },

  methods: {
    ...mapActions({
      upload: 'employee/upload',
    }),
    change (evt) {
      const file = evt.target.files;
      const [ firstFile ] = file;
      this.file = firstFile;
      this.fileName = firstFile.name;
      const reader = new FileReader();
      reader.onload = file => {
        const fileTargetResult = file.target.result;
        const workbook = XLSX.read(fileTargetResult, { type: 'binary' });
        const worksheetSheet1 = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetSheet1];
        const worksheetData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        this.importedData = worksheetData;
        this.$refs.fileInput.value = '';
      };
      reader.readAsBinaryString(firstFile);
    },
    downloadTemplate () {
      const excelFormat = 'xlsx';
      const workbook = XLSX.utils.book_new();
      workbook.Props = {
        Title: 'Employees Template',
        Subject: 'Polahris',
        Author: 'wickeddd3',
        CreatedDate: new Date(),
      };
      workbook.SheetNames.push('Employee Details');
      const templateHeader = [
        [
          'company number',
          'username',
          'email',
          'firstname',
          'middlename',
          'lastname',
          'nickname',
          'title',
          'extension',
          'birth date',
          'gender',
          'civil status',
          'employment',
          'company',
          'branch',
          'department',
        ],
      ];
      const Sheet1 = XLSX.utils.aoa_to_sheet(templateHeader);
      workbook.Sheets['Employee Details'] = Sheet1;
      const wbout = XLSX.write(workbook, { bookType: excelFormat, type: 'binary' });
      function s2ab (s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
          view[i] = s.charCodeAt(i);
        }
        return buf;
      }
      saveAs(new Blob([ s2ab(wbout) ], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }), `Employees Template.${excelFormat}`);
    },
    uploadFile () {
      this.upload(this.file).then(() => {
        this.$buefy.snackbar.open({
          message: 'Employees Data has been successfully uploaded.',
          position: 'is-top',
          queue: true,
        });
        this.$router.push({ path: '/employees' });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .b-table .table-wrapper.has-sticky-header {
    height: 70vh;
}
</style>
