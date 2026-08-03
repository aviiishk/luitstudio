import { formatDate } from "@/utils/format-date";

interface BlogMetaProps {
  author: string;
  category: string;
  date: string;
}

export function BlogMeta({ author, category, date }: BlogMetaProps) {
  return (
    <div className="text-body flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      <span className="text-ink font-medium">{category}</span>
      <span aria-hidden="true">•</span>
      <time dateTime={date}>{formatDate(date)}</time>
      <span aria-hidden="true">•</span>
      <span>By {author}</span>
    </div>
  );
}
