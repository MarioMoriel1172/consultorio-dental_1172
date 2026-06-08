const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// CONEXIÓN A MONGOOSE
const MONGO_URI = "mongodb+srv://marioneta:mgmail13@consultoriodental.chbiifz.mongodb.net/?appName=consultoriodental";

mongoose.connect(MONGO_URI)
    .then(() => console.log("¡Conectado exitosamente a MongoDB para todas las colecciones!"))
    .catch(err => console.error("Error al conectar a MongoDB", err));

// ==========================================
// 1. DEFINICIÓN DE MODELOS (SCHEMAS)
// ==========================================

const Paciente = mongoose.model('Paciente', new mongoose.Schema({
    id_pacientes: String, nombre: String, edad: Number, genero: String, alergias: String,
    tipo_de_sangre: String, aseguradora: String, antecedentes: String, tel_emergencias: String, estatus: String, curp: String
}));

const Doctor = mongoose.model('Doctor', new mongoose.Schema({
    id_doctor: String, nombre: String, especialidad: String, telefono: String, correo: String,
    horario: String, consultorio: String, cedula: String, estatus: String
}));

const Consultorio = mongoose.model('Consultorio', new mongoose.Schema({
    id_consultorio: String, numero: String, tipo: String, equipamiento: String,
    encargado: String, estatus: String
}));

const Factura = mongoose.model('Factura', new mongoose.Schema({
    id_factura: String, id_paciente: String, RFC: String, concepto: String,
    monto: Number, fecha: String, metodo_pago: String, estatus: String
}));

const Expediente = mongoose.model('Expediente', new mongoose.Schema({
    id_expediente: String, id_paciente: String, diagnostico: String, tratamiento: String,
    fecha_creacion: String, observaciones: String
}));

// ==========================================
// 2. RUTAS PARA PACIENTES (Ya funcionando)
// ==========================================
app.get('/api/pacientes', async (req, res) => { res.json(await Paciente.find()); });
app.post('/api/pacientes', async (req, res) => {
    const total = await Paciente.countDocuments();
    const nuevoId = "P" + String(10 + total + 1).padStart(3, '0');
    const nuevo = new Paciente({ ...req.body, id_pacientes: nuevoId });
    await nuevo.save();
    res.json({ mensaje: "Paciente guardado correctamente", registro: nuevo });
});
app.put('/api/pacientes/:id', async (req, res) => { res.json({ mensaje: "Actualizado", registro: await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true }) }); });
app.delete('/api/pacientes/:id', async (req, res) => { await Paciente.findByIdAndDelete(req.params.id); res.json({ mensaje: "Eliminado correctamente" }); });

// ==========================================
// 3. RUTAS PARA DOCTORES (Autoincrement desde D011)
// ==========================================
app.get('/api/doctores', async (req, res) => { res.json(await Doctor.find()); });
app.post('/api/doctores', async (req, res) => {
    const total = await Doctor.countDocuments();
    const nuevoId = "D" + String(10 + total + 1).padStart(3, '0'); // Inicia en D011 si tienes 10 manuales
    const nuevo = new Doctor({ ...req.body, id_doctor: nuevoId });
    await nuevo.save();
    res.json({ mensaje: "Doctor guardado correctamente", registro: nuevo });
});
app.put('/api/doctores/:id', async (req, res) => { res.json({ mensaje: "Actualizado", registro: await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true }) }); });
app.delete('/api/doctores/:id', async (req, res) => { await Doctor.findByIdAndDelete(req.params.id); res.json({ mensaje: "Eliminado correctamente" }); });

// ==========================================
// 4. RUTAS PARA CONSULTORIOS (Autoincrement desde C011)
// ==========================================
app.get('/api/consultorios', async (req, res) => { res.json(await Consultorio.find()); });
app.post('/api/consultorios', async (req, res) => {
    const total = await Consultorio.countDocuments();
    const nuevoId = "C" + String(10 + total + 1).padStart(3, '0');
    const nuevo = new Consultorio({ ...req.body, id_consultorio: nuevoId });
    await nuevo.save();
    res.json({ mensaje: "Consultorio guardado correctamente", registro: nuevo });
});
app.put('/api/consultorios/:id', async (req, res) => { res.json({ mensaje: "Actualizado", registro: await Consultorio.findByIdAndUpdate(req.params.id, req.body, { new: true }) }); });
app.delete('/api/consultorios/:id', async (req, res) => { await Consultorio.findByIdAndDelete(req.params.id); res.json({ mensaje: "Eliminado correctamente" }); });

// ==========================================
// 5. RUTAS PARA FACTURAS (Autoincrement desde F011)
// ==========================================
app.get('/api/facturas', async (req, res) => { res.json(await Factura.find()); });
app.post('/api/facturas', async (req, res) => {
    const total = await Factura.countDocuments();
    const nuevoId = "F" + String(10 + total + 1).padStart(3, '0');
    const nuevo = new Factura({ ...req.body, id_factura: nuevoId });
    await nuevo.save();
    res.json({ mensaje: "Factura guardada correctamente", registro: nuevo });
});
app.put('/api/facturas/:id', async (req, res) => { res.json({ mensaje: "Actualizado", registro: await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true }) }); });
app.delete('/api/facturas/:id', async (req, res) => { await Factura.findByIdAndDelete(req.params.id); res.json({ mensaje: "Eliminado correctamente" }); });

// ==========================================
// 6. RUTAS PARA EXPEDIENTES (Autoincrement desde E011)
// ==========================================
app.get('/api/expedientes', async (req, res) => { res.json(await Expediente.find()); });
app.post('/api/expedientes', async (req, res) => {
    const total = await Expediente.countDocuments();
    const nuevoId = "E" + String(10 + total + 1).padStart(3, '0');
    const nuevo = new Expediente({ ...req.body, id_expediente: nuevoId });
    await nuevo.save();
    res.json({ mensaje: "Expediente guardado correctamente", registro: nuevo });
});
app.put('/api/expedientes/:id', async (req, res) => { res.json({ mensaje: "Actualizado", registro: await Expediente.findByIdAndUpdate(req.params.id, req.body, { new: true }) }); });
app.delete('/api/expedientes/:id', async (req, res) => { await Expediente.findByIdAndDelete(req.params.id); res.json({ mensaje: "Eliminado correctamente" }); });


const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor de Mario Dentals corriendo en http://localhost:${PORT}`));