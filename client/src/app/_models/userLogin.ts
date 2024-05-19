export interface UserLogin {
  userName: string;
  password: string;
}

export function createDefaultUserLogin(): UserLogin {
  return {
    userName: '',
    password: '',
  };
}
