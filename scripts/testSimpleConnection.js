// Test simple de conectividad
const http = require("http");

console.log("🔍 TEST SIMPLE DE CONECTIVIDAD");
console.log("=".repeat(40));

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "GET",
  timeout: 5000,
};

console.log("Intentando conectar a http://localhost:3000...");

const req = http.request(options, (res) => {
  console.log(`✅ ÉXITO - Status: ${res.statusCode}`);
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log(`📊 Response length: ${data.length} characters`);
    console.log(`📄 First 100 chars: ${data.substring(0, 100)}...`);
  });
});

req.on("error", (error) => {
  console.log(`❌ ERROR: ${error.message}`);
  console.log(`🔍 Error code: ${error.code}`);
  console.log(`📍 Error details:`, error);
});

req.on("timeout", () => {
  console.log(`❌ TIMEOUT`);
  req.destroy();
});

req.setTimeout(5000);
req.end();
