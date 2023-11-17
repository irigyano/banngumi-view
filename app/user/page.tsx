import Link from "next/link";
import prisma from "@/lib/prisma";
import { UserClientSide } from "@/app/types/types";
import Image from "next/image";

export const metadata = {
  title: "社群",
};

const CommunityPage = async () => {
  const users = await prisma.user.findMany();

  return (
    <div className="flex flex-wrap justify-center">
      {users.map((user: UserClientSide) => {
        return (
          <Link
            key={user.id}
            className="flex m-2 border-gray-400 border rounded-lg shadow-md dark:shadow-white hover:bg-gray-100 dark:hover:bg-zinc-700 duration-300 h-32 w-60"
            href={`/user/${user.id}`}
          >
            <div className="m-2">
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                <Image
                  alt="avatar"
                  src={user.image || "/images/KEKW.webp"}
                  width={80}
                  height={80}
                ></Image>
              </div>
              <div className="w-20 truncate my-1">
                <div className="text-center">@{user.name}</div>
              </div>
            </div>
            <div className="flex flex-col justify-end m-2">
              <div>正在看 {user.watchingWorks.length}</div>
              <div>看　過 {user.watchedWorks.length}</div>
              <div>關　注 {user.followingWorks.length}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default CommunityPage;