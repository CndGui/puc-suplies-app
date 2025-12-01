import { renderWithProviders } from "@/utils/render-with-providers";
import { HomeScreen } from "..";

const mockHomeState = {
	supplies: [
		{
			id: 1,
			name: "Insumo A",
			quantity: 1,
			validity: new Date().toISOString(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			id: 2,
			name: "Insumo B",
			quantity: 20,
			validity: new Date().toISOString(),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
	],
	isLoading: false,
	editModalVisible: false,
	addModalVisible: false,
	formData: { name: "", quantity: "", validity: "" },
	setFormData: jest.fn(),
	handleEdit: jest.fn(),
	handleSaveEdit: jest.fn(),
	handleCloseEditModal: jest.fn(),
	handleOpenAddModal: jest.fn(),
	handleSaveAdd: jest.fn(),
	handleCloseAddModal: jest.fn(),
	handleRemove: jest.fn(),
};

describe("Home Screen", () => {
	test("deve renderizar o nome do aplicativo Supplies", () => {
		const { getByText } = renderWithProviders(<HomeScreen {...mockHomeState} />);

		expect(getByText("Supplies")).toBeTruthy();
	});

	test("deve renderizar o titulo da tela de insumos", () => {
		const { getByText } = renderWithProviders(<HomeScreen {...mockHomeState} />);

		expect(getByText("Insúmos Disponíveis")).toBeTruthy();
	});

	test("deve renderizar o botão de adicionar insumo", () => {
		const { getByText } = renderWithProviders(<HomeScreen {...mockHomeState} />);

		expect(getByText("Adicionar")).toBeTruthy();
	});

	test("deve renderizar os dois insumos na lista", () => {
		const { getByTestId } = renderWithProviders(<HomeScreen {...mockHomeState} />);

		const supplyItemA = getByTestId("supply-item-1");
		const supplyItemB = getByTestId("supply-item-2");

		expect(supplyItemA).toBeTruthy();
		expect(supplyItemB).toBeTruthy();
	});
});
