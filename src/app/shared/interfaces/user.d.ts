export interface User extends Register {
  id: number;
}

export interface FilterUsers {
  search: string;
}

export interface Register extends Login {
  full_name: string;
  role: 'customer' | 'admin';
}

export interface Login {
  username: string;
  password: string;
}
