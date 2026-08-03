interface FooterCopyrightProps {
  editorialCopy: string;
  text: string;
}

export function FooterCopyright({ editorialCopy, text }: FooterCopyrightProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-white/20 py-6 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
      <p>{text}</p>
      <p className="text-white">{editorialCopy}</p>
    </div>
  );
}
