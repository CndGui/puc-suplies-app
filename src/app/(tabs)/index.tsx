import { LoadingScreen } from "@/components/loading-screen";
import { HomeScreen } from "@/screens/home-screen";
import { useHome } from "@/screens/home-screen/use-home";

export default function Home() {
	const homeState = useHome();

	return homeState.isLoading ? <LoadingScreen /> : <HomeScreen {...homeState} />;
}
