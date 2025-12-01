import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "@/components/safe-area-view";
import colors from "@/styles/colors";

export function LoadingScreen() {
	return (
		<SafeAreaView className="flex-1 items-center justify-center">
			<ActivityIndicator size="large" color={colors.primary} />
			<Text className="mt-4 text-lg">Carregando Insúmos</Text>
		</SafeAreaView>
	);
}
