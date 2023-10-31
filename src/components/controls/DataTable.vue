<template>
  <v-container>
    <v-row>
      <v-col v-if="searchable" cols="12" md="8">
        <v-text-field v-model="search" label="Search"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn-toggle divided variant="outlined">
          <v-btn v-if="searchable" icon="mdi-magnify"></v-btn>
          <v-btn v-if="withCreateButton" icon="mdi-plus"></v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <template v-for="column in columns" :key="column.value">
                <th v-if="!column.hidden">
                  {{ column.title }}
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows" :key="index">
              <template v-for="column in columns" :key="column.value">
                <td v-if="!column.hidden">
                  {{ row[column.value] }}
                </td>
              </template>
            </tr>
          </tbody>
          <tfoot>
            <tr v-show="rows.length === 0">
              <th
                :colspan="columns.filter((column) => !column.hidden).length"
                scope="row"
              >
                No data found.
              </th>
            </tr>
          </tfoot>
        </v-table>
        <div class="d-flex flex-wrap mt-2">

          <v-pagination :length="totalPages"></v-pagination>
          <p class="mt-4"><strong>Total pages:</strong> {{ totalPages }}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const search = ref("");

const props = defineProps({
  searchable: {
    type: Boolean,
    required: false,
    default: true,
  },
  withCreateButton: {
    type: Boolean,
    required: false,
    default: true,
  },
  columns: {
    type: Array,
    required: false,
    default: function () {
      return [];
    },
  },
  data: {
    type: Array,
    required: false,
    default: function () {
      return [];
    },
  },
});

const rows = ref(props.data);

const totalPages = ref(1);

const currentPage = ref(1);
</script>
