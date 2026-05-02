import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { UserRoundIcon, CalendarDaysIcon, FileTextIcon } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

  const personName = form.watch("name") || t("people.name");
  const statusValue = form.watch("status");

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 lg:grid-cols-12"
      >
        <div className="space-y-4 lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="gap-4 border-white/60 bg-card/88 backdrop-blur-sm">
            <CardHeader className="px-5 pb-0">
              <CardTitle className="text-base font-semibold">
                {t("people.people")}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/60 p-3">
                <div className="grid size-12 place-items-center rounded-full bg-primary/16 text-primary">
                  <UserRoundIcon className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {personName}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
                  {statusValue
                    ? PeopleStatusInfo[
                        statusValue as keyof typeof PeopleStatusInfo
                      ]?.translation[
                        language as keyof (typeof PeopleStatusInfo)[keyof typeof PeopleStatusInfo]["translation"]
                      ] || statusValue
                    : t("people.status")}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {t("people.note")}: {t("buttons.enter")}{" "}
                {t("people.note").toLowerCase()}.
              </p>
            </CardContent>
          </Card>

          <Card className="gap-3 border-primary/15 bg-[linear-gradient(155deg,color-mix(in_oklab,var(--primary)_18%,white),color-mix(in_oklab,var(--primary)_82%,black))] text-primary-foreground shadow-[0_14px_28px_-20px_color-mix(in_oklab,var(--primary)_65%,transparent)]">
            <CardHeader className="px-5 pb-0">
              <CardTitle className="text-base font-semibold">
                Memory Context
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm text-primary-foreground/90">
              Keep identity details and relationship notes updated so your
              people archive stays easy to search.
            </CardContent>
          </Card>
        </div>

        <Card className="gap-0 border-white/60 bg-card/90 backdrop-blur-sm lg:col-span-8">
          <section className="space-y-5 border-b border-border/60 p-6">
            <SectionTitle
              icon={<UserRoundIcon className="size-4" />}
              title="Personal Information"
              subtitle="Core profile details"
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                control={control}
                name="name"
                rules={{
                  required: t("people.name") + " " + t("general.isRequired"),
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClassName}>
                      {t("people.name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder={`${t("buttons.enter")}${t(
                          "people.name",
                        )?.toLowerCase()}`}
                        className={inputClassName}
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
                    <FormLabel className={labelClassName}>
                      {t("people.calledName")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder={`${t("buttons.enter")}${t(
                          "people.callNameHelper",
                        )?.toLowerCase()}`}
                        className={inputClassName}
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
                    <FormLabel className={labelClassName}>
                      {t("people.nickname")}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className={inputClassName} />
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
                    <FormLabel className={labelClassName}>
                      {t("people.status")}
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className={cn("w-full", inputClassName)}>
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
            </div>
          </section>

          <section className="space-y-5 border-b border-border/60 p-6">
            <SectionTitle
              icon={<CalendarDaysIcon className="size-4" />}
              title="Timeline"
              subtitle="Important dates and context"
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Datepicker
                label={t("people.birthday")}
                name="birthday"
                form={form}
              />
              <Datepicker
                label={t("people.knownDate")}
                name="knownDate"
                form={form}
              />

              <FormField
                control={control}
                name="meetingPlace"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className={labelClassName}>
                      {t("people.meetingPlace")}
                    </FormLabel>
                    <FormControl>
                      <Input {...field} className={inputClassName} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <section className="space-y-5 p-6">
            <SectionTitle
              icon={<FileTextIcon className="size-4" />}
              title="Notes & Media"
              subtitle="Additional details and attachments"
            />

            <div className="grid grid-cols-1 gap-5">
              <div className="rounded-xl bg-sidebar-accent/50 p-3">
                <Upload name="image" form={form} />
              </div>

              <FormField
                control={control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClassName}>
                      {t("people.note")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value || ""}
                        rows={7}
                        className={cn(inputClassName, "resize-y")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end border-t border-border/60 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="min-w-32 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isLoading ? "Saving..." : submitLabel}
              </Button>
            </div>
          </section>
        </Card>
      </form>
    </Form>
  );
};

const labelClassName =
  "text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground";

const inputClassName =
  "rounded-lg border-border/80 bg-background/90 shadow-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-0";

type SectionTitleProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

function SectionTitle({ icon, title, subtitle }: SectionTitleProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 grid size-7 place-items-center rounded-md bg-primary/12 text-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
