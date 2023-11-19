import Image from "next/image";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { WorkData } from "@/app/types/types";
import BrowseRow from "@/app/components/BrowseGrid/BrowseRow";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ReduxBroadcaster from "@/app/components/ReduxBroadcaster";

type ServerProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: ServerProps): Promise<Metadata> {
  return { title: `${params.username}` };
}

function filterCollection(
  apiCollection: WorkData[],
  userCollectionIds: number[]
) {
  const userCollection: WorkData[] = [];
  for (let work of apiCollection) {
    if (userCollectionIds.includes(work.annictId)) userCollection.push(work);
  }
  return userCollection;
}

const UserPage = async ({ params }: ServerProps) => {
  // check if page valid/user exist
  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: { username: params.username },
    });
    if (!user) return redirect("/activity");
  } catch (error) {
    console.log(error);
    return redirect("/activity");
  }

  const session = await getServerSession(authOptions);
  let currentUser = null;
  if (session?.user) {
    currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
  }

  const requestingWorks = user.finishedWorks
    .concat(user.watchingWorks, user.followingWorks)
    .join(",");
  const res = await fetch(
    `${process.env.HOST_URL}/api/search/id?id=${requestingWorks}`
  );
  const works: WorkData[] = await res.json();

  const userFollowingCollection = filterCollection(works, user.followingWorks);
  const userWatchingCollection = filterCollection(works, user.watchingWorks);
  const userFinishedCollection = filterCollection(works, user.finishedWorks);

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-2 mx-4">
        <Image
          className="rounded-full"
          src={user.image || "/images/KEKW.webp"}
          width={150}
          height={150}
          sizes="150px"
          alt="avatar"
        />
        <div>@{user.username}</div>
      </div>
      <ReduxBroadcaster currentUser={currentUser}>
        <BrowseRow works={userFollowingCollection} title="關注" />
        <BrowseRow works={userWatchingCollection} title="正在追" />
        <BrowseRow works={userFinishedCollection} title="看過" />
      </ReduxBroadcaster>
    </>
  );
};
export default UserPage;