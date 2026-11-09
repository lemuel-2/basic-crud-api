import db from "../config/database.js";

class ProductRepository {
  constructor(database = db) {
    this.db = database;
  }

  create(product) {
    const query = this.db.prepare(`
        INSERT INTO products (name, price, stock ) VALUES (?, ?, ?)    
      `);

    const result = query.run(product.name, product.price, product.stock);

    return this.findById(result.lastInsertRowid);
  }

  findAll() {
    const query = this.db.prepare(`
      SELECT * FROM products ORDER BY id DESC
    `);

    return query.all();
  }

  findById(id) {
    const query = this.db.prepare(`
      SELECT * FROM products WHERE id = ?
    `);

    return query.get(id);
  }

  update(id, product) {
    const query = this.db.prepare(`
      UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?
    `);

    const result = query.run(product.name, product.price, product.stock, id);

    if (result.changes === 0) return null;
    return this.findById(id);
  }

  delete(id) {
    const query = this.db.prepare(`
      DELETE FROM products WHERE id = ?  
    `);

    const result = query.run(id);
    return result.changes > 0;
  }
}

export default ProductRepository;
