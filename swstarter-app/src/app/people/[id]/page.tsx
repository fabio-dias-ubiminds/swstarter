import { LinksList } from "@/components/LinksList";
import { PersonDetails } from "@/components/PersonDetails";
import { DetailsPage } from "@/layouts/DetailsPage";
import { getPerson } from "@/services/peopleService";

export default async function PeoplePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = await getPerson(id);

  return (
    <DetailsPage
      title={person.name}
      leftContent={<PersonDetails person={person} />}
      rightContent={<LinksList links={person.movies || []} type="people" />}
    />
  );
}
