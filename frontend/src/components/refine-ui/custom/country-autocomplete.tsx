import { Autocomplete } from "./autocomplete";
import { UseFormReturn } from "react-hook-form";
import type { TCountryCode } from "countries-list";
import { getCountryDataList, getEmojiFlag } from "countries-list";
import _ from "lodash";

type AutocompleteOption = {
  label: string;
  value: string | number;
};
export function CountryAutocomplete({
  form,
  label,
  name,
  required = false,
  onChange = null,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  label: string;
  name: string;
  required?: boolean;
  onChange?: ((value: string | number) => void) | null;
}) {
  const options: AutocompleteOption[] = _.map(
    getCountryDataList(),
    (country) => ({
      label: `${country.name}`,
      value: country.iso2,
    }),
  );

  return (
    <Autocomplete
      form={form}
      label={label}
      name={name}
      options={options}
      required={required}
      onChange={onChange}
    />
  );
}
