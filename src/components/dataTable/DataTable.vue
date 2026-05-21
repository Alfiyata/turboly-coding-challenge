<script setup lang="ts">
import {
  type ColumnFiltersState,
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  functionalUpdate,
  useVueTable,
} from "@tanstack/vue-table";
import { computed, ref, watch } from "vue";
import { VueDatePicker } from "@vuepic/vue-datepicker";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";

type FilterOption = {
  label: string;
  value: string | number;
};

const props = defineProps<{
  columns: any[];
  data: any[];
  filterColumnId?: string;
  filterPlaceholder?: string;
  filterOptions?: FilterOption[];
}>();

const columnFilters = ref<ColumnFiltersState>([]);
const selectedDueDate = ref<Date | null>(null);

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

const filterValue = computed<string | number>({
  get() {
    if (!props.filterColumnId) {
      return "";
    }

    return (table.getColumn(props.filterColumnId)?.getFilterValue() as string | number | undefined) ?? "";
  },
  set(value) {
    if (!props.filterColumnId) {
      return;
    }

    table.getColumn(props.filterColumnId)?.setFilterValue(value === "" ? undefined : value);
  },
});

const nameFilterValue = computed<string | number>({
  get() {
    return (table.getColumn("task")?.getFilterValue() as string | number | undefined) ?? "";
  },
  set(value) {
    table.getColumn("task")?.setFilterValue(value === "" ? undefined : value);
  },
});

function formatDueDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

watch(selectedDueDate, (date) => {
  table.getColumn("dueDate")?.setFilterValue(date ? formatDueDate(date) : undefined);
});
</script>

<template>
  <div class="w-full max-w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <div class="mb-4 flex flex-wrap items-center gap-3">
      <Input v-model="nameFilterValue" placeholder="Search name"
        class="w-full border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none sm:w-44" />
      <div class="w-full sm:w-44">
        <VueDatePicker v-model="selectedDueDate" placeholder="Search date" :enable-time-picker="false" :teleport="true"
          :ui="{ menu: 'z-[999999]' }"
          input-class-name="h-9 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-gray-500 focus:outline-none" />
      </div>
      <div v-if="filterColumnId" class="w-full sm:w-44">
        <Select v-model="filterValue"
          class="border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none">
          <option value="">
            {{ filterPlaceholder ?? "All" }}
          </option>
          <option v-for="option in filterOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </Select>
      </div>
    </div>

    <div class="w-full overflow-x-auto">
      <table class="min-w-760px w-full">
        <thead>
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th v-for="header in headerGroup.headers" :key="header.id" class="border-b p-3 text-left border-gray-200 whitespace-nowrap">
              <FlexRender :render="header.column.columnDef.header
                " :props="header.getContext()" />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in table.getRowModel().rows" :key="row.id">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-3 border-b border-gray-200 whitespace-nowrap">
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
  </div>
</template>
