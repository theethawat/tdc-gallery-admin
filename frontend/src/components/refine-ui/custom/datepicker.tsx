import React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  const [date, setDate] = React.useState<Date | undefined>(defaultDate);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-empty={!date}
            className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
          >
            {date ? format(date, "PPP") : <span>{t("general.pickADate")}</span>}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
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
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </FormItem>
  );
}
