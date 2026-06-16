import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { Search } from "lucide-react";
import { Article } from "@/types";

import {
  DeleteButton,
  EditButton,
  ShowButton,
} from "@/components/refine-ui/buttons";
import { useTranslation } from "react-i18next";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import {
  ListView,
  ListViewHeader,
} from "@/components/refine-ui/views/list-view";
import { Input } from "@/components/ui/input";

export const DiaryArticleList = () => {
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
    const columnHelper = createColumnHelper<Article>();

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
        header: t("gallery.articleName"),
        enableSorting: true,
        cell: ({ getValue }) => getValue() || "-",
      }),
      columnHelper.accessor("description", {
        id: "description",
        header: t("general.description") || "Description",
        enableSorting: false,
        cell: ({ getValue }) => {
          const description = getValue();
          if (!description) return "-";
          return (
            <div className="max-w-xs truncate">
              {description.slice(0, 80)}...
            </div>
          );
        },
      }),
      columnHelper.accessor("categories", {
        id: "categories",
        header: t("gallery.category"),
        enableSorting: false,
        cell: ({ getValue }) => {
          const categories = getValue();
          if (!categories || categories.length === 0) return "-";
          return categories.map((cat: any) => cat?.name).join(", ") || "-";
        },
      }),
      columnHelper.accessor("date", {
        id: "date",
        header: t("general.date"),
        enableSorting: true,
        cell: ({ getValue }) => {
          const date = getValue();
          return date ? new Date(date).toLocaleDateString() : "-";
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
                resource="diary-articles"
                recordItemId={recordItemId}
                size="sm"
              />
              <ShowButton
                resource="diary-articles"
                recordItemId={recordItemId}
                size="sm"
              />
              <DeleteButton
                resource="diary-articles"
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
      resource: "diary-article",
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
        resource="diary-articles"
        title={t("diary.diaryArticle")}
        canCreate
      />
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder={`Search by ${t("diary.diaryArticleName").toLowerCase()}`}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <DataTable table={table} />
    </ListView>
  );
};
