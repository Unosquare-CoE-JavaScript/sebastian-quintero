type CommonUser = {
  email: string;
  password: string;
  name: string;
  avatar: string;
};

export type User = CommonUser & {
  id: number;
  role: string;
};

export type CreatableUser = CommonUser;
