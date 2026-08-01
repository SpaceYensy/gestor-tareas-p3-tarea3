function validateTask(data) {
  const errors = [];

  if (!data.title || data.title.trim().length < 3) {
    errors.push('El título debe tener al menos 3 caracteres.');
  }

  if (data.title && data.title.trim().length > 80) {
    errors.push('El título no puede superar los 80 caracteres.');
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.push('La descripción es obligatoria.');
  }

  if (!data.dueDate || isNaN(Date.parse(data.dueDate))) {
    errors.push('La fecha límite no es válida.');
  }

  if (!['pendiente', 'completada'].includes(data.status)) {
    errors.push('El estado debe ser "pendiente" o "completada".');
  }

  return errors;
}

module.exports = { validateTask };
