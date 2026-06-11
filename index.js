const express = require("express");

const app = express();
const PORT = 3000;

// Permite recibir datos JSON
app.use(express.json());

// Array de estudiantes (datos quemados)
let estudiantes = [
  {
    id: 1,
    nombre: "Ana",
    carrera: "Desarrollo Web"
  },
  {
    id: 2,
    nombre: "Carlos",
    carrera: "Diseño UX"
  }
];

// GET - Obtener todos los estudiantes
app.get("/estudiantes", (req, res) => {
  res.status(200).json(estudiantes);
});

// GET - Obtener estudiante por ID
app.get("/estudiantes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const estudiante = estudiantes.find(e => e.id === id);

  if (!estudiante) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado"
    });
  }

  res.status(200).json(estudiante);
});

// POST - Agregar estudiante
app.post("/estudiantes", (req, res) => {
  const { nombre, carrera } = req.body;

  const nuevoEstudiante = {
    id: estudiantes.length + 1,
    nombre,
    carrera
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json({
    mensaje: "Estudiante agregado correctamente",
    estudiante: nuevoEstudiante
  });
});

// PUT - Actualizar estudiante
app.put("/estudiantes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, carrera } = req.body;

  const estudiante = estudiantes.find(e => e.id === id);

  if (!estudiante) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado"
    });
  }

  estudiante.nombre = nombre;
  estudiante.carrera = carrera;

  res.status(200).json({
    mensaje: "Estudiante actualizado correctamente",
    estudiante
  });
});

// DELETE - Eliminar estudiante
app.delete("/estudiantes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const indice = estudiantes.findIndex(e => e.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado"
    });
  }

  estudiantes.splice(indice, 1);

  res.status(200).json({
    mensaje: "Estudiante eliminado correctamente"
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});