<template>
   <DataTable
    :columns="patientsColumns"
   ></DataTable>
</template>

<script setup>
  import DataTable from '@/components/controls/DataTable.vue';
import { ref } from 'vue';

  const patientsColumns = ref([
    {
      title: 'Identification',
      value: 'identification'
    },
    {
      title: 'First Name',
      value: 'first_name'
    },
    {
      title: 'Last Name',
      value: 'last_name'
    },
    {
      title: 'Birth Day',
      value: 'birth_day'
    },
    {
      title: 'Address',
      value: 'address'
    }
  ]);
</script>
