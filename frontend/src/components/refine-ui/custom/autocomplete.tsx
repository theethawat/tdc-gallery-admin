import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { UseFormReturn } from "react-hook-form";

type AutocompleteOption = {
  label: string;
  value: string | number;
};

export function Autocomplete({
  form,
  label,
  name,
  options,
  required = false,
  onChange = null,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  label: string;
  name: string;
  options: AutocompleteOption[];
  required?: boolean;
  onChange?: ((value: string | number) => void) | null;
}) {
  const { t } = useTranslation();
  return (
    <FormField
      control={form.control}
      name={name}
      rules={{
        required: required ? `${label} ${t("general.isRequired")}` : false,
      }}
      render={({ field }) => {
        const autocompleteValue =
          field.value && typeof field.value === "object"
            ? (field.value as unknown as { _id: string })._id
            : field.value || "";
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select
              onValueChange={onChange || field.onChange}
              value={autocompleteValue}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    placeholder={`${t("general.pleaseSelect")} ${label}`}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options?.map((option) => (
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
        );
      }}
    />
  );
}
