function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){
    this.selectors = {
        container: '.container',
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

UI.prototype.showAlert = function(msg, type){
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(msg));
    div.className = `alert ${type}`;
    console.log(`show alert function entered`);
    const container = document.querySelector(this.selectors.container);
    container.insertBefore(div, document.querySelector(this.selectors.list));
    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },3000)
}

document.getElementById('book-form').addEventListener('submit', submitForm);
function submitForm(e){
    const title = document.getElementById('book-form-title').value;
    const author = document.getElementById('book-form-author').value;
    const isbn = document.getElementById('book-form-isbn').value;
    const ui = new UI();
    if (title.trim() === '' || author.trim() === '' || isbn.trim()===''){
        ui.showAlert('Please fill in all fields', 'error');
        e.preventDefault();
        return;
    }
    const newBook = new Book(title, author, isbn);
    ui.showAlert('book added', 'success');
    ui.addBookToList(newBook);
    ui.clearFields();
    e.preventDefault();
}