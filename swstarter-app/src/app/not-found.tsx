import { BackButton } from "@/components/BackButton";
import { SwContainer } from "@/components/SwContainer";
import { TopicTitle } from "@/components/TopicTitle";

export default function NotFound() {
  return (
    <SwContainer className="flex flex-col gap-[20px]">
      <TopicTitle title="Not Found" />
      <p>The page you are looking for does not exist.</p>
      <div>
        <BackButton />
      </div>
    </SwContainer>
  );
}
