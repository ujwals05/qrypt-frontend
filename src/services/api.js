import { scanResults, scanHistory } from '../mock/scanResults';

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const simulateDelay = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));

export const scanQRImage = async (imageFile) => {
  console.log("API CALL: POST /scan (Image Upload)", imageFile.name);
  await simulateDelay(3000);
  return scanResults;
};

export const scanWithCamera = async () => {
  console.log("API CALL: POST /scan (Camera Feed)");
  await simulateDelay(3241);
  return scanResults;
};

export const getScanHistory = async () => {
  console.log("API CALL: GET /history");
  await simulateDelay(1000);
  return scanHistory;
};

export const getScanById = async (scanId) => {
  console.log(`API CALL: GET /scan/${scanId}`);
  await simulateDelay(1500);
  // Return mock result if ID matches, otherwise first entry for demo
  return scanResults.scan_id === scanId ? scanResults : scanResults;
};
