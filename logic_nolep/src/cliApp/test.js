// import * as fs from "node:fs/promises";

// import { fileURLToPath } from "node:url";
// import path from "node:path";

// const __DIRNAME = path.dirname(fileURLToPath(import.meta.url));
// const DB_PATH = path.join(__DIRNAME, "model", "users.json");
// const SESSION_PATH = path.join(__DIRNAME, "model", "session.json");

// async function saveSession(data) {
//   try {
//     const session = await fs.access(SESSION_PATH);
//     if (!session) {
//       console.error("TIDAK BOLEH LOGIN BERSAMAAN");
//     }
//   } catch (err) {
//     if (err.code === "ENOENT") {
//       await fs.writeFile(SESSION_PATH, JSON.stringify(data, null, 2));
//       console.log("BERHASIL SAVE SESSION");
//     } else {
//       console.error(err);
//     }
//   }
// }

// await saveSession([]);

// const products = [
//   { name: "Laptop", price: 75000 },
//   { name: "Mouse", price: 25000 },
//   { name: "Keyboard", price: 40000 },
//   { name: "Monitor", price: 120000 },
//   { name: "Headphones", price: 30000 },
// ];

// const filteredAndSortedProducts = products
//   // Filter produk dengan harga di bawah 50000
//   .filter((product) => product.price < 50000)
//   // Urutkan produk yang tersisa berdasarkan nama secara alfabetis
//   .sort((a, b) => a.name.localeCompare(b.name));

// console.log(filteredAndSortedProducts);

// const sortedProductPrices = products
//   .map((e) => ({ price: e.price }))
//   .sort((a, b) => a.price - b.price);

// console.log(sortedProductPrices);

console.log(Math.round(Math.random() * 100));
