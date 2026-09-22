import Link from "next/link";

interface FooterCopyrightProps {
  editorialCopy: string;
  text: string;
}

export function FooterCopyright({ editorialCopy, text }: FooterCopyrightProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-white/20 py-6 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <p>{text}</p>
        <Link href="/privacy" className="hover:text-white">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-white">
          Terms &amp; Conditions
        </Link>
      </div>
      <p className="text-white">{editorialCopy}</p>
    </div>
  );
}
