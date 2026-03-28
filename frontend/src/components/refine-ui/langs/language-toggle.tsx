"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const cycleLang = () => {
    switch (currentLang) {
      case "th":
        i18n.changeLanguage("en");
        break;
      case "en":
        i18n.changeLanguage("th");
        break;
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycleLang}
      className={cn(
        "rounded-full",
        "border-sidebar-border",
        "bg-transparent",
        "h-10",
        "w-10",
      )}
    >
      {currentLang === "th" ? "TH" : "EN"}
      <span className="sr-only">Toggle Language</span>
    </Button>
  );
}

LanguageToggle.displayName = "ThemeToggle";
