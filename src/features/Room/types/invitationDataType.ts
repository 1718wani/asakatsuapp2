// Profile型の定義
type _Profile = {
  avatar_url: string;
  user_name: string;
};

// データオブジェクトの型定義
export type DataObject = {
  profiles: _Profile;
  room_id: number;
};
