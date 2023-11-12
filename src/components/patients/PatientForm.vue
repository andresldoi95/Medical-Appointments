<template>
  <v-row justify="center">
    <v-dialog :model-value="modelValue" persistent width="1024">
      <v-form @submit.prevent="submitPatient">
        <v-card>
          <v-card-title>
            <span class="text-h5">Patient</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="patientForm.first_name"
                    label="First name*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="patientForm.last_name"
                    label="Last name*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="patientForm.identification"
                    label="Identification*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="patientForm.birth_day"
                    label="Date of birth*"
                    type="date"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="patientForm.city"
                    label="City*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="patientForm.address"
                    label="Address*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="patientForm.email"
                    label="Email"
                    type="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="patientForm.phone" label="Phone"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="emit('close')">
              Close
            </v-btn>
            <v-btn type="submit" color="blue-darken-1" variant="text"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-snackbar v-model="showSnackbar" multi-line>
      {{ snackbarMessage }}

      <template v-slot:actions>
        <v-btn :color="snackbarColor" variant="text" @click="showSnackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script setup>
import patientsService from "@/services/general/patients";
import { useTeamStore } from "@/store/team";
import { ref } from "vue";

const emit = defineEmits(["close", "created"]);

defineProps({
  modelValue: Boolean,
});

const teamStore = useTeamStore();

const patientForm = ref({
  first_name: "",
  last_name: "",
  identification: "",
  birth_day: "",
  city: "",
  address: "",
  email: "",
  phone: "",
  team_id: teamStore.currentTeamId,
});

const snackbarColor = ref("green");

const snackbarMessage = ref("");

const showSnackbar = ref(false);

const setSnackbar = (color, message, open) => {
  snackbarColor.value = color;
  snackbarMessage.value = message;
  showSnackbar.value = open;
};

const submitPatient = () => {
  patientsService
    .create(patientForm.value)
    .then(({ data }) => {
      setSnackbar(
        "green",
        "The patient " +
          data.first_name +
          " " +
          data.last_name +
          " was created successfully!",
        true
      );
      emit("created");
    })
    .catch(({ response }) => {
      if (response.status === 422) {
        setSnackbar("red", "There are errors in form!", true);
      } else {
        setSnackbar("red", "There was an error, try again!", true);
      }
    });
};
</script>
