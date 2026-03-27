import type { DataProvider } from "@refinedev/core";
import api from "@/lib/api";

export const createDataProvider = (): DataProvider => ({
  getOne: async ({ resource, id, meta = {} }) => {
    const { data } = await api.get(`/${resource}/${id}`, {
      params: meta,
    });

    return {
      data,
    };
  },

  getList: async ({ resource, pagination, filters, meta = {} }) => {
    const queryParams = new URLSearchParams({
      page: pagination?.currentPage,
      size: pagination?.pageSize,
      // name,
      // ...query,
    });

    const { data } = await api.get(`${resource}?${queryParams.toString()}`);
    return {
      data: data?.rows || [],
      total: data?.total || 0,
    };
  },
  create: async ({ resource, variables, meta = {} }) => {
    const { data, status } = await api.post(resource, variables);
    if (status === 201) {
      return {
        data,
      };
    } else {
      throw new Error(data.message || "Failed to create record");
    }
  },
  update: async ({ resource, id, variables, meta = {} }) => {
    const { data, status } = await api.put(`/${resource}/${id}`, variables);
    if (status === 200) {
      return {
        data,
      };
    } else {
      throw new Error(data.message || "Failed to update record");
    }
  },
  deleteOne: async ({ resource, id, meta = {} }) => {
    const { data, status } = await api.delete(`/${resource}/${id}`);
    if (status === 204) {
      return {
        data,
      };
    } else {
      throw new Error(data.message || "Failed to delete record");
    }
  },
  getApiUrl: () => {
    return import.meta.env.VITE_API_URL || "http://localhost:7000/api/v1";
  },
});

export const dataProvider = createDataProvider();
