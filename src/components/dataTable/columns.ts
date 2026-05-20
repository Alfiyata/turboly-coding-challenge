import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";

import type { User } from "./types";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "task",
    header: "Task",
  },

  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "is_finished",
    header: "Status",
    cell: ({ row, table }) =>
      h("label", { class: "inline-flex items-center gap-2 text-sm text-gray-700" }, [
        h("input", {
          type: "checkbox",
          checked: row.original.is_finished,
          class:
            "h-4 w-4 rounded border-gray-300 accent-[#10b8e1] focus:ring-2 focus:ring-gray-500 focus:outline-none",
          "aria-label": row.original.is_finished ? "Done" : "Mark as done",
          onChange: (event: Event) => {
            const target = event.target as HTMLInputElement;
            table.options.meta?.onStatusChange?.(row.original, target.checked);
          },
        }),
        row.original.is_finished ? "Done" : "Mark as done",
      ]),
  },
];
