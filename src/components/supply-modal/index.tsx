import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

interface SupplyModalProps {
	visible: boolean;
	title: string;
	formData: {
		name: string;
		quantity: string;
		price: string;
	};
	onChangeFormData: (data: { name: string; quantity: string; price: string }) => void;
	onSave: () => void;
	onClose: () => void;
}

export function SupplyModal({
  visible,
  title,
  formData,
  onChangeFormData,
  onSave,
  onClose,
}: SupplyModalProps) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-11/12 max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-semibold text-xl">{title}</Text>
            <Pressable onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="black" />
            </Pressable>
          </View>

          <View className="gap-4">
            <View>
              <Text className="mb-2 font-medium text-gray-700">Nome</Text>
              <TextInput
                className="rounded-lg border border-gray-300 px-4 py-3"
                value={formData.name}
                onChangeText={(text) => onChangeFormData({ ...formData, name: text })}
                placeholder="Nome do suprimento"
              />
            </View>

            <View>
              <Text className="mb-2 font-medium text-gray-700">Quantidade</Text>
              <TextInput
                className="rounded-lg border border-gray-300 px-4 py-3"
                value={formData.quantity}
                onChangeText={(text) => onChangeFormData({ ...formData, quantity: text })}
                placeholder="Quantidade"
                keyboardType="numeric"
              />
            </View>

            <View>
              <Text className="mb-2 font-medium text-gray-700">Preço</Text>
              <TextInput
                className="rounded-lg border border-gray-300 px-4 py-3"
                value={formData.price}
                onChangeText={(text) => onChangeFormData({ ...formData, price: text })}
                placeholder="Preço"
                keyboardType="decimal-pad"
              />
            </View>

            <View className="mt-4 flex-row gap-3">
              <Pressable
                className="flex-1 items-center rounded-lg bg-primary py-3"
                onPress={onSave}
              >
                <Text className="font-semibold text-white">Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}