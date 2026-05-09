"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarRail as ShadcnSidebarRail,
  SidebarTrigger as ShadcnSidebarTrigger,
  useSidebar as useShadcnSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  useLink,
  useMenu,
  useRefineOptions,
  type TreeMenuItem,
} from "@refinedev/core";
import { ChevronRight, ListIcon } from "lucide-react";
import React from "react";

export function Sidebar() {
  const { open } = useShadcnSidebar();
  const { menuItems, selectedKey } = useMenu();

  return (
    <ShadcnSidebar
      variant="floating"
      collapsible="icon"
      className={cn(
        "border-none",
        "bg-sidebar/92",
        "backdrop-blur-md",
        "md:my-2",
        "md:ml-2",
        "md:mr-0",
        "md:p-1",
        "md:rounded-2xl",
        "md:shadow-[0_20px_40px_-28px_rgba(55,95,151,0.28)]",
      )}
    >
      <ShadcnSidebarRail />
      <SidebarHeader />
      <ShadcnSidebarContent
        className={cn(
          "transition-discrete",
          "duration-200",
          "flex",
          "flex-col",
          "gap-1.5",
          "pt-2",
          "pb-2",
          "shadow-[inset_-1px_0_0_color-mix(in_oklab,var(--foreground)_10%,transparent)]",
          {
            "px-2": open,
            "px-1": !open,
          },
        )}
      >
        {menuItems.map((item: TreeMenuItem) => (
          <SidebarItem
            key={item.key || item.name}
            item={item}
            selectedKey={selectedKey}
          />
        ))}
      </ShadcnSidebarContent>
    </ShadcnSidebar>
  );
}

type MenuItemProps = {
  item: TreeMenuItem;
  selectedKey?: string;
};

function SidebarItem({ item, selectedKey }: MenuItemProps) {
  const { open } = useShadcnSidebar();
  const isSelected = isItemSelected(item, selectedKey);

  if (item.meta?.group) {
    return <SidebarItemGroup item={item} selectedKey={selectedKey} />;
  }

  if (item.children && item.children.length > 0) {
    if (open) {
      return (
        <SidebarItemCollapsible
          item={item}
          selectedKey={selectedKey}
          isSelected={isSelected}
        />
      );
    }
    return (
      <SidebarItemDropdown
        item={item}
        selectedKey={selectedKey}
        isSelected={isSelected}
      />
    );
  }

  return <SidebarItemLink item={item} selectedKey={selectedKey} />;
}

function SidebarItemGroup({ item, selectedKey }: MenuItemProps) {
  const { children } = item;
  const { open } = useShadcnSidebar();

  return (
    <div
      className={cn(
        "pt-4",
        "mt-2",
        "shadow-[inset_0_1px_0_color-mix(in_oklab,var(--foreground)_8%,transparent)]",
      )}
    >
      <span
        className={cn(
          "ml-2",
          "inline-flex",
          "items-center",
          "rounded-full",
          "bg-sidebar-accent/70",
          "px-2.5",
          "py-1",
          "text-xs",
          "font-semibold",
          "uppercase",
          "tracking-[0.12em]",
          "text-muted-foreground",
          "transition-all",
          "duration-200",
          {
            "h-7": open,
            "h-0": !open,
            "opacity-0": !open,
            "opacity-100": open,
            "pointer-events-none": !open,
            "pointer-events-auto": open,
          },
        )}
      >
        {getDisplayName(item)}
      </span>
      {children && children.length > 0 && (
        <div className={cn("flex", "flex-col")}>
          {children.map((child: TreeMenuItem) => (
            <SidebarItem
              key={child.key || child.name}
              item={child}
              selectedKey={selectedKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SidebarItemCollapsible({
  item,
  selectedKey,
  isSelected = false,
}: MenuItemProps & { isSelected?: boolean }) {
  const { name, children } = item;

  const chevronIcon = (
    <ChevronRight
      className={cn(
        "h-4",
        "w-4",
        "shrink-0",
        {
          "text-sidebar-primary-foreground": isSelected,
          "text-muted-foreground": !isSelected,
        },
        "transition-transform",
        "duration-200",
        "group-data-[state=open]:rotate-90",
      )}
    />
  );

  return (
    <Collapsible key={`collapsible-${name}`} className={cn("w-full", "group")}>
      <CollapsibleTrigger asChild>
        <SidebarButton
          item={item}
          rightIcon={chevronIcon}
          isSelected={isSelected}
        />
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          "ml-3",
          "mt-1",
          "flex",
          "flex-col",
          "gap-1",
          "rounded-xl",
          "bg-sidebar-accent/42",
          "p-2",
        )}
      >
        {children?.map((child: TreeMenuItem) => (
          <SidebarItem
            key={child.key || child.name}
            item={child}
            selectedKey={selectedKey}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

function SidebarItemDropdown({
  item,
  selectedKey,
  isSelected = false,
}: MenuItemProps & { isSelected?: boolean }) {
  const { children } = item;
  const Link = useLink();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarButton item={item} isSelected={isSelected} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        {children?.map((child: TreeMenuItem) => {
          const { key: childKey } = child;
          const isSelected = childKey === selectedKey;

          return (
            <DropdownMenuItem key={childKey || child.name} asChild>
              <Link
                to={child.route || ""}
                className={cn("flex w-full items-center gap-2", {
                  "rounded-md bg-sidebar-primary text-sidebar-primary-foreground":
                    isSelected,
                })}
              >
                <ItemIcon
                  icon={child.meta?.icon ?? child.icon}
                  isSelected={isSelected}
                />
                <span>{getDisplayName(child)}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarItemLink({ item, selectedKey }: MenuItemProps) {
  const isSelected = item.key === selectedKey;

  return <SidebarButton item={item} isSelected={isSelected} asLink={true} />;
}

function SidebarHeader() {
  const { title } = useRefineOptions();
  const { open, isMobile } = useShadcnSidebar();

  return (
    <ShadcnSidebarHeader
      className={cn(
        "p-0",
        "h-16",
        "bg-sidebar-accent/50",
        "flex-row",
        "items-center",
        "justify-between",
        "overflow-hidden",
        "shadow-[inset_0_-1px_0_color-mix(in_oklab,var(--foreground)_12%,transparent)]",
      )}
    >
      <div
        className={cn(
          "whitespace-nowrap",
          "flex",
          "flex-row",
          "h-full",
          "items-center",
          "justify-start",
          "gap-2",
          "transition-discrete",
          "duration-200",
          {
            "pl-3": !open,
            "pl-5": open,
          },
        )}
      >
        <div>{title.icon}</div>
        <h2
          className={cn(
            "text-sm",
            "font-semibold",
            "tracking-[0.08em]",
            "uppercase",
            "transition-opacity",
            "duration-200",
            {
              "opacity-0": !open,
              "opacity-100": open,
            },
          )}
        >
          {title.text}
        </h2>
      </div>

      <ShadcnSidebarTrigger
        className={cn("text-muted-foreground", "mr-1.5", {
          "opacity-0": !open,
          "opacity-100": open || isMobile,
          "pointer-events-auto": open || isMobile,
          "pointer-events-none": !open && !isMobile,
        })}
      />
    </ShadcnSidebarHeader>
  );
}

function getDisplayName(item: TreeMenuItem) {
  return item.meta?.label ?? item.label ?? item.name;
}

type IconProps = {
  icon: React.ReactNode;
  isSelected?: boolean;
};

function ItemIcon({ icon, isSelected }: IconProps) {
  return (
    <div
      className={cn(
        "grid",
        "size-6",
        "place-items-center",
        "rounded-md",
        "transition-colors",
        {
          "text-muted-foreground": !isSelected,
          "bg-sidebar-primary-foreground/16 text-sidebar-primary-foreground":
            isSelected,
        },
      )}
    >
      {icon ?? <ListIcon />}
    </div>
  );
}

type SidebarButtonProps = React.ComponentProps<typeof Button> & {
  item: TreeMenuItem;
  isSelected?: boolean;
  rightIcon?: React.ReactNode;
  asLink?: boolean;
  onClick?: () => void;
};

function SidebarButton({
  item,
  isSelected = false,
  rightIcon,
  asLink = false,
  className,
  onClick,
  ...props
}: SidebarButtonProps) {
  const Link = useLink();

  const buttonContent = (
    <>
      <ItemIcon icon={item.meta?.icon ?? item.icon} isSelected={isSelected} />
      <span
        className={cn("tracking-[-0.00875rem]", {
          "flex-1": rightIcon,
          "text-left": rightIcon,
          "line-clamp-1": !rightIcon,
          truncate: !rightIcon,
          "font-normal": !isSelected,
          "font-semibold": isSelected,
          "text-sidebar-primary-foreground": isSelected,
          "text-foreground": !isSelected,
        })}
      >
        {getDisplayName(item)}
      </span>
      {rightIcon}
    </>
  );

  return (
    <Button
      asChild={!!(asLink && item.route)}
      variant={isSelected ? undefined : "ghost"}
      size="lg"
      className={cn(
        "flex w-full items-center justify-start gap-2 rounded-xl py-2.5 px-3 text-sm transition-all duration-200",
        isSelected
          ? "bg-[linear-gradient(90deg,_var(--primary),_var(--chart-1))] text-[var(--on-primary)] shadow-[0_4px_16px_-4px_rgba(124,185,232,0.18)] hover:brightness-105 hover:shadow-[0_8px_24px_-4px_rgba(124,185,232,0.24)]"
          : "text-sidebar-foreground hover:bg-sidebar-accent/78 hover:translate-x-0.5",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {asLink && item.route ? (
        <Link to={item.route} className={cn("flex w-full items-center gap-2")}>
          {buttonContent}
        </Link>
      ) : (
        buttonContent
      )}
    </Button>
  );
}

function isItemSelected(item: TreeMenuItem, selectedKey?: string): boolean {
  if (item.key === selectedKey) {
    return true;
  }

  return !!item.children?.some((child) => isItemSelected(child, selectedKey));
}

Sidebar.displayName = "Sidebar";
