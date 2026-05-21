import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";

import type { User } from "./types";

function isTaskCompleted(completed: boolean | number) {
  return completed === true || completed === 1;
}

function getPriorityLabel(priority: string | number) {
  if (priority === 1 || priority === "1" || priority === "High") {
    return "High";
  }

  if (priority === 2 || priority === "2" || priority === "Medium") {
    return "Medium";
  }

  return "Low";
}

function getPriorityClass(priority: string | number) {
  if (priority === 1 || priority === "1" || priority === "High") {
    return "bg-red-100 text-red-700 border-red-200";
  }

  if (priority === 2 || priority === "2" || priority === "Medium") {
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }

  return "bg-gray-100 text-gray-700 border-gray-200";
}

export const columns: ColumnDef<User>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },

  {
    accessorKey: "title",
    header: "Task",
  },

  {
    accessorKey: "due_date",
    header: "Due Date",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) =>
      h(
        "span",
        {
          class: [
            "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
            getPriorityClass(row.original.priority),
          ],
        },
        getPriorityLabel(row.original.priority),
      ),
  },
  {
    accessorKey: "completed",
    header: "Status",
    cell: ({ row, table }) =>
      h("label", { class: "inline-flex items-center gap-2 text-sm text-gray-700" }, [
        h("input", {
          type: "checkbox",
          checked: isTaskCompleted(row.original.completed),
          class:
            "h-4 w-4 rounded border-gray-300 accent-[#10b8e1] focus:ring-2 focus:ring-gray-500 focus:outline-none",
          "aria-label": isTaskCompleted(row.original.completed) ? "Done" : "Mark as done",
          onChange: (event: Event) => {
            const target = event.target as HTMLInputElement;
            table.options.meta?.onStatusChange?.(row.original, target.checked);
          },
        }),
        isTaskCompleted(row.original.completed) ? "Done" : "Mark as done",
      ]),
  },
];
