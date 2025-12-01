import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "@/components/safe-area-view";
import { SupplyItem } from "@/components/supply-item";
import { SupplyModal } from "@/components/supply-modal";
import type { useHome } from "./use-home";

const icon = require("../../assets/images/icon.png");

export function HomeScreen(props: ReturnType<typeof useHome>) {
	const {
		supplies,
		isLoading,
		editModalVisible,
		addModalVisible,
		formData,
		handleEdit,
		handleSaveEdit,
		handleCloseEditModal,
		handleOpenAddModal,
		handleSaveAdd,
		handleCloseAddModal,
		handleRemove,
		setFormData,
	} = props;

	return (
		<SafeAreaView className="flex-1 gap-4 px-4">
			<View className="flex flex-row items-center justify-center gap-2">
				<Image source={icon} className="h-6 w-6" />
				<Text className="font-semibold text-lg">Supplies</Text>
			</View>

			<View className="flex flex-row">
				<Text className="font-semibold text-2xl">Insúmos Disponíveis</Text>
				<Pressable
					className="ml-auto flex-row items-center gap-2 rounded-full bg-primary px-3 py-1"
					onPress={handleOpenAddModal}
				>
					<FontAwesome name="plus" size={12} color="white" />
					<Text className="text-white">Adicionar</Text>
				</Pressable>
			</View>

			<FlatList
				data={supplies}
				keyExtractor={(item) => item.id.toString()}
				showsVerticalScrollIndicator={false}
				renderItem={({ item }) => (
					<SupplyItem item={item} onEdit={handleEdit} onRemove={handleRemove} />
				)}
			/>

			<SupplyModal
				visible={editModalVisible}
				title="Editar Insúmo"
				formData={formData}
				onChangeFormData={setFormData}
				onSave={handleSaveEdit}
				onClose={handleCloseEditModal}
			/>

			<SupplyModal
				visible={addModalVisible}
				title="Adicionar Insúmo"
				formData={formData}
				onChangeFormData={setFormData}
				onSave={handleSaveAdd}
				onClose={handleCloseAddModal}
			/>
		</SafeAreaView>
	);
}
