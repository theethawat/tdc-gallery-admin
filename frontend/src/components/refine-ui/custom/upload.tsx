import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

export function Upload({
  name,
  form,
}: {
  name: string;
  form?: UseFormReturn<any> | null;
}) {
  return (
    <Field>
      <FieldLabel htmlFor="picture">Upload</FieldLabel>
      <Input
        id="picture"
        type="file"
        multiple
        onChange={(event) => {
          const files = event.target.files;
          if (form) {
            form.setValue(name, files, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            });
          }
        }}
      />
      <FieldDescription>Select pictures to upload.</FieldDescription>
    </Field>
  );
}
