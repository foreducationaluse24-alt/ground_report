import NewsFeed from "@/component/newsfeed";
import Pagination from "@/component/Pagination"; 
import { getStories, PAGE_SIZE } from "@/lib/stories";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const { items, total } = await getStories(page);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Main news feed */}
      <section className="space-y-4 md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-bold">Top Stories</h1>
            <p className="mt-1 text-sm text-slate-500">
              Important stories from across the news spectrum.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="py-10 text-center text-slate-500">
              No stories yet. Check back soon.
            </p>
          ) : (
            <>
              <NewsFeed
                articles={items}
                heroCount={page === 1 ? 3 : 0}
                rowCount={page === 1 ? 6 : 0}
              />
              <Pagination page={page} totalPages={totalPages} />
            </>
          )}
        </div>
      </section>

      {/* Blindspots sidebar */}

      <aside className="hidden md:block md:col-span-1">
        <section className="sticky top-24 space-y-5 rounded-lg border border-slate-200 bg-white p-5">
          <div>
            <h2 className="font-serif text-xl font-bold">Blindspots</h2>

            <p className="mt-2 text-sm text-slate-500">
              Stories receiving uneven coverage across the political spectrum.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Coverage gap
            </p>

            <h3 className="mt-2 font-semibold text-investigative-navy">
              New environmental policy sparks debate
            </h3>

            <div className="mt-4 space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Left-leaning</span>
                  <span className="font-semibold">75%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[75%] rounded-full bg-blue-500" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Center</span>
                  <span className="font-semibold">40%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[40%] rounded-full bg-slate-500" />
                </div>
              </div>

              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Right-leaning</span>
                  <span className="font-semibold">10%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[10%] rounded-full bg-rose-500" />
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Covered by 15 publications.
            </p>
          </div>
        </section>
      </aside>
    </div>
  );
}
