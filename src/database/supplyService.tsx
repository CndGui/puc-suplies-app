import { getDatabase } from "./initDatabase";
import { Supply, CreateSupplyDTO, UpdateSupplyDTO } from "@/interfaces/supply";

export class SupplyService {
  static async getAll(): Promise<Supply[]> {
    const db = await getDatabase();
    return db.getAllAsync<Supply>(
      "SELECT * FROM supplies ORDER BY createdAt DESC"
    );
  }

  static async getById(id: number): Promise<Supply | null> {
    const db = await getDatabase();
    const result = await db.getFirstAsync<Supply>(
      "SELECT * FROM supplies WHERE id = ?",
      [id]
    );
    return result || null;
  }

  static async create(data: CreateSupplyDTO): Promise<Supply> {
    const db = await getDatabase();
    const insert = await db.runAsync(
      `
      INSERT INTO supplies (name, quantity, validity, createdAt, updatedAt)
      VALUES (?, ?, ?, datetime('now'), datetime('now'))
    `,
      [data.name, data.quantity, data.validity]
    );

    const newItem = await this.getById(insert.lastInsertRowId);
    if (!newItem) throw new Error("Erro ao criar suprimento");
    return newItem;
  }

  static async update(id: number, data: UpdateSupplyDTO): Promise<Supply> {
    const db = await getDatabase();

    const fields: string[] = [];
    const values: any[] = [];

    if (data.name !== undefined) {
      fields.push("name = ?");
      values.push(data.name);
    }
    if (data.quantity !== undefined) {
      fields.push("quantity = ?");
      values.push(data.quantity);
    }
    if (data.validity !== undefined) {
      fields.push("validity = ?");
      values.push(data.validity);
    }

    fields.push("updatedAt = datetime('now')");
    values.push(id);

    await db.runAsync(
      `UPDATE supplies SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    const updated = await this.getById(id);
    if (!updated) throw new Error("Suprimento não encontrado");

    return updated;
  }

  static async delete(id: number): Promise<boolean> {
    const db = await getDatabase();
    const result = await db.runAsync(
      "DELETE FROM supplies WHERE id = ?",
      [id]
    );
    return result.changes > 0;
  }
}
