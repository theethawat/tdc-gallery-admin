import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { Search } from "lucide-react";
import { Category } from "@/types";

import {
  DeleteButton,
  EditButton,
  ShowButton,
  CreateButton,
} from "@/components/refine-ui/buttons";

import { DataTable } from "@/components/refine-ui/data-table/data-table";
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { Input } from "@/components/ui/input";

export const CategoryList = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 700);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Category>();

    return [
      columnHelper.display({
        id: "index",
        header: "No.",
        enableSorting: false,
        cell: ({ row }) => row.index + 1,
        size: 90,
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: "Category Name",
        enableSorting: true,
        cell: ({ getValue }) => getValue() || "-",
      }),
      columnHelper.accessor("place.name", {
        id: "place",
        header: "Place Name",
        enableSorting: false,
        cell: ({ row }) => row.original.place?.name || "-",
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const recordItemId = row.original.id ?? row.original._id;

          return (
            <div className="flex gap-2">
              <EditButton
                resource="category"
                recordItemId={recordItemId}
                size="sm"
              />
              <ShowButton
                resource="category"
                recordItemId={recordItemId}
                size="sm"
              />
              <DeleteButton
                resource="category"
                recordItemId={recordItemId}
                size="sm"
              />
            </div>
          );
        },
        enableSorting: false,
        size: 290,
      }),
    ];
  }, []);

  const table = useTable({
    columns,
    refineCoreProps: {
      resource: "category",
      syncWithLocation: true,
      filters: {
        permanent: debouncedSearch
          ? [
              {
                field: "name",
                operator: "contains",
                value: debouncedSearch,
              },
            ]
          : [],
      },
    },
  });

  return (
    <ListView>
      <ListViewHeader
        resource="categories"
        title="Categories / หมวดหมู่"
        canCreate
      />
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search by category name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <DataTable table={table} />
    </ListView>
  );
};
