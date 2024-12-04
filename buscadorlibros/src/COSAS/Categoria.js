
export const saveBookToCategory = (book, category) => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    
    const bookWithCategory = { ...book, category };
    
    savedBooks.push(bookWithCategory);
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
  };
  
  export const removeBookFromCategory = (book) => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const updatedBooks = savedBooks.filter(b => b.id !== book.id); 
    localStorage.setItem('savedBooks', JSON.stringify(updatedBooks)); 
  };

  
  export const getSavedBooks = () => {
    return JSON.parse(localStorage.getItem('savedBooks')) || [];
  };
  