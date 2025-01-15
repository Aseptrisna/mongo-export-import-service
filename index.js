require('dotenv').config();
const schedule = require('node-schedule');
const exportCollections = require('./export'); // Fungsi ekspor
const importCollections = require('./import'); // Fungsi impor

// Fungsi menjalankan ekspor dan impor
async function runExportAndImport() {
    // console.log(`[${new Date().toISOString()}] Menjalankan proses ekspor dan impor...`);

    // exportCollections()
    //     .then(() => {
    //         console.log('Proses ekspor selesai. Melanjutkan ke proses impor...');
    //         return exportCollections();
    //     })
    //     .then(() => {
    //         console.log(`[${new Date().toISOString()}] Proses ekspor dan impor selesai.`);
    //     })
    //     .catch(err => {
    //         console.error(`[${new Date().toISOString()}] Terjadi kesalahan:`, err);
    //     });
    console.log(`[${new Date().toISOString()}] Menjalankan proses ekspor dan impor...`);

    try {
        await exportCollections();
        console.log('Proses ekspor selesai. Melanjutkan ke proses impor...');
        await importCollections();
        console.log(`[${new Date().toISOString()}] Proses ekspor dan impor selesai.`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] Terjadi kesalahan:`, err);
    }
}

// Jadwalkan ekspor dan impor setiap 1 jam
// schedule.scheduleJob('0 * * * *', () => {
    runExportAndImport();
// });

console.log('Scheduler telah diaktifkan.');
console.log('Proses ekspor dan impor akan dijalankan setiap 1 jam.');
