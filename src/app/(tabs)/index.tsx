import { HomeScreen } from "@/screens/home-screen";
import { useHome } from "@/screens/home-screen/use-home";
import { LoadingScreen } from "@/screens/loading-screen";

export default function Home() {
	const homeState = useHome();

	return homeState.isLoading ? <LoadingScreen /> : <HomeScreen {...homeState} />;
}
