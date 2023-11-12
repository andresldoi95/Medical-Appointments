<template>
  <v-dialog v-model="isActive" width="500">
    <v-card :title="title">
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Yes" @click="emit('yes')"></v-btn>
        <v-btn text="No" @click="isActive = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["yes"]);

defineProps({
  text: String,
  title: String,
});
const isActive = ref(false);

const show = () => {
  isActive.value = true;
};

const hide = () => {
  isActive.value = false;
};

defineExpose({
  show,
  hide,
});
</script>
