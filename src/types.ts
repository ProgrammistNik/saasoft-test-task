export interface Account {
  id: string;
  tags: { text: string }[];
  type: string;
  login: string | null;
  password: string | null;
}

export interface AccountField {
  label: string;
  cols: number;
}
