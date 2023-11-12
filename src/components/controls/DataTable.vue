<template>
  <v-row class="d-flex justify-center">
    <v-text-field
      @keyup.enter="searchDataWithSearch"
      v-model="search"
      label="Search"
    ></v-text-field>
    <v-btn
      class="ml-2"
      @click="searchDataWithSearch"
      v-if="searchable"
      icon="mdi-magnify"
    ></v-btn>
    <v-btn
      class="ml-2"
      @click="emit('create')"
      v-if="withCreateButton"
      icon="mdi-plus"
    ></v-btn>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-table>
        <thead>
          <tr>
            <th v-if="withEditButton">Actions</th>
            <template v-for="column in columns" :key="column.value">
              <th v-if="!column.hidden">
                {{ column.title }}
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="settTrClasses(row, index)"
            v-for="(row, index) in paginatedRows(filteredRows)"
            :key="index"
          >
            <td v-if="withEditButton">
              <v-btn
                @click="emit('edit', row)"
                density="default"
                icon="mdi-pencil"
                class="mr-2"
              ></v-btn>
              <v-btn
                @click="emit('destroy', row)"
                density="default"
                :icon="deleteIcon(row, index)"
              ></v-btn>
            </td>
            <template v-for="column in columns" :key="column.value">
              <td v-if="!column.hidden">
                {{ row[column.value] }}
              </td>
            </template>
          </tr>
        </tbody>
        <tfoot>
          <tr v-show="rows.length === 0">
            <th :colspan="columns.filter((column) => !column.hidden).length" scope="row">
              No data found.
            </th>
          </tr>
        </tfoot>
      </v-table>
      <div class="d-flex mt-2 justify-center">
        <p class="mt-4"><strong>Per page:</strong></p>
        <div>
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
        <p class="mt-4"><strong>Pages:</strong> {{ totalPages }}</p>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import axios from "@/http/oauth2-axios";

const emit = defineEmits(["create", "edit", "destroy"]);

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
  withEditButton: {
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
    default: 5,
  },
  endpoint: {
    type: String,
    required: false,
    default: "",
  },
  sortBy: {
    type: String,
    required: false,
    default: "",
  },
  sortOrder: {
    type: String,
    required: false,
    default: "asc",
  },
  settTrClasses: {
    type: Function,
    required: false,
    default: function () {
      return [];
    },
  },
  deleteIcon: {
    type: Function,
    required: false,
    default: function () {
      return "mdi-trash-can";
    },
  },
});

const rows = ref(props.data);

const totalPages = ref(1);

const currentPage = ref(1);

const rowsPerPage = ref(props.defaultRowsPerPage);

const sortBy = ref(props.sortBy);

const sortOrder = ref(props.sortOrder);

const paginatedRows = (rows) => {
  if (props.paginate && !props.serverSide) {
    const pages = rows.length / rowsPerPage.value;
    let intPart = parseInt(pages);
    const difference = pages - intPart;
    if (difference > 0) intPart += 1;
    if (totalPages.value !== intPart) {
      totalPages.value = intPart;
    }
    if (currentPage.value > totalPages.value) {
      currentPage.value = 1;
    }
    let start = (currentPage.value - 1) * rowsPerPage.value;
    let end = start + rowsPerPage.value;
    return rows.slice(start, end);
  } else return filteredRows.value;
};

const filteredRows = computed(() => {
  if (!props.serverSide && props.searchable && search.value !== "") {
    const expresion = new RegExp(`${search.value}.*`, "i");
    const filters = props.columns.filter((column) => column.searchable);
    return rows.value.filter((row) => {
      for (const filter in filters) {
        if (expresion.test(row[filters[filter].value])) return true;
      }
      return false;
    });
  } else {
    return rows.value;
  }
});

const urlOauth2 = import.meta.env.VITE_OAUTH2_API;

const searchData = () => {
  axios
    .get(urlOauth2 + "/" + props.endpoint, {
      params: {
        page: currentPage.value,
        per_page: rowsPerPage.value,
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
        search: search.value,
      },
    })
    .then(({ data }) => {
      rows.value = data.data;
      totalPages.value = data.last_page;
      currentPage.value = data.current_page;
    });
};
if (props.serverSide) {
  searchData();
}

watch(currentPage, () => {
  searchData();
});

watch(rowsPerPage, () => {
  searchData();
});

defineExpose({
  searchData,
});

const searchDataWithSearch = () => {
  if (props.serverSide) {
    if (search.value !== "") {
      if (currentPage.value !== 1) currentPage.value = 1;
      else searchData();
    } else {
      searchData();
    }
  }
};
</script>
