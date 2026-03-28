import { useOne, useResourceParams } from "@refinedev/core";

import { ShowView } from "@/components/refine-ui/views/show-view";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "@/types";

export const CategoryShow = () => {
  const { id } = useResourceParams();
  const {
    result: record,
    query: { error, isError, isLoading, isFetching },
  } = useOne<Category>({
    resource: "category",
    id,
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <ShowView>
      <Card>
        <CardHeader>
          <CardTitle>{record?.name}</CardTitle>
          <CardDescription>Category ID: {record?._id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Title</h4>
              <p className="text-sm text-muted-foreground">
                {record?.name || "-"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ShowView>
  );
};
