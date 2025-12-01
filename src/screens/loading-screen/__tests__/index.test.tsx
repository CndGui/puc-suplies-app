import { renderWithProviders } from "@/utils/test.render-with.provider";
import { LoadingScreen } from "..";

test("componente renderizado corretamente", () => {
	const { getByText } = renderWithProviders(<LoadingScreen />);

	expect(getByText("Carregando Insúmos")).toBeTruthy();
});
