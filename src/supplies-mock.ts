export interface Supply {
	id: number;
	name: string;
	quantity: number;
	validity: string;
	createdAt: string;
	updatedAt: string;
}

export const suppliesMock: Supply[] = [
	{
		id: 1,
		name: "Bisturi",
		quantity: 2,
		validity: "2024-01-01T00:00:00Z",
		createdAt: "2024-01-01T00:00:00Z",
		updatedAt: "2024-01-01T00:00:00Z",
	},
];
