<template>
  <v-container>
    <div class="text-h4 mb-4">Patients list</div>
    <DataTable
      :settTrClasses="settTrClasses"
      :deleteIcon="setDeleteIcon"
      :columns="patientsColumns"
      paginate
      serverSide
      sortBy="last_name"
      endpoint="patients"
      @create="createPatient"
      @edit="editPatient"
      @destroy="destroyPatient"
      ref="patientsTable"
    ></DataTable>
  </v-container>
  <patient-dialog
    @close="openedPatientForm = false"
    v-model="openedPatientForm"
    @created="createdPatient"
    @updated="updatedPatient"
    ref="patientForm"
  ></patient-dialog>
  <YesNoDialog ref="yesNoDialog" @yes="yesDestroy" :text="yesNoText"></YesNoDialog>
  <v-snackbar v-model="showSnackbar" multi-line>
    {{ snackbarMessage }}
    <template v-slot:actions>
      <v-btn :color="snackbarColor" variant="text" @click="showSnackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import DataTable from "@/components/controls/DataTable.vue";
import PatientDialog from "@/components/patients/PatientDialog.vue";
import YesNoDialog from "@/components/controls/YesNoDialog.vue";
import { ref } from "vue";
import patientsService from "@/services/general/patients";

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
    title: "Date of Birth",
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
  patientForm.value.cleanForm();
  openedPatientForm.value = true;
};

const createdPatient = () => {
  patientsTable.value.searchData();
};

const patientForm = ref(null);

const editPatient = (patient) => {
  patientForm.value.editForm(patient.id);
  openedPatientForm.value = true;
};

const yesNoText = ref("");

const yesNoDialog = ref(null);

const currentPatient = ref(null);

const destroyPatient = (patient) => {
  yesNoText.value = patient.deleted_at
    ? "Are you sure to restore this patient?"
    : "Are you sure to delete this patient?";
  currentPatient.value = patient;
  yesNoDialog.value.show();
};
const yesDestroy = async () => {
  await patientsService.destroy(currentPatient.value.id);
  snackbarMessage.value = currentPatient.value.deleted_at
    ? "The patient was restored!"
    : "The patient was deleted";
  snackbarColor.value = currentPatient.value.deleted_at ? "red" : "green";
  showSnackbar.value = true;
  currentPatient.value = null;
  yesNoDialog.value.hide();
  patientsTable.value.searchData();
};

const updatedPatient = () => {
  patientsTable.value.searchData();
};

const showSnackbar = ref(false);
const snackbarColor = ref("red");
const snackbarMessage = ref("");

const settTrClasses = (patient) => {
  if (patient.deleted_at) return ["bg-error"];
  else return null;
};

const setDeleteIcon = (patient) => {
  return patient.deleted_at ? "mdi-refresh" : "mdi-trash-can";
};
</script>
