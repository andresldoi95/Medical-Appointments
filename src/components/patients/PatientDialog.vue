<template>
  <v-row justify="center">
    <v-dialog :model-value="modelValue" persistent width="1024">
      <v-form ref="form" @submit.prevent="submitPatient">
        <v-card>
          <v-card-title>
            <span class="text-h5"
              >{{ currentId === null ? "Create" : "Edit" }} Patient</span
            >
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="patientForm.first_name"
                    label="First name*"
                    required
                    :rules="defineRules('first_name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="patientForm.last_name"
                    label="Last name*"
                    required
                    :rules="defineRules('last_name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="patientForm.identification"
                    label="Identification*"
                    required
                    :rules="defineRules('identification')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="patientForm.birth_day"
                    label="Date of birth*"
                    type="date"
                    required
                    :rules="defineRules('birth_day')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="patientForm.city"
                    label="City*"
                    required
                    :rules="defineRules('city')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="patientForm.address"
                    label="Address*"
                    required
                    :rules="defineRules('address')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="patientForm.email"
                    label="Email"
                    type="email"
                    :rules="defineRules('email')"
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
import { ref } from "vue";

const emit = defineEmits(["close", "created"]);

defineProps({
  modelValue: Boolean,
  patientId: {
    type: Number || Object,
    default: null,
  },
});

const currentId = ref(null);

const patientForm = ref({
  first_name: "",
  last_name: "",
  identification: "",
  birth_day: "",
  city: "",
  address: "",
  email: "",
  phone: "",
});

const validations = ref({
  first_name: undefined,
  last_name: undefined,
  identification: undefined,
  birth_day: undefined,
  city: undefined,
  address: undefined,
  email: undefined,
  phone: undefined,
});

const cleanForm = () => {
  patientForm.value.first_name = "";
  patientForm.value.last_name = "";
  patientForm.value.identification = "";
  patientForm.value.birth_day = "";
  patientForm.value.city = "";
  patientForm.value.address = "";
  patientForm.value.email = "";
  patientForm.value.phone = "";
  currentId.value = null;
};

const editForm = async (id) => {
  currentId.value = id;
  let { data } = await patientsService.show(id);
  patientForm.value.first_name = data.first_name;
  patientForm.value.last_name = data.last_name;
  patientForm.value.identification = data.identification;
  patientForm.value.birth_day = data.birth_day;
  patientForm.value.city = data.city;
  patientForm.value.address = data.address;
  patientForm.value.email = data.email;
  patientForm.value.phone = data.phone;
};

const snackbarColor = ref("green");

const snackbarMessage = ref("");

const showSnackbar = ref(false);

const setSnackbar = (color, message, open) => {
  snackbarColor.value = color;
  snackbarMessage.value = message;
  showSnackbar.value = open;
};

const submitPatient = () => {
  validations.value.first_name = undefined;
  validations.value.last_name = undefined;
  validations.value.identification = undefined;
  validations.value.birth_day = undefined;
  validations.value.city = undefined;
  validations.value.address = undefined;
  validations.value.email = undefined;
  validations.value.phone = undefined;
  let promise;
  if (currentId.value === null)
    promise = patientsService.create(patientForm.value).then(({ data }) => {
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
      currentId.value = data.id;
    });
  else
    promise = patientsService
      .update(currentId.value, patientForm.value)
      .then(({ data }) => {
        setSnackbar(
          "green",
          "The patient " +
            data.first_name +
            " " +
            data.last_name +
            " was updated successfully!",
          true
        );
        emit("updated");
      });
  promise.catch(({ response }) => {
    if (response.status === 422) {
      validations.value.first_name = response.data.errors.first_name || undefined;
      validations.value.last_name = response.data.errors.last_name || undefined;
      validations.value.identification = response.data.errors.identification || undefined;
      validations.value.birth_day = response.data.errors.birth_day || undefined;
      validations.value.city = response.data.errors.city || undefined;
      validations.value.address = response.data.errors.address || undefined;
      validations.value.email = response.data.errors.email || undefined;
      validations.value.phone = response.data.errors.phone || undefined;
      form.value.validate();
      setSnackbar("red", "There are errors in form!", true);
    } else {
      setSnackbar("red", "There was an error, try again!", true);
    }
  });
};
defineExpose({
  editForm,
  cleanForm,
});

const form = ref(null);

const defineRules = (key) => {
  return [
    () => {
      return validations.value[key] ? validations.value[key][0] : true;
    },
  ];
};
</script>
