import type React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaViewProps extends Omit<React.ComponentProps<typeof View>, "children" | "style"> {
	children?: React.ReactNode;
}

export function SafeAreaView({ children, ...props }: SafeAreaViewProps) {
	const { top, bottom } = useSafeAreaInsets();

	return (
		<View style={{ paddingTop: top, paddingBottom: bottom }} {...props}>
			{children}
		</View>
	);
}
