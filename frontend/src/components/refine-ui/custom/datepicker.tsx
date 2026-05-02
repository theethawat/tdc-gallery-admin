import React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import DatePickerComponent from "../date-picker/date-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormItem, FormLabel } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function Datepicker({
  label,
  name = "",
  form = null,
  defaultDate = new Date(),
}: {
  label: string;
  name?: string;
  form?: UseFormReturn<any> | null;
  defaultDate?: Date;
}) {
  const { t } = useTranslation();
  const [date, setDate] = React.useState<Date | undefined>(
    defaultDate || undefined,
  );

  return (
    <FormItem className="w-full">
      <FormLabel>{label}</FormLabel>
      <DatePickerComponent
        selected={form ? form.watch(name) : date}
        onSelect={(tempDate) => {
          setDate(tempDate);
          if (form) {
            form.setValue(name, tempDate, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
          }
        }}
      />
    </FormItem>
  );
}
