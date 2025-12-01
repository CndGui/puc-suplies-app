import { renderWithProviders } from "@/utils/test.render-with.provider";
import { HomeScreen } from "..";
import { useHome } from "../use-home";

const mockHomeState = {
  supplies: [],
  isLoading: false,
  editModalVisible: false,
  addModalVisible: false,
  formData: { name: "", quantity: "", price: "" },
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
});
