"use client";

import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./tabs.module.css";
import { cva } from "class-variance-authority";
import { ComponentProps } from "react";

type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

const tabTriggerVariants = cva(styles.tabTriggerBase, {
  variants: {
    variant: {
      default: styles.tabTriggerDefault,
      underline: styles.tabTriggerUnderline,
    },
    active: {
      true: styles.tabTriggerActive,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TabsTriggerProps = ComponentProps<"button"> & {
  value: string;
  children: React.ReactNode;
};

export const TabsRoot = ({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={styles.tabsRoot}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div role="tablist" className={cn(styles.tabsList, className)}>
    {children}
  </div>
);

export const TabsTrigger = ({ value, children, className, ...props }: TabsTriggerProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within TabsRoot");

  return (
    <button
      role="tab"
      aria-selected={context.activeTab === value ? "true" : "false"}
      onClick={() => context.setActiveTab(value)}
      className={cn(
        tabTriggerVariants({
          variant: "default",
          active: context.activeTab === value,
        }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within TabsRoot");

  return (
    <div role="tabpanel" hidden={context.activeTab !== value} className={styles.tabContent}>
      {children}
    </div>
  );
};
