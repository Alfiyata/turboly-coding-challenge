export interface User {
  id: number;
  task: string;
  dueDate: string;
  priority: string;
  is_finished: boolean;
}

declare module "@tanstack/vue-table" {
  interface TableMeta<TData> {
    onStatusChange?: (row: TData, value: boolean) => void;
  }
}
