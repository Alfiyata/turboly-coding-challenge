import { api } from "./api";
import type { User } from "@/components/dataTable/types";

export interface CreateTaskPayload {
  title: string;
  due_date: string;
  priority: string;
  status: string;
}

export interface GetTasksParams {
  page: number;
  pageSize: number;
  title?: string;
  priority?: string | number;
  due_date?: string;
}

export interface GetTasksResponse {
  data: User[];
  current_page: number;
  last_page: number;
  per_page: number;
  total_data: number;
}

export interface GetDueDateTasksResponse {
  total_data: number;
  error_message: string | null;
}

export const taskService = {
  async getAll(params: GetTasksParams) {
    const response = await api.get<GetTasksResponse>("/tasks", { params });
    return response.data;
  },

  async getDueDateTasks() {
    const response = await api.get<GetDueDateTasksResponse>("/tasks/due-date");
    return response.data;
  },

  async create(payload: CreateTaskPayload) {
    const response = await api.post("/tasks", payload);
    return response.data;
  },

  async updateCompleted(taskId: number, completed: boolean) {
    const response = await api.patch(`/tasks/${taskId}/completed`, {
      completed,
    });
    return response.data;
  }
};
