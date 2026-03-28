import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { Search } from "lucide-react";
import { Place } from "@/types";
import { useTranslation } from "react-i18next";
import { DeleteButton, EditButton } from "@/components/refine-ui/buttons";

import { DataTable } from "@/components/refine-ui/data-table/data-table";
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { Input } from "@/components/ui/input";

export const PlaceList = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 700);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<Place>();

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
        header: t("gallery.placeName"),
        enableSorting: true,
        cell: ({ getValue }) => getValue() || "-",
      }),
      columnHelper.display({
        id: "actions",
        header: t("general.actions"),
        cell: ({ row }) => {
          const recordItemId = row.original.id ?? row.original._id;

          return (
            <div className="flex gap-2">
              <EditButton
                resource="places"
                recordItemId={recordItemId}
                size="sm"
              />
              <DeleteButton
                resource="places"
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
      resource: "place",
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
      <ListViewHeader resource="places" title={t("gallery.place")} canCreate />
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search by place name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <DataTable table={table} />
    </ListView>
  );
};
