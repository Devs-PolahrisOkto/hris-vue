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
        <div class="is-flex is-justify-content-space-between">
            <div></div>
            <div class="is-flex">
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
        MainLayout: () => import("@/components/layouts/MainLayout.vue"),
    },

    data() {
        return {
            file: null,
            importedData: [],
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
            // data: [
            //     {
            //         id: 1,
            //         first_name: "Jesse", 
            //         last_name: "Simmons" ,
            //         middle_name: "Sim",
            //         birthdate: "2016/10/15",
            //         gender: "Male",
            //         civil_status: "Single",
            //         position: "Office Staff",
            //         department: "Accounting Department",
            //         employment_type: "Probationary",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 2,
            //         first_name: "John", 
            //         last_name: "Jacobs",
            //         middle_name: "Jac",
            //         birthdate: "2016/12/15",
            //         gender: "Male",
            //         civil_status: "Married",
            //         position: "Accounting Staff",
            //         department: "Accounting Department",
            //         employment_type: "Probationary",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 3,
            //         first_name: "Tina", 
            //         last_name: "Gilbert",
            //         middle_name: "Gil",
            //         birthdate: "2016/04/26",
            //         gender: "Female",
            //         civil_status: "Married",
            //         position: "Sales Manager",
            //         department: "Sales Department",
            //         employment_type: "Regular",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 4,
            //         first_name: "Clarence", 
            //         last_name: "Flores",
            //         middle_name: "Flo",
            //         birthdate: "2016/04/10",
            //         gender: "Male",
            //         civil_status: "Single",
            //         position: "Accounting Manager",
            //         department: "Accounting Department",
            //         employment_type: "Regular",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 5,
            //         first_name: "Anne", 
            //         last_name: "Lee",
            //         middle_name: "Tan",
            //         birthdate: "2016/12/06",
            //         gender: "Female",
            //         civil_status: "Single",
            //         position: "Accounting Supervisor",
            //         department: "Accounting Department",
            //         employment_type: "Regular",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 6,
            //         first_name: "Sara", 
            //         last_name: "Armstrong",
            //         middle_name: "George",
            //         birthdate: "2016/09/23",
            //         gender: "Female",
            //         civil_status: "Married",
            //         position: "HR Supervisor",
            //         department: "HR Department",
            //         employment_type: "Regular",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 7,
            //         first_name: "Anthony", 
            //         last_name: "Webb",
            //         middle_name: "Smith",
            //         birthdate: "2016/08/30",
            //         gender: "Male",
            //         civil_status: "Single",
            //         position: "Customer Service Agent",
            //         department: "Sales Department",
            //         employment_type: "Probationary",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 8,
            //         first_name: "Andrew", 
            //         last_name: "Greene",
            //         middle_name: "Jordan",
            //         birthdate: "2016/11/20",
            //         gender: "Male",
            //         civil_status: "Single",
            //         position: "Office Staff",
            //         department: "Accounting Department",
            //         employment_type: "Regular",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 9,
            //         first_name: "Russell", 
            //         last_name: "White",
            //         middle_name: "Cole",
            //         birthdate: "2016/07/13",
            //         gender: "Male",
            //         civil_status: "Married",
            //         position: "Office Staff",
            //         department: "Sales Department",
            //         employment_type: "Regular",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 10,
            //         first_name: "Lori", 
            //         last_name: "Hunter",
            //         middle_name: "Lamar",
            //         birthdate: "2016/12/09",
            //         gender: "Female",
            //         civil_status: "Single",
            //         position: "IT Staff",
            //         department: "IT Department",
            //         employment_type: "Probationary",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 11,
            //         first_name: "Sara", 
            //         last_name: "Armstrong",
            //         middle_name: "George",
            //         birthdate: "2016/09/23",
            //         gender: "Female",
            //         civil_status: "Married",
            //         position: "HR Supervisor",
            //         department: "HR Department",
            //         employment_type: "Regular",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 12,
            //         first_name: "Anthony", 
            //         last_name: "Webb",
            //         middle_name: "Smith",
            //         birthdate: "2016/08/30",
            //         gender: "Male",
            //         civil_status: "Single",
            //         position: "Customer Service Agent",
            //         department: "Sales Department",
            //         employment_type: "Probationary",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 13,
            //         first_name: "Andrew", 
            //         last_name: "Greene",
            //         middle_name: "Jordan",
            //         birthdate: "2016/11/20",
            //         gender: "Male",
            //         civil_status: "Single",
            //         position: "Office Staff",
            //         department: "Accounting Department",
            //         employment_type: "Regular",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 14,
            //         first_name: "Russell", 
            //         last_name: "White",
            //         middle_name: "Cole",
            //         birthdate: "2016/07/13",
            //         gender: "Male",
            //         civil_status: "Married",
            //         position: "Office Staff",
            //         department: "Sales Department",
            //         employment_type: "Regular",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            //     {
            //         id: 15,
            //         first_name: "Lori", 
            //         last_name: "Hunter",
            //         middle_name: "Lamar",
            //         birthdate: "2016/12/09",
            //         gender: "Female",
            //         civil_status: "Single",
            //         position: "IT Staff",
            //         department: "IT Department",
            //         employment_type: "Probationary",
            //         sss: "111-1111111111",
            //         philhealth: "12-23322342",
            //         hdmf: "23432-234234234-23",
            //         tin: "0000-234234234",
            //     },
            // ],
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
                console.log(worksheet_data)
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
    }
}
</script>

<style lang="scss" scoped>
/deep/ .b-table .table-wrapper.has-sticky-header {
    height: 70vh;
}
</style>