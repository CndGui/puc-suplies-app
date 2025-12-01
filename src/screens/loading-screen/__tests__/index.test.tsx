import { renderWithProviders } from "@/utils/render-with-providers";
import { LoadingScreen } from "..";

test("componente renderizado corretamente", () => {
	const { getByText } = renderWithProviders(<LoadingScreen />);

	expect(getByText("Carregando Insúmos")).toBeTruthy();
});
