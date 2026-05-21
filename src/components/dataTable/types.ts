export interface User {
  id: number;
  user_id?: number;
  title: string;
  due_date: string;
  priority: string | number;
  completed: boolean | number;
  created_at?: string;
  updated_at?: string;
}

declare module "@tanstack/vue-table" {
  interface TableMeta<TData> {
    onStatusChange?: (row: TData, value: boolean) => void;
  }
}
