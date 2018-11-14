// book constructor

function Book(title,author,isbn) {
    this.title= title;
    this.author= author;
    this.isbn= isbn
};

// ui 

function ui () {}

ui.prototype.addBookList= function (book) {

    const list = document.getElementById('Book-list')

    const row= document.createElement('tr')
    

    row.innerHTML= `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href="#" class="Delete">D</a></td>`
     console.log(row)
    list.appendChild(row);
}

ui.prototype.clearField= function () {
    document.getElementById('title').value= ''
    document.getElementById('author').value= ''
    document.getElementById('isbn').value= ''
}
//validation

ui.prototype.addValidator = function (message, className) {
    const div= document.createElement('div');
    // add class
    div.className= `alart ${className}`

    //append message as a child

    div.appendChild(document.createTextNode(message));

    const container= document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div,form);

    setTimeout( function(){
        document.querySelector('.alart').remove();
    },3000);
};

//delete selected book

ui.prototype.deleteBook = function (target) {
    if (target.className=== "Delete") {
        target.parentElement.parentElement.remove()
    }

}

//add event listeners

document.getElementById('book-form').addEventListener('submit',
 function (e) {
    console.log('hello')
    const title = document.getElementById('title').value
    const author= document.getElementById('author').value
    const isbn= document.getElementById('isbn').value

    const book= new Book(title,author,isbn)

    //instatiate ui
    const UI= new ui()
   if (title=== '' || author==='' ||  isbn === '') {
       UI.addValidator('fill in all fields', 'error')
   } else {
    UI.addBookList(book)

    UI.addValidator('Book added succesfully', 'success')
    UI.clearField()
    
    console.log(book)

   }
       e.preventDefault()
});

//add event listener to delete

document.getElementById('Book-list').addEventListener('click',
function(e) {
    console.log(123)

    const UI= new ui()

    UI.deleteBook(e.target)

    UI.addValidator('Book deleted', 'success');

    e.preventDefault()
})