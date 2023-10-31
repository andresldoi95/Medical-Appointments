<template>
   <DataTable
    :columns="patientsColumns"
    paginate
    :data="patientsData"
   ></DataTable>
</template>

<script setup>
  import DataTable from '@/components/controls/DataTable.vue';
  import patientsData from '@/services/general/patients';
import { ref } from 'vue';

  const patientsColumns = ref([
    {
      title: 'Identification',
      value: 'identification',
      searchable: true
    },
    {
      title: 'First Name',
      value: 'first_name',
      searchable: true
    },
    {
      title: 'Last Name',
      value: 'last_name',
      searchable: true
    },
    {
      title: 'Birth Day',
      value: 'birth_day',
      searchable: true
    },
    {
      title: 'Address',
      value: 'address',
      searchable: true
    }
  ]);
</script>
