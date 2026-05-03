import React from "react";
import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { People, PeopleStatusInfo } from "@/types";
import {
  DeleteButton,
  EditButton,
  ShowButton,
} from "@/components/refine-ui/buttons";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCountryData, TCountryCode } from "countries-list";
import * as FLAGS from "country-flag-icons/react/3x2";

export const PeopleList = () => {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 700);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const columns = React.useMemo(() => {
    const columnHelper = createColumnHelper<People>();

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
        header: t("people.name"),
        enableSorting: true,
        cell: ({ getValue, row }) => (
          <span className="flex items-center gap-2">
            <Avatar>
              {row.original?.image?.url ? (
                <AvatarImage src={row.original?.image?.url} />
              ) : (
                <AvatarFallback>
                  {row.original.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            {getValue() || "-"}
          </span>
        ),
        size: 220,
      }),
      columnHelper.accessor("calledName", {
        id: "calledName",
        header: t("people.calledName") || "-",
        enableSorting: false,
        cell: ({ getValue }) => getValue() || "-",
      }),
      columnHelper.accessor("status", {
        id: "status",
        header: t("people.status"),
        enableSorting: false,
        cell: ({ getValue }) => {
          const peopleStatus = getValue();
          const statusInfo =
            PeopleStatusInfo[peopleStatus as keyof typeof PeopleStatusInfo];
          return (
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                statusInfo?.color || "bg-gray-200 text-gray-800"
              }`}
            >
              {statusInfo.translation[
                i18n.language as keyof typeof statusInfo.translation
              ] || peopleStatus}
            </span>
          );
        },
      }),
      columnHelper.accessor("nationality", {
        id: "nationality",
        header: t("people.nationality"),
        enableSorting: true,
        cell: ({ getValue }) => {
          const returnData = getValue();
          if (!returnData) return "-";
          const countryData = getCountryData(returnData as TCountryCode);
          const Flag = FLAGS[returnData as keyof typeof FLAGS];
          return (
            <div className="flex items-center gap-2">
              {Flag && <Flag className="h-4 w-6" />}
              {countryData.name}
            </div>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: t("general.actions"),
        cell: ({ row }) => {
          const recordItemId = row.original._id;

          return (
            <div className="flex gap-2">
              <EditButton
                resource="people"
                recordItemId={recordItemId}
                size="sm"
              />
              <ShowButton
                resource="people"
                recordItemId={recordItemId}
                size="sm"
              />
              <DeleteButton
                resource="people"
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
  }, [t]);

  const table = useTable({
    columns,
    refineCoreProps: {
      resource: "people",
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
        resource="people"
        title={t("relation.people")}
        canCreate
      />
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder={`Search by ${t("people.name").toLowerCase()}`}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <DataTable table={table} />
    </ListView>
  );
};
