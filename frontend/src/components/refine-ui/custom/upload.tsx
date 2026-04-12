import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

export function Upload({
  name,
  form,
  maxNumber = 15,
}: {
  name: string;
  form?: UseFormReturn<any> | null;
  maxNumber?: number;
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
          const maxFiles = maxNumber; // Set your desired limit

          if (files && files.length > maxFiles) {
            alert(`You can only upload a maximum of ${maxFiles} images`);
            event.target.value = ""; // Clear the input
            return;
          }

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
