import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import _ from "lodash";
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
import { Textarea } from "@/components/ui/textarea";
import { Datepicker, Upload } from "../custom";
import { People, PeopleStatusInfo } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// As Same as ArticleFormValue but with People type and status field
export type PeopleFormValue = Omit<
  People,
  "_id" | "createdAt" | "updatedAt" | "image"
>;

interface PeopleFormProps {
  form: UseFormReturn<PeopleFormValue, unknown>;
  onSubmit: SubmitHandler<PeopleFormValue>;
  isLoading?: boolean;
  submitLabel?: string;
}

export const PeopleForm: React.FC<PeopleFormProps> = ({
  form,
  onSubmit,
  isLoading = false,
  submitLabel = "Save",
}) => {
  const { t, i18n } = useTranslation();
  const { control, handleSubmit } = form;
  const language = i18n.language || "en";

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="name"
          rules={{
            required: t("people.name") + " " + t("general.isRequired"),
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("people.name")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={`${t("buttons.enter")}${t(
                    "people.name",
                  )?.toLowerCase()}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="calledName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("people.calledName")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder={`${t("buttons.enter")}${t(
                    "people.callNameHelper",
                  )?.toLowerCase()}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("people.nickname")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("people.status")}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full max-w-48">
                    <SelectValue
                      placeholder={`${t("general.select")} ${t(
                        "people.status",
                      )}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("people.status")}</SelectLabel>
                      {_.map(PeopleStatusInfo, (info, key) => (
                        <SelectItem key={key} value={key}>
                          {info.translation[
                            language as keyof typeof info.translation
                          ] || key}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Datepicker label={t("people.birthday")} name="birthday" form={form} />
        <Separator />
        <Datepicker
          label={t("people.knownDate")}
          name="knownDate"
          form={form}
        />
        <FormField
          control={control}
          name="meetingPlace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("people.meetingPlace")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Upload */}
        <Upload name="image" form={form} />

        {/* Description */}
        <FormField
          control={control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("people.note")}</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ""} rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Buttons */}
        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
