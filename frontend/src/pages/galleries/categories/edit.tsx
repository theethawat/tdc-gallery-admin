import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { EditView } from "@/components/refine-ui/views/edit-view";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategoryFormValues = {
  name: string;
  place: string;
};

type CategoryRecord = {
  place?: {
    _id?: string;
    id?: string;
  };
};

export const CategoryEdit = () => {
  const navigate = useNavigate();

  const {
    refineCore: { onFinish, query },
    setValue,
    ...form
  } = useForm<CategoryFormValues>({
    refineCoreProps: {
      resource: "category",
    },
  });

  const categoryData = query?.data?.data as CategoryRecord | undefined;
  const selectedPlaceId = categoryData?.place?._id ?? categoryData?.place?.id;

  const { options: placeOptions } = useSelect({
    resource: "place",
    optionLabel: "name",
    optionValue: "_id",
    defaultValue: selectedPlaceId,
    queryOptions: {
      enabled: !!selectedPlaceId,
    },
    pagination: {
      current: 1,
      pageSize: 1000,
    },
  });

  useEffect(() => {
    if (selectedPlaceId) {
      setValue("place", selectedPlaceId);
    }
  }, [selectedPlaceId, setValue]);

  function onSubmit(values: CategoryFormValues) {
    onFinish({
      name: values.name,
      place: values.place,
    });
  }

  return (
    <EditView>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="place"
            rules={{ required: "Place is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a place" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {placeOptions?.map((option) => (
                      <SelectItem
                        key={String(option.value)}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Category name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="Enter category name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button
              type="submit"
              {...form.saveButtonProps}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Updating..." : "Update"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </EditView>
  );
};
