import React, { useState } from 'react';
import './Carrusel.css';

const Carrusel = ({ libros }) => {
  const [startIndex, setStartIndex] = useState(0);
  const librosPorVista = 3;

  const librosEnPantalla = libros.slice(startIndex, startIndex + librosPorVista);
  const botonAnteriorHabilitado = startIndex > 0;
  const botonSiguienteHabilitado = startIndex + librosPorVista < libros.length;

  const handleNext = () => {
    if (botonSiguienteHabilitado) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (botonAnteriorHabilitado) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (!libros || libros.length === 0) {
    return <p>No hay libros disponibles para mostrar en el carrusel.</p>;
  }

  return (
    <div className="carrusel">
      <button
        onClick={handlePrevious}
        className={`carrusel-boton ${!botonAnteriorHabilitado ? 'deshabilitado' : ''}`}
        disabled={!botonAnteriorHabilitado}
      >
        &lt;
      </button>

      <div className="carrusel-vista">
        {librosEnPantalla.map((libro, index) => (
          <div key={index} className="carrusel-item">
            <img
              src={libro.volumeInfo?.imageLinks?.thumbnail || 'placeholder.png'}
              alt={libro.volumeInfo?.title || 'Sin título'}
              className="carrusel-imagen"
            />
            <h3 className="carrusel-titulo">
              <a
                href={libro.volumeInfo?.infoLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="carrusel-enlace"
              >
                {libro.volumeInfo?.title || 'Título no disponible'}
              </a>
            </h3>
            <p className="carrusel-fecha">
              {libro.volumeInfo?.publishedDate || 'Fecha no disponible'}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        className={`carrusel-boton ${!botonSiguienteHabilitado ? 'deshabilitado' : ''}`}
        disabled={!botonSiguienteHabilitado}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carrusel;
