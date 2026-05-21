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
  currentPage?: number;
  lastPage?: number;
  pageSize?: number;
  totalData?: number;
  loading?: boolean;
  titleFilter?: string;
}>();

const emit = defineEmits<{
  (e: "page-change", page: number): void;
  (e: "status-change", row: any, value: boolean): void;
  (e: "title-change", title: string): void;
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
  meta: {
    onStatusChange: (row, value) => {
      emit("status-change", row, value);
    },
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
    return props.titleFilter ?? "";
  },
  set(value) {
    emit("title-change", String(value));
  },
});

function formatDueDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

watch(selectedDueDate, (date) => {
  table.getColumn("due_date")?.setFilterValue(date ? formatDueDate(date) : undefined);
});

const currentPage = computed(() => props.currentPage ?? 1);
const lastPage = computed(() => props.lastPage ?? 1);
const pageSize = computed(() => props.pageSize ?? props.data.length);
const totalData = computed(() => props.totalData ?? props.data.length);
const pageStart = computed(() => (totalData.value === 0 ? 0 : (currentPage.value - 1) * pageSize.value + 1));
const pageEnd = computed(() => Math.min(currentPage.value * pageSize.value, totalData.value));

function goToPage(page: number) {
  if (props.loading || page < 1 || page > lastPage.value || page === currentPage.value) {
    return;
  }

  emit("page-change", page);
}
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
      <table class="w-full min-w-[760px]">
        <thead>
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th v-for="header in headerGroup.headers" :key="header.id" class="border-b p-3 text-left border-gray-200 whitespace-nowrap">
              <FlexRender :render="header.column.columnDef.header
                " :props="header.getContext()" />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td :colspan="table.getAllColumns().length" class="p-6 text-center text-sm text-gray-500">
              Loading tasks...
            </td>
          </tr>
          <template v-else>
            <tr v-for="row in table.getRowModel().rows" :key="row.id">
              <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-3 border-b border-gray-200 whitespace-nowrap">
                <FlexRender :render="cell.column.columnDef.cell ?? cell.getValue()
                  " :props="cell.getContext()" />
              </td>
            </tr>
          </template>
          <tr v-if="!loading && !table.getRowModel().rows.length">
            <td :colspan="table.getAllColumns().length" class="p-6 text-center text-sm text-gray-500">
              No results.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex flex-col gap-3 pt-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
      <p>
        Showing {{ pageStart }}-{{ pageEnd }} of {{ totalData }} tasks
      </p>

      <div class="flex items-center gap-2">
        <button
          type="button"
          :disabled="loading || currentPage <= 1"
          class="cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          @click="goToPage(currentPage - 1)"
        >
          Previous
        </button>
        <span class="min-w-20 text-center">
          Page {{ currentPage }} / {{ lastPage }}
        </span>
        <button
          type="button"
          :disabled="loading || currentPage >= lastPage"
          class="cursor-pointer rounded-md border border-gray-300 px-3 py-1.5 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          @click="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
