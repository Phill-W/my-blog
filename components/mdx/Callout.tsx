import type { ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutVariant = "note" | "tip" | "warning";

type CalloutProps = {
  children: ReactNode;
  title?: string;
  type?: CalloutVariant;
};

const variantIconMap = {
  note: Info,
  tip: Lightbulb,
  warning: AlertTriangle,
} satisfies Record<CalloutVariant, typeof Info>;

export default function Callout({
  children,
  title,
  type = "note",
}: CalloutProps) {
  const Icon = variantIconMap[type];

  return (
    <aside
      className={cn("article-callout", `article-callout--${type}`)}
      data-callout-type={type}
    >
      <div className="article-callout__icon">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <div className="article-callout__body">
        {title ? <p className="article-callout__title">{title}</p> : null}
        <div className="article-callout__content">{children}</div>
      </div>
    </aside>
  );
}
