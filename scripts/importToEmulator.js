/**
 * importToEmulator.js
 *
 * Reads firestore-export.json and writes every document into the
 * LOCAL Firestore EMULATOR, using the Firebase Admin SDK.
 *
 * IMPORTANT: Make sure the Firestore emulator is already running
 * (firebase emulators:start) before running this script.
 *
 * Usage:
 *   node scripts/importToEmulator.js
 */

const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// 👇 This env var tells the Admin SDK to talk to the LOCAL EMULATOR
// instead of production. Must match the port in your firebase.json.
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

initializeApp({
  projectId: 'billing-demo-aee4a', // must match your real project ID
});

const db = getFirestore();

async function importCollection(collectionName, docs) {
  const entries = Object.entries(docs);
  let count = 0;

  for (const [docId, data] of entries) {
    await db.collection(collectionName).doc(docId).set(data);
    count++;
  }

  console.log(`✅ Imported ${count} docs into "${collectionName}" (emulator)`);
}

async function main() {
  const inputPath = path.join(__dirname, 'firestore-export.json');

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Export file not found at ${inputPath}. Run exportFirestore.js first.`);
  }

  const exportData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

  for (const [collectionName, docs] of Object.entries(exportData)) {
    await importCollection(collectionName, docs);
  }

  console.log('\n🎉 Import complete! Check http://localhost:4000/firestore to verify.');
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Import failed:', err);
    process.exit(1);
  });