export interface Supply {
  id: number;
  name: string;
  quantity: number;
  validity: string;    // ISO date
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupplyDTO {
  name: string;
  quantity: number;
  validity: string;
}

export interface UpdateSupplyDTO {
  name?: string;
  quantity?: number;
  validity?: string;
}
