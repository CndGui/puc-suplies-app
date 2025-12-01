import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { type Supply, suppliesMock } from "@/supplies-mock";

function fetchSupplies(): Promise<Supply[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(suppliesMock);
		}, 2000);
	});
}

export function useHome() {
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
			"Remover Insúmo",
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

	return {
		supplies,
		isLoading,
		editModalVisible,
		addModalVisible,
		formData,
		setFormData,
		handleEdit,
		handleSaveEdit,
		handleCloseEditModal,
		handleOpenAddModal,
		handleSaveAdd,
		handleCloseAddModal,
		handleRemove,
	};
}
