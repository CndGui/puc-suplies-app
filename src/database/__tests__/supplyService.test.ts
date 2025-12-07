import { SupplyService } from "../supplyService";
import { getDatabase } from "../initDatabase";

jest.mock("../initDatabase", () => ({
  getDatabase: jest.fn(),
}));

describe("SupplyService", () => {
  let mockDb: any;

  beforeEach(() => {
    mockDb = {
      getAllAsync: jest.fn(),
      getFirstAsync: jest.fn(),
      runAsync: jest.fn(),
    };

    (getDatabase as jest.Mock).mockResolvedValue(mockDb);
  });

  // --- GET ALL ---
  it("deve retornar todos os suprimentos", async () => {
    const fakeSupplies = [{ id: 1 }, { id: 2 }];
    mockDb.getAllAsync.mockResolvedValue(fakeSupplies);

    const result = await SupplyService.getAll();

    expect(mockDb.getAllAsync).toHaveBeenCalledWith(
      "SELECT * FROM supplies ORDER BY createdAt DESC"
    );
    expect(result).toEqual(fakeSupplies);
  });

  // --- GET BY ID ---
  it("deve retornar 1 suprimento pelo ID", async () => {
    const fakeSupply = { id: 10, name: "Álcool" };
    mockDb.getFirstAsync.mockResolvedValue(fakeSupply);

    const result = await SupplyService.getById(10);

    expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
      "SELECT * FROM supplies WHERE id = ?",
      [10]
    );
    expect(result).toEqual(fakeSupply);
  });

  it("deve retornar null se não existir suprimento", async () => {
    mockDb.getFirstAsync.mockResolvedValue(null);

    const result = await SupplyService.getById(99);
    expect(result).toBeNull();
  });

  // --- CREATE ---
  it("deve criar um suprimento", async () => {
    mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 5 });

    const fakeSupply = { id: 5, name: "Água" };
    mockDb.getFirstAsync.mockResolvedValue(fakeSupply);

    const result = await SupplyService.create({
      name: "Água",
      quantity: 10,
      validity: "2025-01-01",
    });

    expect(mockDb.runAsync).toHaveBeenCalled();
    expect(result).toEqual(fakeSupply);
  });

  it("deve lançar erro ao criar suprimento se não retornar item", async () => {
    mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 5 });
    mockDb.getFirstAsync.mockResolvedValue(null);

    await expect(
      SupplyService.create({
        name: "Água",
        quantity: 10,
        validity: "2025-01-01",
      })
    ).rejects.toThrow("Erro ao criar suprimento");
  });

  // --- UPDATE ---
  it("deve atualizar um suprimento", async () => {
    mockDb.runAsync.mockResolvedValue({ changes: 1 });

    const updatedSupply = { id: 3, name: "Sabão" };
    mockDb.getFirstAsync.mockResolvedValue(updatedSupply);

    const result = await SupplyService.update(3, { name: "Sabão" });

    expect(result).toEqual(updatedSupply);
  });

  it("deve lançar erro ao tentar atualizar suprimento inexistente", async () => {
    mockDb.getFirstAsync.mockResolvedValue(null);

    await expect(
      SupplyService.update(3, { name: "Novo" })
    ).rejects.toThrow("Suprimento não encontrado");
  });

  // --- DELETE ---
  it("deve deletar um suprimento", async () => {
    mockDb.runAsync.mockResolvedValue({ changes: 1 });

    const result = await SupplyService.delete(1);

    expect(result).toBe(true);
  });

  it("deve retornar false se nada foi deletado", async () => {
    mockDb.runAsync.mockResolvedValue({ changes: 0 });

    const result = await SupplyService.delete(1);

    expect(result).toBe(false);
  });
});
