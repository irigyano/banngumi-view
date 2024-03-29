import { User } from "@prisma/client";

export type UserClientSide = Omit<User, "name" | "email" | "emailVerified">;

export type WorkData = {
  annictId: number;
  title: string;
  titleKana: string;
  seasonName?: string;
  seasonYear?: number;
  media: string;
  twitterHashtag?: string;
  episodesCount: number;
  image: {
    facebookOgImageUrl: string;
    recommendedImageUrl: string;
  };
  casts: {
    nodes: {
      name: string;
      person: { annictId: number };
      character: { name: string; annictId: number };
    }[];
  };
};

export type ServerProps = {
  params: { username: string };
  searchParams: { [key: string]: string | undefined };
};
