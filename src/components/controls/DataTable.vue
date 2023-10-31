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
            <tr v-for="(row, index) in paginatedRows(filteredRows)" :key="index">
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
          <p class="mt-4"><strong>Rows per page:</strong></p>
          <div class="w-auto">
            <v-select
              v-model="rowsPerPage"
              :items="rowsPerPageOptions"
              class="mx-4"
            ></v-select>
          </div>
          <v-pagination
            :totalVisible="totalVisible"
            v-model="currentPage"
            :length="totalPages"
          ></v-pagination>
          <p class="mt-4"><strong>Total pages:</strong> {{ totalPages }}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";

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
  rowsPerPageOptions: {
    type: Array,
    required: false,
    default: function () {
      return [5, 10, 25, 50, 100];
    },
  },
  defaultRowsPerPage: {
    type: Number,
    required: false,
    default: 5,
  },
  serverSide: {
    type: Boolean,
    required: false,
    default: false,
  },
  urlServer: {
    type: String,
    required: false,
    default: "",
  },
  paginate: {
    type: Boolean,
    required: false,
    default: false,
  },
  totalVisible: {
    type: Number,
    required: false,
    default: 5
  }
});

const rows = ref(props.data);

const totalPages = ref(1);

const currentPage = ref(1);

const rowsPerPage = ref(props.defaultRowsPerPage);

const paginatedRows = (rows) => {
  if (props.paginate && !props.serverSide) {
    const pages = rows.length / rowsPerPage.value;
    let intPart = parseInt(pages);
    const difference = pages - intPart;
    if (difference > 0)
      intPart += 1;
    if (totalPages.value !== intPart) {
      totalPages.value = intPart;
    }
    if (currentPage.value > totalPages.value) {
      currentPage.value = 1;
    }
    let start = (currentPage.value - 1) * rowsPerPage.value;
    let end = start + rowsPerPage.value;
    return rows.slice(start, end);
  }
  else
    return filteredRows.value;
};

const filteredRows = computed(() => {
  if (props.searchable && search.value !== "") {
    const expresion = new RegExp(`${search.value}.*`, "i");
    const filters = props.columns.filter((column) => column.searchable);
    return rows.value.filter((row) => {
      for (const filter in filters) {
        if (expresion.test(row[filters[filter].value]))
          return true;
      }
      return false;
    });
  }
  else {
    return rows.value;
  }
});
</script>
