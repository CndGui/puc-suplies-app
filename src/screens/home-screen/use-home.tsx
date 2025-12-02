import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Supply } from "@/interfaces/supply";
import { SupplyService } from "@/database/supplyService";
import { dateToIso, isoToDate } from "@/utils/date";

export function useHome() {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Supply | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    validity: "",
  });

  // 🔥 Carrega dados reais do SQLite
  useEffect(() => {
    loadSupplies();
  }, []);

  async function loadSupplies() {
    try {
      setIsLoading(true);
      const data = await SupplyService.getAll();
      setSupplies(data);
    } catch (err) {
      console.log("Erro ao carregar supplies:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // 📝 Editar item
  const handleEdit = (item: Supply) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      quantity: item.quantity.toString(),
      validity: isoToDate(item.validity),
    });
    setEditModalVisible(true);
  };

  // 💾 Salvar edição
  const handleSaveEdit = async () => {
    if (!editingItem) return;

    await SupplyService.update(editingItem.id, {
      name: formData.name,
      quantity: Number(formData.quantity),
      validity: dateToIso(formData.validity),
    });

    await loadSupplies();
    setEditModalVisible(false);

    Alert.alert("Sucesso", `${formData.name} foi atualizado!`);
  };

  const handleCloseEditModal = () => {
    setEditModalVisible(false);
    setEditingItem(null);
    setFormData({ name: "", quantity: "", validity: "" });
  };

  // ➕ Abrir modal de adicionar
  const handleOpenAddModal = () => {
    setFormData({ name: "", quantity: "", validity: "" });
    setAddModalVisible(true);
  };

  // 💾 Criar novo item
  const handleSaveAdd = async () => {
    await SupplyService.create({
      name: formData.name,
      quantity: Number(formData.quantity),
      validity: dateToIso(formData.validity),
    });

    await loadSupplies();
    setAddModalVisible(false);

    Alert.alert("Sucesso", `${formData.name} foi adicionado!`);
  };

  const handleCloseAddModal = () => {
    setAddModalVisible(false);
    setFormData({ name: "", quantity: "", validity: "" });
  };

  // 🗑 Remover item
  const handleRemove = (item: Supply) => {
    Alert.alert(
      "Remover Insumo",
      `Deseja realmente remover ${item.name}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            await SupplyService.delete(item.id);
            await loadSupplies();
            Alert.alert("Sucesso", `${item.name} foi removido!`);
          },
        },
      ]
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