import { formatDate } from "@/utils/format-date";

interface BlogMetaProps {
  tags: readonly string[];
  publishedAt: string;
}

export function BlogMeta({ tags, publishedAt }: BlogMetaProps) {
  return (
    <div className="text-body flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      {tags[0] ? (
        <>
          <span className="text-ink font-medium">{tags[0]}</span>
          <span aria-hidden="true">•</span>
        </>
      ) : null}
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
    </div>
  );
}
