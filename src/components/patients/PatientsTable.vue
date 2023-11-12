<template>
  <v-container>
    <DataTable
      :columns="patientsColumns"
      paginate
      serverSide
      sortBy="last_name"
      endpoint="patients"
      @create="createPatient"
      ref="patientsTable"
    ></DataTable>
  </v-container>
  <patient-form
    @close="openedPatientForm = false"
    v-model="openedPatientForm"
    @created="createdPatient"
  ></patient-form>
</template>

<script setup>
import DataTable from "@/components/controls/DataTable.vue";
import PatientForm from "@/components/patients/PatientForm.vue";
import { ref } from "vue";

const patientsColumns = ref([
  {
    title: "Identification",
    value: "identification",
    searchable: true,
  },
  {
    title: "First Name",
    value: "first_name",
    searchable: true,
  },
  {
    title: "Last Name",
    value: "last_name",
    searchable: true,
  },
  {
    title: "Birth Day",
    value: "birth_day",
    searchable: true,
  },
  {
    title: "Address",
    value: "address",
    searchable: true,
  },
]);

const patientsTable = ref(null);

const openedPatientForm = ref(false);

const createPatient = () => {
  openedPatientForm.value = true;
};

const createdPatient = () => {
  patientsTable.value.searchData();
  openedPatientForm.value = false;
};
</script>
