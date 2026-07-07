/**
 * exportFirestore.js
 *
 * Exports all documents from specified Firestore collections (PRODUCTION)
 * into a single JSON file, using the Firebase Admin SDK.
 *
 * Usage:
 *   node scripts/exportFirestore.js
 *
 * Requires:
 *   - firebase-admin installed (npm install firebase-admin --save-dev)
 *   - A service account key JSON downloaded from:
 *     Firebase Console > Project Settings > Service Accounts > Generate new private key
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// 👇 UPDATE THIS PATH to wherever you saved your service account key
const serviceAccount = require('E:/Project_folder/keys/serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// 👇 List every top-level collection you want to export
const COLLECTIONS_TO_EXPORT = ['category', 'AllMenus', 'users']; // add/remove as needed

async function exportCollection(collectionName) {
  const snapshot = await db.collection(collectionName).get();
  // db.collection() still works the same way on the modular Firestore instance
  const docs = {};

  snapshot.forEach((doc) => {
    docs[doc.id] = doc.data();
  });

  console.log(`✅ Exported ${snapshot.size} docs from "${collectionName}"`);
  return docs;
}

async function main() {
  const exportData = {};

  for (const collectionName of COLLECTIONS_TO_EXPORT) {
    exportData[collectionName] = await exportCollection(collectionName);
  }

  const outputPath = path.join(__dirname, 'firestore-export.json');

  // Custom replacer to handle Firestore Timestamp objects (convert to ISO string)
  const replacer = (key, value) => {
    if (value && typeof value === 'object' && value._seconds !== undefined) {
      return new Date(value._seconds * 1000).toISOString();
    }
    return value;
  };

  fs.writeFileSync(outputPath, JSON.stringify(exportData, replacer, 2));
  console.log(`\n🎉 Export complete! Saved to: ${outputPath}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Export failed:', err);
    process.exit(1);
  });