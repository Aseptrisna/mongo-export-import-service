require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs-extra');
const path = require('path');

const targetUri = process.env.MONGO_IMPORT;

const today = new Date();
const formattedDate = today.toISOString().split('T')[0];

const inputDir = path.join(__dirname, 'backup', formattedDate);

async function importCollections() {
    try {
        console.log('Menghubungkan ke MongoDB tujuan...');
        // Koneksi ke MongoDB tujuan
        await mongoose.connect(targetUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Berhasil terhubung ke MongoDB tujuan');

        // Mendapatkan daftar file JSON di direktori input
        const files = await fs.readdir(inputDir);

        for (const file of files) {
            if (path.extname(file) === '.json') {
                const collectionName = path.basename(file, '.json');
                console.log(`Mengimpor koleksi: ${collectionName}`);
                let data = await fs.readJson(path.join(inputDir, file));
                // Hapus field _id jika ada
                data = data.map(doc => {
                    const { _id, ...rest } = doc; // Hapus _id
                    return rest; // Kembalikan dokumen tanpa _id
                });
                const collection = mongoose.connection.db.collection(collectionName);

                if (data.length > 0) {
                    // Hapus dokumen yang ada sebelum mengimpor data baru
                    await collection.deleteMany({});
                    console.log(`Semua dokumen di koleksi ${collectionName} telah dihapus`);

                    await collection.insertMany(data);
                    console.log(`Berhasil mengimpor ${data.length} dokumen ke koleksi ${collectionName}`);
                } else {
                    console.log(`Tidak ada dokumen untuk diimpor ke koleksi ${collectionName}`);
                }
            }
        }

        console.log('Semua koleksi telah diimpor.');
        await mongoose.connection.close();
        console.log('Koneksi MongoDB tujuan ditutup.');
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
        await mongoose.connection.close();
    }
}

module.exports = importCollections;
