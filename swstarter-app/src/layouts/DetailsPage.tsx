import { BackButton } from "@/components/BackButton";
import { SwContainer } from "@/components/SwContainer";
import { TopicTitle } from "@/components/TopicTitle";
import { Suspense } from "react";

export const DetailsPage = ({
  leftContent,
  rightContent,
  title,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  title: string;
}) => {
  return (
    <SwContainer className="flex flex-col gap-[20px] h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <TopicTitle title={title} size="lg" noBorder />

        <div className="grid lg:grid-cols-2 gap-[30px] lg:gap-[100px] overflow-hidden">
          {leftContent}
          {rightContent}
        </div>
        <div className="mt-auto">
          <BackButton />
        </div>
      </Suspense>
    </SwContainer>
  );
};
