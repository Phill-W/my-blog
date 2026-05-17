import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import TagList from "@/components/TagList";

type PostCardProps = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  href: string;
};

export default function PostCard({
  title,
  description,
  date,
  tags,
  href,
}: PostCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card className="h-full border-border/70 transition-all hover:-translate-y-1 hover:shadow-md">
        <CardContent className="flex h-full flex-col gap-4 p-5">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{date}</p>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="mt-auto">
            <TagList tags={tags} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
