class Book {
    constructor(){
        this.key= 0;
    }
keyCount(action){
    if (action === 'add'){
        console.log(`keyCount add entereds`, this.key);
        this.key +=1;
        return;
    }
    this.key --;
}

addBook(title, author, isbn){
    const self = this;

    const newBook = {
        title:  title,
        author:  author,
        isbn:  isbn,
        id: self.key,
    }

    self.keyCount('add');
    return newBook;
}


}


class UI {
    constructor(){
        this.selectors ={
            container: '.container',
            list: '#book-form',
            listTitle: '#book-form-title',
            listAuthor : `#book-form-author`,
            listISBN : '#book-form-isbn',
            table: '#book-table',
        }
    }
    addBookToList(book){
        const table = document.querySelector(this.selectors.table);
        const newEl = document.createElement('tr');
        newEl.id =`book-${book.id}`;
        newEl.innerHTML = `
            <th>${book.title}</th>
            <th>${book.author}</th>
            <th> ${book.isbn} </th>
            <th class="trash">
                <a class="trash-link" href="#">    
                    <i class="trash-icon fas fa-trash-alt"></i>
                </a>
            </th>
        `;
        table.appendChild(newEl);      
    }
    clearFields(){
        document.querySelector(this.selectors.listTitle).value = ``;
        document.querySelector(this.selectors.listAuthor).value = ``;
        document.querySelector(this.selectors.listISBN).value = ``; 
    }
    showAlert(msg, type){
        
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(msg));
        div.className = `alert ${type}`;
        const container = document.querySelector(this.selectors.container);
        container.insertBefore(div, document.querySelector(this.selectors.list));
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000)
    }
    deleteBookFromList(target){
        let el;
        el = target.tagName === "I" ?
         target.parentElement.parentElement.parentElement 
         : target.parentElement;
         el.remove();
    }
}

const ui = new UI();
const book = new Book();

document.getElementById('book-form').addEventListener('submit', submitForm);
document.getElementById('book-table').addEventListener('click', deleteBookFromList);



function submitForm(e){
    
    const title = document.getElementById('book-form-title').value;
    const author = document.getElementById('book-form-author').value;
    const isbn = document.getElementById('book-form-isbn').value; 
    if (title.trim() === '' || author.trim() === '' || isbn.trim()===''){
        ui.showAlert('Please fill in all fields', 'error');
        e.preventDefault();
        return;
    }
    const newBook = book.addBook(title, author, isbn);
    ui.showAlert('book added', 'success');
    ui.addBookToList(newBook);
    ui.clearFields();
    e.preventDefault();
}


function deleteBookFromList(e){
    if (e.target.className.includes('trash')){
        ui.deleteBookFromList(e.target);
        ui.showAlert('Book removed', 'success');
    }
    e.preventDefault();
}
