import { defineStore } from "pinia";
import axios from "axios";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
  }),

  actions: {
    async fetchTasks() {
      try {
        const queryParams = `Paginate=false`;
        const response = await axios.get(
          `${useRuntimeConfig().public.baseURL}/api/tarefas?${queryParams}`
        );

        this.tasks = response.data;
      } catch (err) {
        if (process.env.NODE_ENV === "development")
          console.error("Error fetching tasks:", err);
        return err.response ? err.response.data : null; // Return the error response data
      }
    },

    async addTask(task) {
      try {
        const response = await axios.post(
          `${useRuntimeConfig().public.baseURL}/api/tarefas`,
          task
        );
        await this.fetchTasks();
      } catch (err) {
        if (process.env.NODE_ENV === "development")
          console.error("Error adding task:", err);
        return err.response ? err.response.data.message : null; // Return the error response data
      }
    },

    async updateTask(task) {
      try {
        const response = await axios.put(
          `${useRuntimeConfig().public.baseURL}/api/tarefas/${task.id}`,
          task
        );
        await this.fetchTasks();
      } catch (err) {
        if (process.env.NODE_ENV === "development")
          console.error("Error updating task:", err);
        return err.response ? err.response.data : null; // Return the error response data
      }
    },

    async deleteTask(id) {
      try {
        await axios.delete(
          `${useRuntimeConfig().public.baseURL}/api/tarefas/${id}`
        );
        await this.fetchTasks();
      } catch (err) {
        if (process.env.NODE_ENV === "development")
          console.error("Error deleting task:", err);
        return err.response ? err.response.data : null; // Return the error response data
      }
    },

    setTasks(newTasks) {
      this.tasks = newTasks;
    },
  },
});
