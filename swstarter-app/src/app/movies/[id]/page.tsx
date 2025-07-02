import { LinksList } from "@/components/LinksList";
import { OpeningCrawl } from "@/components/OpeningCrawl";
import { DetailsPage } from "@/layouts/DetailsPage";
import { getMovie } from "@/services/moviesService";

export default async function MoviesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await getMovie(id);

  return (
    <DetailsPage
      title={movie.title}
      leftContent={<OpeningCrawl openingCrawl={movie.openingCrawl} />}
      rightContent={<LinksList links={movie.characters || []} type="people" />}
    />
  );
}
