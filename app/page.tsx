"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import MiniPage from "@/components/Works/MiniPage";
import SeasonSelector from "@/components/Works/SeasonSelector";
import { WorkData } from "@/components/Works/WorkCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const workYear = searchParams.get("year") || "2023";
  const workSeason = searchParams.get("season") || "autumn";
  const workTitle = searchParams.get("title");

  const [workData, setWorkData] = useState<WorkData[] | null>(null);

  useEffect(() => {
    if (workTitle) {
      fetch(`/api/search/titles?title=${workTitle}`)
        .then((res) => res.json())
        .then((res) => {
          setWorkData(res);
          router.push(`?title=${workTitle}`);
        });
    } else {
      fetch(`/api/search/seasons?season=${workYear}-${workSeason}`)
        .then((res) => res.json())
        .then((res) => {
          setWorkData(res);
          router.push(`?year=${workYear}&season=${workSeason}`);
        });
    }

    return setWorkData(null);
  }, [workYear, workSeason, workTitle]);

  return (
    <>
      {!workData ? (
        <LoadingSpinner />
      ) : (
        <main>
          {!workTitle && (
            <SeasonSelector workYear={workYear} workSeason={workSeason} />
          )}
          <MiniPage workData={workData} />
        </main>
      )}
    </>
  );
};

export default HomePage;
