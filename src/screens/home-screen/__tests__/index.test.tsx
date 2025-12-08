import { renderWithProviders } from "@/utils/render-with-providers";
import { HomeScreen } from "..";

const mockHomeState = {
	supplies: [
		{
			id: 1,
			name: "Insumo A",
			quantity: 1,
			validity: new Date("2026-01-01").toISOString().split("T")[0],
			createdAt: new Date().toISOString().split("T")[0],
			updatedAt: new Date().toISOString().split("T")[0],
		},
		{
			id: 2,
			name: "Insumo B",
			quantity: 20,
			validity: new Date("2022-01-01").toISOString().split("T")[0],
			createdAt: new Date().toISOString().split("T")[0],
			updatedAt: new Date().toISOString().split("T")[0],
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

	test("deve exibir aviso de estoque baixo para o insumo com quantidade menor ou igual a 2", () => {
		const { getByText } = renderWithProviders(<HomeScreen {...mockHomeState} />);

		expect(getByText("Estoque baixo!")).toBeTruthy();
	});

	test("deve exibir aviso de validade expirada para o insumo com validade menor que a data atual", () => {
		const { getByText } = renderWithProviders(<HomeScreen {...mockHomeState} />);

		expect(getByText("Validade expirada!")).toBeTruthy();
	});
});