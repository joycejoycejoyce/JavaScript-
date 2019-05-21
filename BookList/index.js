function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){
    this.selectors = {
        list: '#book-form',
        listTitle: '#book-form-title',
        listAuthor : `#book-form-author`,
        listISBN : '#book-form-isbn',
        table: '#book-table',
    }
}
UI.prototype.addBookToList = function(book){
    const table = document.querySelector(this.selectors.table);
    const newEl = document.createElement('tr');
    newEl.innerHTML = `
        <th>${book.title}</th>
        <th>${book.author}</th>
        <th> ${book.isbn} </th>
    `;
    table.appendChild(newEl);
}

UI.prototype.clearFields = function(){
    document.querySelector(this.selectors.listTitle).value = ``;
    document.querySelector(this.selectors.listAuthor).value = ``;
    document.querySelector(this.selectors.listISBN).value = ``;
}

document.getElementById('book-form').addEventListener('submit', submitForm);
function submitForm(e){
    const title = document.getElementById('book-form-title').value;
    const author = document.getElementById('book-form-author').value;
    const isbn = document.getElementById('book-form-isbn').value;
    const newBook = new Book(title, author, isbn);
    const ui = new UI();
    ui.addBookToList(newBook);
    ui.clearFields();
    e.preventDefault();
}