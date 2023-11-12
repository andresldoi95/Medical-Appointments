<template>
  <v-card class="w-100">
    <v-card-title>
      <div class="d-flex justify-center align-center">
        <div>{{ title }}</div>
        <v-select
          label="Type"
          v-model="currentType"
          :items="types"
          class="mx-4"
        ></v-select>
        <v-select
          label="Year"
          v-model="currentYear"
          :items="years"
          class="mx-4"
        ></v-select>
        <v-select
          label="Month"
          v-model="currentMonth"
          :items="monthNames"
          class="mx-4"
        ></v-select>
        <v-btn density="default" icon="mdi-arrow-left" class="mx-4"></v-btn>
        <v-btn density="default" icon="mdi-arrow-right" class="mx-4"></v-btn>
      </div>
    </v-card-title>
    <v-card-text>
      <CalendarMonthView
        :year="currentYear"
        :month="monthNames.indexOf(currentMonth)"
        v-if="selectedType === 0"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed, ref } from "vue";
import CalendarMonthView from "./CalendarMonthView.vue";

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "Calendar",
  },
  minimunYear: {
    type: Number,
    required: false,
    default: 1995,
  },
  maximunYear: {
    type: Number,
    required: false,
    default: new Date().getFullYear(),
  },
});

const monthNames = ref([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const currentMonth = ref(monthNames.value[new Date().getMonth()]);

const types = ref(["Month", "Week", "Day"]);

const currentType = ref(types.value[0]);

const selectedType = computed(() => types.value.indexOf(currentType.value));

const years = ref([]);

for (let i = props.minimunYear; i <= props.maximunYear; i++) {
  years.value.push(i);
}

const currentYear = ref(props.maximunYear);
</script>
