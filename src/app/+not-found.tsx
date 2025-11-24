import { Link, Stack } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "@/components/safe-area-view";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />
			<SafeAreaView className="flex-1 items-center justify-center">
				<Text className="text-3xl">Está pagina não existe!</Text>

				<Link href="/" className="mt-4 rounded-lg bg-blue-500 px-4 py-2">
					<Text className="text-white">Voltar</Text>
				</Link>
			</SafeAreaView>
		</>
	);
}
