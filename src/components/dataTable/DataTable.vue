<script setup lang="ts">
import {
  type ColumnFiltersState,
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  functionalUpdate,
  useVueTable,
} from "@tanstack/vue-table";
import { computed, ref } from "vue";

const props = defineProps<{
  columns: any[];
  data: any[];
  filterColumnId?: string;
  filterPlaceholder?: string;
}>();

const columnFilters = ref<ColumnFiltersState>([]);

const table = useVueTable({
  get data() {
    return props.data;
  },

  get columns() {
    return props.columns;
  },

  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get columnFilters() {
      return columnFilters.value;
    },
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value = functionalUpdate(updaterOrValue, columnFilters.value);
  },
});
</script>

<template>
<div class="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden p-4">
    <table class="w-full">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th v-for="header in headerGroup.headers" :key="header.id" class="border-b p-3 text-left border-gray-200">
            <FlexRender :render="header.column.columnDef.header
              " :props="header.getContext()" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-3 border-b border-gray-200">
            <FlexRender :render="cell.column.columnDef.cell ?? cell.getValue()
              " :props="cell.getContext()" />
          </td>
        </tr>
        <tr v-if="!table.getRowModel().rows.length">
          <td :colspan="table.getAllColumns().length" class="p-6 text-center text-sm text-gray-500">
            No results.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
