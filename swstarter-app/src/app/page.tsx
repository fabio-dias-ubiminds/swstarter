import { Search } from "@/components/Search";
import { SearchResultEmptyState } from "@/components/SearchResultEmptyState";
import { SearchResults } from "@/components/SearchResults";
import { SwContainer } from "@/components/SwContainer";
import { TopicTitle } from "@/components/TopicTitle";
import { SearchResultItem } from "@/lib/types";
import { search } from "@/services/searchService";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { q, type } = await searchParams;

  let list: SearchResultItem[] = [];

  if (q && type) {
    list = await search(q, type as "people" | "movies");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] h-full">
      <div className="lg:col-span-4">
        <SwContainer className="flex flex-col gap-[20px]">
          <TopicTitle title="What are you searching for?" size="sm" />
          <Search searchType={type} searchTerm={q} />
        </SwContainer>
      </div>
      <SwContainer className="lg:col-span-8 min-h-full flex flex-col">
        <TopicTitle title="Results" size="lg" />
        <Suspense fallback={<SearchResultEmptyState isFetching={true} />}>
          {list.length > 0 ? <SearchResults results={list} /> : <SearchResultEmptyState />}
        </Suspense>
      </SwContainer>
    </div>
  );
}
