// Convierte una fecha "yyyy-mm-dd" a formato legible "dd/mm/yyyy"
function formatDate(isoDate) {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  // Antes del hotfix esto devolvía "mm/dd/yyyy" por error (formato US
  // mezclado con datos en formato ISO), causando fechas incorrectas
  // en la interfaz. El hotfix corrige el orden a dd/mm/yyyy.
  return `${day}/${month}/${year}`;
}

module.exports = { formatDate };
