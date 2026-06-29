const app = require('./app');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` 📜 SCRIPTORIUM API ENGINE ACTIVE v1.0`);
  console.log(` ⚡ OT: http://localhost:${PORT}/api/ot`);
  console.log(` ⚡ NT: http://localhost:${PORT}/api/nt`);
  console.log(` ⚡ Ethiopian: http://localhost:${PORT}/api/ethiopian`);
  console.log(`======================================================\n`);
});
