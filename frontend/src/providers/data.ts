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
    const queryParams = new URLSearchParams();
    if (pagination?.currentPage !== undefined) queryParams.set("page", String(pagination.currentPage));
    if (pagination?.pageSize !== undefined) queryParams.set("size", String(pagination.pageSize));
    const nameFilter = filters?.find(
      (filter) => "field" in filter && filter.field === "name" && filter.operator === "contains",
    );
    if (nameFilter && typeof nameFilter.value === "string" && nameFilter.value) {
      queryParams.set("name", nameFilter.value);
    }

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
