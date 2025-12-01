import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Image,
	Pressable,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "@/components/safe-area-view";
import { SupplyItem } from "@/components/supply-item";
import { SupplyModal } from "@/components/supply-modal";
import colors from "@/styles/colors";
import { type Supply, suppliesMock } from "@/supplies-mock";

const icon = require("../../assets/images/icon.png");

export default function Index() {
	const [supplies, setSupplies] = useState<Supply[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const [addModalVisible, setAddModalVisible] = useState(false);
	const [editingItem, setEditingItem] = useState<Supply | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		quantity: "",
		price: "",
	});

	useEffect(() => {
		fetchSupplies().then((data) => {
			setSupplies(data);
			setIsLoading(false);
		});
	}, []);

	const handleEdit = (item: Supply) => {
		setEditingItem(item);
		setFormData({
			name: item.name,
			quantity: item.quantity.toString(),
			price: item.price.toString(),
		});
		setEditModalVisible(true);
	};

	const handleSaveEdit = () => {
		if (!editingItem) return;

		setSupplies((prev) =>
			prev.map((supply) =>
				supply.id === editingItem.id
					? {
							...supply,
							name: formData.name,
							quantity: Number.parseInt(formData.quantity, 10),
							price: Number.parseFloat(formData.price),
						}
					: supply,
			),
		);

		setEditModalVisible(false);
		Alert.alert("Sucesso", `${formData.name} foi editado com sucesso`);
	};

	const handleCloseEditModal = () => {
		setEditModalVisible(false);
		setEditingItem(null);
		setFormData({ name: "", quantity: "", price: "" });
	};

	const handleOpenAddModal = () => {
		setFormData({ name: "", quantity: "", price: "" });
		setAddModalVisible(true);
	};

	const handleSaveAdd = () => {
		const newSupply: Supply = {
			id: Math.max(...supplies.map((s) => s.id)) + 1,
			name: formData.name,
			quantity: Number.parseInt(formData.quantity, 10),
			price: Number.parseFloat(formData.price),
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		setSupplies((prev) => [...prev, newSupply]);
		setAddModalVisible(false);
		Alert.alert("Sucesso", `${formData.name} foi adicionado com sucesso`);
		setFormData({ name: "", quantity: "", price: "" });
	};

	const handleCloseAddModal = () => {
		setAddModalVisible(false);
		setFormData({ name: "", quantity: "", price: "" });
	};

	const handleRemove = (item: Supply) => {
		Alert.alert(
			"Remover Suprimento",
			`Tem certeza que deseja remover ${item.name}?`,
			[
				{
					text: "Cancelar",
					style: "cancel",
				},
				{
					text: "Remover",
					style: "destructive",
					onPress: () => {
						setSupplies((prev) => prev.filter((supply) => supply.id !== item.id));
						Alert.alert("Sucesso", `${item.name} foi removido com sucesso`);
					},
				},
			],
			{ cancelable: true },
		);
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

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
				title="Editar Suprimento"
				formData={formData}
				onChangeFormData={setFormData}
				onSave={handleSaveEdit}
				onClose={handleCloseEditModal}
			/>

			<SupplyModal
				visible={addModalVisible}
				title="Adicionar Suprimento"
				formData={formData}
				onChangeFormData={setFormData}
				onSave={handleSaveAdd}
				onClose={handleCloseAddModal}
			/>
		</SafeAreaView>
	);
}

function fetchSupplies(): Promise<Supply[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(suppliesMock);
		}, 2000);
	});
}

function LoadingScreen() {
	return (
		<SafeAreaView className="flex-1 items-center justify-center">
			<ActivityIndicator size="large" color={colors.primary} />
			<Text className="mt-4 text-lg">Carregando Suprimentos</Text>
		</SafeAreaView>
	);
}
