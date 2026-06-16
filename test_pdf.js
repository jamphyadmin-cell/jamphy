const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log("No GEMINI_API_KEY");
    return;
  }

  // Create a dummy PDF
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([500, 500]);
  page.drawText('1. What is the capital of France?\nA. London\nB. Paris\nC. Berlin\nD. Rome', {
    x: 50,
    y: 400,
    size: 20,
    color: rgb(0, 0, 0),
  });
  const pdfBytes = await pdfDoc.save();
  const base64Data = Buffer.from(pdfBytes).toString('base64');

  const res = await fetch('http://localhost:3000/api/admin/extract', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      base64Data,
      mimeType: "application/pdf",
      adminPassword: process.env.ADMIN_PASSWORD || "jamphy2024"
    })
  });
  const data = await res.json();
  console.log("Result:", data);
}

main();
