type Login = {
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
  expiresIn: number;
};
