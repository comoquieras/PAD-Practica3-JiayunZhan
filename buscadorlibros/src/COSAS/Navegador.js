import React, { useState, useEffect } from 'react';  
import axios from 'axios';
import Libro from './Libro';
import './Navegador.css';
import Carrusel from './Carrusel.js';

const Navegacion = () => {
  const [textTitulo, cambiarTitulo] = useState(''); 
  const [textAutor, cambiarAutor] = useState(''); 
  const [lista, cambiarLista] = useState([]);
  const [listaCategoria, cambiarListaCategoria] = useState([]);
  const [tipoCategoria, cambiarTipoCategoria] = useState('TODOS'); 
  const [ultimosAccesos, cambiarUltimosAccesos] = useState([]);
  const [startIndex, cambiarStartIndex] = useState(0); // Nuevo: índice para cargar más resultados
  const [mostrarMas, cambiarMostrarMas] = useState(false); // Nuevo: controla si mostrar el botón de cargar más

  useEffect(() => {
    const librosGuardados = JSON.parse(localStorage.getItem('listaCategoria')) || [];
    const accesosGuardados = JSON.parse(localStorage.getItem('ultimosAccesos')) || [];
    cambiarListaCategoria(librosGuardados);
    cambiarUltimosAccesos(accesosGuardados);
    cambiarLista(accesosGuardados);
  }, []);

  const guardarEnLocal = (clave, data) => {
    localStorage.setItem(clave, JSON.stringify(data));
  };

  const limpiarUltimosAccesos = () => {
    localStorage.removeItem('ultimosAccesos');
  };



  const anadirLibroCategoriaeliminar = (book, accion) => {
    let nuevaListaCategoria = [...listaCategoria];
    if (accion === 'add') {
      nuevaListaCategoria.push({ ...book, saved: true, category: book.category || '' });
    } else if (accion === 'remove') {
      nuevaListaCategoria = nuevaListaCategoria.filter(savedBook => savedBook.id !== book.id); 
    }
    cambiarListaCategoria(nuevaListaCategoria);
    guardarEnLocal('listaCategoria', nuevaListaCategoria);
  };

  const handleSearchByTitleAndAuthor = async (start = 0) => {
    if (start === 0) {
      cambiarLista([]); 
      cambiarStartIndex(0); // Reinicia el índice al buscar
    }
    const queryParts = [];
    if (textTitulo) queryParts.push(`intitle:${textTitulo}`);
    if (textAutor) queryParts.push(`inauthor:${textAutor}`);
    const query = queryParts.join('+');
    if (!query) {
      
        
    
      return; 
    }
    try {
      const resultados = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=9&startIndex=${start}`
      );
      if (resultados.data.items) {
        localStorage.removeItem('ultimosAccesos');
        cambiarLista(prevLista => [...prevLista, ...resultados.data.items]); 
        cambiarMostrarMas(resultados.data.totalItems > start + 9); 
        cambiarStartIndex(start + 9); 
      } else {
        cambiarLista([]); 
        cambiarMostrarMas(false); 
      }
    } catch (error) {
      console.error('Error al buscar libros: ', error);
      cambiarLista([]); 
    }
  };
  

  const handleSearchByCategory = () => {
    if (tipoCategoria === 'TODOS') {
      cambiarLista(listaCategoria);
    } else {
      cambiarLista(listaCategoria.filter(book => book.category === tipoCategoria));
    }
  };

  const registrarUltimoAcceso = (book) => {
    const nuevosAccesos = [book, ...ultimosAccesos.filter(a => a.id !== book.id)].slice(0, 5);
    cambiarUltimosAccesos(nuevosAccesos);
    guardarEnLocal('ultimosAccesos', nuevosAccesos);
  };

  return (
    <div>
      <h1 className = "encabezado"> Buscador de Libros </h1>
     
      <Carrusel libros={ultimosAccesos} />
     
      <div className="buscador">
        <div>
          <input
            type="text"
            placeholder="Titulo del libro"
            value={textTitulo}
            onChange={(e) => cambiarTitulo(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Autor del libro"
            value={textAutor}
            onChange={(e) => cambiarAutor(e.target.value)}
          />
        </div>

        <div>
          <button onClick={() => handleSearchByTitleAndAuthor()}>BUSCAR</button>
        </div>

        <div>
          <label>Filtrar por categoría:</label>
          <select value={tipoCategoria} onChange={(e) => cambiarTipoCategoria(e.target.value)}>
            <option value="TODOS">TODOS</option>
            <option value="Aventuras">Aventuras</option>
            <option value="Ciencia Ficción">Ciencia Ficción</option>
            <option value="Histórica">Histórica</option>
            <option value="Novela Negra">Novela Negra</option>
            <option value="Romántica">Romántica</option>
            <option value="Terror">Terror</option>
            <option value="Tecnología">Tecnología</option>
          </select>
          <button onClick={handleSearchByCategory}>FILTRAR</button>
        </div>
      </div>

      <div className="resultados">
        {lista.length === 0 && <p className="NoResultados">No se han encontrado resultados.</p>}
        {lista.map((b) => (
          <Libro
            key={b.id}
            book={b}
            onUpdateBooks={anadirLibroCategoriaeliminar}
            savedBooks={listaCategoria}
            onAccessBook={registrarUltimoAcceso}
          />
        ))}
      </div>

      {mostrarMas && (
        <div className="mostrar">
          <button onClick={() => handleSearchByTitleAndAuthor(startIndex)}>MAS</button>
        </div>
      )}
    </div>
  );
};

export default Navegacion;
