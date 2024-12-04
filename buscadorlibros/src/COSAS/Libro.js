import React, { useState } from 'react';
import './Libro.css';

const Libro = ({ book, onUpdateBooks, savedBooks, onAccessBook }) => {
  const [category, setCategory] = useState(book.category || '');

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSaveOrRemove = () => {
    if (isBookSaved()) {
      onUpdateBooks(book, 'remove');
    } else {
      onUpdateBooks({ ...book, category }, 'add');
    }
  };

  const isBookSaved = () => {
    return savedBooks.some(savedBook => savedBook.id === book.id);
  };

  const titulo = book.volumeInfo?.title || 'Título no disponible';
  const autor = book.volumeInfo?.authors ? book.volumeInfo.authors.join(', ') : 'Autor no disponible';
  const fecha = book.volumeInfo?.publishedDate || 'Fecha de publicación no disponible';
  const desc = book.volumeInfo?.description || '';
  const infoLink = book.volumeInfo?.infoLink || '#';
  const imagen = book.volumeInfo?.imageLinks?.thumbnail || ''; // Portada del libro

  // Truncar descripción a 555 caracteres
  const truncatedDescription = desc.length > 555 ? desc.substring(0, 555) + '...' : desc;

  const handleAccessBook = () => {
    onAccessBook(book); // Registrar acceso completo
    window.open(infoLink, '_blank');
  };

  return (
    <div className="libro">
      {/* Portada del libro */}
      {imagen && <img src={imagen} alt={`Portada de ${titulo}`} className="libro-portada" />}

      {/* Información del libro (contenedor desplazable) */}
      <div className="libro-contenido">
        <h2 onClick={handleAccessBook} className="titulo-libro">{titulo}</h2>
        <p className="autor-libro"><strong>Autor:</strong> {autor}</p>
        <p className="fecha-libro"><strong>Fecha de publicación:</strong> {fecha}</p>
        <p className="descripcion-libro">{truncatedDescription}</p>
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
