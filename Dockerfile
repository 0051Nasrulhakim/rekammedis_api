# Gunakan image Node.js terbaru
FROM node:latest

# Salin package.json dan package-lock.json terlebih dahulu
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin semua file ke dalam container
COPY . .

# Tentukan port yang digunakan
EXPOSE 7777

# Jalankan aplikasi (karena app.js ada di dalam src/)
CMD ["node", "server.js"]
