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

    const { data, status } = await api.get(
      `${resource}?${queryParams.toString()}`,
    );
    return {
      data: data?.rows || [],
      total: data?.total || 0,
    };
  },
  create: async ({ resource, variables, meta = {} }) => {
    throw new Error("Create method is not implemented");
  },
  update: async ({ resource, id, variables, meta = {} }) => {
    throw new Error("Update method is not implemented");
  },
  deleteOne: async ({ resource, id, meta = {} }) => {
    throw new Error("Delete method is not implemented");
  },
  getApiUrl: () => {
    return import.meta.env.VITE_API_URL || "http://localhost:7000/api/v1";
  },
});

export const dataProvider = createDataProvider();
