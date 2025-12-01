import { render } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function renderWithProviders(component: React.JSX.Element) {
  const initialMetrics = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  return render(<SafeAreaProvider initialMetrics={initialMetrics}>{component}</SafeAreaProvider>);
}