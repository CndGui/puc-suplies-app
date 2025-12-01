export interface Supply {
	id: number;
	name: string;
	quantity: number;
	price: number;
	createdAt: string;
	updatedAt: string;
}

export const suppliesMock: Supply[] = [
	{
		id: 1,
		name: "Bisturi",
		quantity: 2,
		price: 100,
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
];
