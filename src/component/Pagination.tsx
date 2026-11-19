import Link from "next/link";

type Props = { page: number; totalPages: number; basePath?: string };

export default function Pagination({
  page,
  totalPages,
  basePath = "/home",
}: Props) {
  if (totalPages <= 1) return null;

  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);

  // Window of up to 5 pages around the current one
  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const base =
    "flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm font-medium transition";

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-1"
    >
      {page > 1 ? (
        <Link
          href={href(page - 1)}
          className={`${base} bg-slate-100 hover:bg-slate-200`}
        >
          ← Prev
        </Link>
      ) : (
        <span className={`${base} cursor-not-allowed bg-slate-50 text-slate-300`}>
          ← Prev
        </span>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${base} ${
            p === page
              ? "bg-slate-900 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }`}
        >
          {p}
        </Link>
      ))}

      {page < totalPages ? (
        <Link
          href={href(page + 1)}
          className={`${base} bg-slate-100 hover:bg-slate-200`}
        >
          Next →
        </Link>
      ) : (
        <span className={`${base} cursor-not-allowed bg-slate-50 text-slate-300`}>
          Next →
        </span>
      )}
    </nav>
  );
}