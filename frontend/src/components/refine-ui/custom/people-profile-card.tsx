import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { People, PeopleStatusInfo } from "@/types";
import {
  CalendarIcon,
  GlobeIcon,
  HeartHandshakeIcon,
  MapPinIcon,
  NotebookTextIcon,
  UserIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface PeopleProfileCardProps {
  record?: People;
  isLoading?: boolean;
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-muted-foreground shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-0.5">
          {label}
        </p>
        <p className="text-sm text-foreground wrap-break-word">{value}</p>
      </div>
    </div>
  );
}

export function PeopleProfileCard({
  record,
  isLoading,
}: PeopleProfileCardProps) {
  const { t, i18n } = useTranslation();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex gap-6">
            <Skeleton className="w-32 h-32 rounded-xl shrink-0" />
            <div className="flex-1 space-y-3 pt-2">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const statusInfo = record?.status ? PeopleStatusInfo[record.status] : null;
  const lang = i18n.language === "th" ? "th" : "en";

  const statusLabel = statusInfo
    ? statusInfo.translation[lang as "en" | "th"]
    : null;

  const imageUrl = record?.image?.url;

  const birthdayDisplay = record?.birthday
    ? new Date(record.birthday).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const knownDateDisplay = record?.knownDate
    ? new Date(record.knownDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const hasSocialMedia =
    record?.socialMedia?.facebook || record?.socialMedia?.instagram;

  const hasPersonalInfo =
    record?.calledName ||
    record?.nickname ||
    record?.birthday ||
    record?.nationality;

  const hasMeetingInfo = record?.knownDate || record?.meetingPlace;

  return (
    <Card className="overflow-hidden">
      {/* Profile Header */}
      <div className="bg-linear-to-br from-sky-50 to-blue-50 border-b p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Square Profile Photo */}
          <div className="w-32 h-32 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={record?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <UserIcon className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Name & Status */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {statusLabel && (
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    statusInfo?.color ?? "bg-muted text-muted-foreground"
                  }`}
                >
                  {statusLabel}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-semibold text-foreground leading-tight">
              {record?.name || "-"}
            </h2>
            {record?.calledName && (
              <p className="text-sm text-muted-foreground">
                {t("people.calledName")}:{" "}
                <span className="text-foreground font-medium">
                  {record.calledName}
                </span>
              </p>
            )}
            {record?.nickname && (
              <p className="text-sm text-muted-foreground italic">
                &ldquo;{record.nickname}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>

      <CardContent className="pt-6 space-y-6">
        {/* Personal Info */}
        {hasPersonalInfo && (
          <>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                {t("people.name")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow
                  icon={<CalendarIcon size={14} />}
                  label={t("people.birthday")}
                  value={birthdayDisplay}
                />
                <InfoRow
                  icon={<GlobeIcon size={14} />}
                  label={t("people.nationality")}
                  value={record?.nationality}
                />
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Meeting Info */}
        {hasMeetingInfo && (
          <>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                <HeartHandshakeIcon
                  size={12}
                  className="inline mr-1 align-middle"
                />
                Connection
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoRow
                  icon={<CalendarIcon size={14} />}
                  label={t("people.knownDate")}
                  value={knownDateDisplay}
                />
                <InfoRow
                  icon={<MapPinIcon size={14} />}
                  label={t("people.meetingPlace")}
                  value={record?.meetingPlace}
                />
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Social Media */}
        {hasSocialMedia && (
          <>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                {t("people.socialMedia")}
              </p>
              <div className="flex flex-wrap gap-2">
                {record?.socialMedia?.facebook && (
                  <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
                    <GlobeIcon size={12} />
                    <span>Facebook</span>
                  </Badge>
                )}
                {record?.socialMedia?.instagram && (
                  <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
                    <GlobeIcon size={12} />
                    <span>Instagram</span>
                  </Badge>
                )}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Note */}
        {record?.note && (
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              <NotebookTextIcon
                size={12}
                className="inline mr-1 align-middle"
              />
              {t("people.note")}
            </p>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
              {record.note}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
