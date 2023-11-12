<template>
  <v-row>
    <v-col v-for="date in dates" :key="date.toLocaleDateString()">
      {{ date.toLocaleDateString() }}
    </v-col>
  </v-row>
</template>

<script setup>
// Create a weekview y dayview
import { ref } from "vue";

const props = defineProps({
  month: Number,
  year: Number,
});
const firstDay = ref(new Date(props.year, props.month, 1));
const lastDay = ref(new Date(props.year, props.month + 1, 0));

const dates = ref([]);

for (let date = firstDay.value.getDate(); date <= lastDay.value.getDate(); date++) {
  dates.value.push(new Date(props.year, props.month, date));
}
</script>
