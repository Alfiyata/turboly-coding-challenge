import type { ColumnDef } from "@tanstack/vue-table";

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
];