export type DisplayUserInfoProps = {
  failure_count: number;
  profiles: {
    id: string;
    user_name: string;
    avatar_url: string;
  } | null;
};
