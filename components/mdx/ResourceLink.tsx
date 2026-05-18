import { ArrowUpRight, Link2 } from "lucide-react";

type ResourceLinkProps = {
  href: string;
  title: string;
  description?: string;
  label?: string;
};

function getResourceLabel(href: string, label?: string) {
  if (label) {
    return label;
  }

  try {
    const url = new URL(href);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

export default function ResourceLink({
  href,
  title,
  description,
  label,
}: ResourceLinkProps) {
  const resourceLabel = getResourceLabel(href, label);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="article-resource-link"
    >
      <span className="article-resource-link__icon">
        <Link2 className="h-4 w-4" aria-hidden="true" />
      </span>

      <span className="article-resource-link__body">
        <span className="article-resource-link__label">{resourceLabel}</span>
        <span className="article-resource-link__title-row">
          <span className="article-resource-link__title">{title}</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>

        {description ? (
          <span className="article-resource-link__description">
            {description}
          </span>
        ) : null}
      </span>
    </a>
  );
}
