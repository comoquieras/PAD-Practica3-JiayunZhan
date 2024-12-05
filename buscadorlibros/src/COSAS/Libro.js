import React, { useState } from 'react';
import './Libro.css';

const Libro = ({ book: b, onUpdateBooks, savedBooks, onAccessBook }) => {
  const [category, setCategory] = useState(b.category || '');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSaveOrRemove = () => {
    if (isBookSaved()) {
      onUpdateBooks(b, 'remove');
    } else {
      onUpdateBooks({ ...b, category }, 'add');
    }
  };

  const isBookSaved = () => {
    return savedBooks.some(savedBook => savedBook.id === b.id);
  };

  const titulo = b.volumeInfo?.title || 'Título no disponible';
  const autor = b.volumeInfo?.authors ? b.volumeInfo.authors.join(', ') : 'Autor no disponible';
  const fecha = b.volumeInfo?.publishedDate || 'Fecha de publicación no disponible';
  const desc = b.volumeInfo?.description || '';
  const infoLink = b.volumeInfo?.infoLink || '#';
  const imagen = b.volumeInfo?.imageLinks?.thumbnail || ''; // Portada del libro

 const truncatedDescription = desc.length > 555 ? desc.substring(0, 555) + '...' : desc;

  const handleAccessBook = () => {
    onAccessBook(b); 
    window.open(infoLink, '_blank');
  };

  return (
    <div className="libro">
      
     
      <div className="libro-contenido">
        {imagen && <img src={imagen} alt={`Portada de ${titulo}`} className="libro-portada" />}

        <h2 onClick={handleAccessBook} className="titulo-libro">{titulo}</h2>
        <p className="autor-libro"><strong>Autor:</strong> {autor}</p>
        <p className="fecha-libro"><strong>Fecha de publicación:</strong> {fecha}</p>
        <p className="descripcion-libro">{ desc}</p>
      </div>

      {/* Selección de categoría */}
      <select value={category} onChange={handleCategoryChange} className="select-categoria">
        <option value="">Seleccionar categoría</option>
        <option value="Aventuras">Aventuras</option>
        <option value="Ciencia Ficción">Ciencia Ficción</option>
        <option value="Histórica">Histórica</option>
        <option value="Novela Negra">Novela Negra</option>
        <option value="Romántica">Romántica</option>
        <option value="Terror">Terror</option>
        <option value="Tecnología">Tecnología</option>
      </select>

      {/* Botón de añadir/eliminar */}
      <button onClick={handleSaveOrRemove} className="boton-accion">
        {isBookSaved() ? 'Eliminar de la lista' : 'Añadir a la lista'}
      </button>
    </div>
  );
};

export default Libro;
