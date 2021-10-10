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
        <div class="is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap">
            <div class="pb-2">
                <b-button 
                    icon-right="delete-forever" 
                    type="is-danger"
                    :disabled="selectedData.length === 0"
                    @click="removeSelectedData"
                    class="mr-1" />
            </div>
            <div class="is-flex is-flex-wrap-wrap">
                <b-field class="file mr-3">
                    <span class="is-size-6 px-3 py-2" v-if="file">{{ file }}</span> 
                    <b-upload>
                        <a class="button">
                            <b-icon icon="file-import" size="is-small"></b-icon>
                            <span class="is-size-6 has-text-weight-light">Import Excel File</span>
                        </a>
                        <input type="file" ref="fileInput" @change="change">
                    </b-upload> 
                </b-field>
                <b-tooltip label="Upload">
                    <b-button 
                        icon-right="cloud-upload" 
                        class="mr-1" />
                </b-tooltip>
                <b-tooltip label="Template">
                    <b-button 
                        icon-right="file-download" 
                        @click="downloadTemplate()" />
                </b-tooltip>
            </div>
        </div>

        <b-table
            :data="importedData"
            :columns="columns"
            :sticky-header="stickyHeaders"
            :checked-rows.sync="selectedData"
            checkable
            sticky-checkbox
            striped
            narrowed
            hoverable
        >
            <template #empty>
                <div class="has-text-centered p-4">No Data</div>
            </template>
        </b-table>
    </div>
    <!-- Import Employees -->

</main-layout>
</template>

<script>
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default {
    components: {
        MainLayout: () => import("@/layouts/MainLayout.vue"),
    },

    data() {
        return {
            file: null,
            importedData: [],
            selectedData: [],
            columns: [
                {
                    field: "FirstName",
                    label: "First Name",
                },
                {
                    field: "LastName",
                    label: "Last Name",
                },
                {
                    field: "MiddleName",
                    label: "Middle Name"
                },
                {
                    field: "Position",
                    label: "Position",
                },
                {
                    field: "Department",
                    label: "Department"
                },
                {
                    field: "EmploymentType",
                    label: "Employment Type"
                },
                {
                    field: "Birthdate",
                    label: "Birthdate",
                    centered: true,
                },
                {
                    field: "Gender",
                    label: "Gender"
                },
                {
                    field: "CivilStatus",
                    label: "Civil Status"
                },
                {
                    field: "SSS",
                    label: "SSS",
                    width: "170px",
                },
                {
                    field: "Philhealth",
                    label: "PhilHealth",
                    width: "170px",
                },
                {
                    field: "HDMF",
                    label: "HDMF",
                    width: "170px",
                },
                {
                    field: "TIN",
                    label: "TIN",
                    width: "170px",
                },
            ],
            stickyHeaders: true,
        }
    },

    methods: {
        change(evt) {
            var file = evt.target.files;
                file = file[0];
            this.file = file.name;
            var reader = new FileReader();
            reader.onload = (file) => {
                var file_target_result = file.target.result;
                var workbook = XLSX.read(file_target_result, {type: 'binary' });
                var worksheet_sheet1 = workbook.SheetNames[0];
                var worksheet = workbook.Sheets[worksheet_sheet1];
                var worksheet_data = XLSX.utils.sheet_to_json(worksheet, {raw: false})
                this.importedData = worksheet_data;
                this.$refs.fileInput.value = "";
            };
            reader.readAsBinaryString(file)
        },
        downloadTemplate() {
            var excel_format = "xlsx"
            var workbook = XLSX.utils.book_new();
            workbook.Props = {
                Title: "Employees Template",
                Subject: "Polahris",
                Author: "wickeddd3",
                CreatedDate: new Date()
            };
            workbook.SheetNames.push("Employee Details");
            const template_header = [
                [
                    "FirstName",
                    "LastName",
                    "MiddleName",
                    "Position",
                    "Department",
                    "EmploymentType",
                    "Birthdate",
                    "Gender",
                    "CivilStatus",
                    "SSS",
                    "Philhealth",
                    "HDMF",
                    "TIN"
                ]
            ];
            var Sheet1 = XLSX.utils.aoa_to_sheet(template_header);
            workbook.Sheets["Employee Details"] = Sheet1;
            var wbout = XLSX.write(workbook, {bookType: excel_format,  type: 'binary'});
            function s2ab (s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
            saveAs(new Blob([s2ab(wbout)],{
                type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }), `Employees Template.${excel_format}`);
        },
        removeSelectedData() {
            this.selectedData.forEach(item => {
                this.importedData.splice(this.importedData.indexOf(item), 1);
            });
            this.selectedData = [];
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .b-table .table-wrapper.has-sticky-header {
    height: 70vh;
}
</style>