export interface Service extends ServiceCreate {
  id: number;
}

export interface FilterServices {
  search: string;
}

export interface ServiceCreate {
  name: string;
  description: string;
  price: number;
  available: boolean;
}

export interface ServiceUpdate extends ServiceCreate {}
