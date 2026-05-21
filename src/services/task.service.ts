import { api } from "./api";

export interface CreateTaskPayload {
  task: string;
  due_date: string;
  priority: string;
  status: string;
}

export const taskService = {
  async create(payload: CreateTaskPayload) {
    console.log("payload", payload);
    const response = await api.post("/tasks", payload);
    return response.data;
  },
};
