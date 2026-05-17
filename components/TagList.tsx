import { Badge } from "@/components/ui/badge";

type TagListProps = {
  tags: string[];
};

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="rounded-full px-3.5 py-1 text-sm"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
