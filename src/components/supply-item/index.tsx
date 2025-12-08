import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";
import type { Supply } from "@/supplies-mock";
import { isoToDate } from "@/utils/date";

interface SupplyItemProps {
	item: Supply;
	onEdit: (item: Supply) => void;
	onRemove: (item: Supply) => void;
}

export function SupplyItem({ item, onEdit, onRemove }: SupplyItemProps) {
	const isLowStock = item.quantity <= 2;
	const isExpired = new Date(item.validity) < new Date();

	return (
		<View
			className={twMerge(
				"mb-4 rounded-lg border border-gray-300 bg-white p-4 shadow",
				isLowStock || isExpired ? "border-red-500 bg-red-100" : "",
			)}
			testID={`supply-item-${item.id}`}
		>
			<View className="flex flex-row items-center">
				<Text className="text-xl">{item.name}</Text>
				<Text className="ml-auto">{item.quantity} unidades</Text>
			</View>

			<View>
				<Text className="mt-2 ml-auto text-text-secondary">Validade:</Text>
				<Text className="-mt-1 ml-auto text-text-secondary">{isoToDate(item.validity)}</Text>
			</View>

			<View className="mt-4 flex flex-row items-center justify-center gap-6">
				<TouchableOpacity
					className="flex-row items-center gap-2 px-3 py-1"
					onPress={() => onEdit(item)}
				>
					<MaterialCommunityIcons name="pencil" size={14} color="black" />
					<Text>Editar</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="flex-row items-center gap-2 px-3 py-1"
					onPress={() => onRemove(item)}
				>
					<MaterialCommunityIcons name="delete" size={14} color="black" />
					<Text>Remover</Text>
				</TouchableOpacity>
			</View>

			<View className="flex flex-col items-center justify-center">
				{isLowStock && (
					<Text className="mt-2 font-semibold text-red-600 text-sm">Estoque baixo!</Text>
				)}
				{isExpired && (
					<Text className="mt-2 font-semibold text-red-600 text-sm">Validade expirada!</Text>
				)}
			</View>
		</View>
	);
}
