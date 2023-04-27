let myLibrary = [];

class Book {
    constructor(title, author, pages, isRead = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.changeStatus = () => {
            this.isRead = !this.isRead;
            updateLibrary();
        };
    }
}

const titleInput = document.getElementById("title"),
    authorInput = document.getElementById("author"),
    pagesInput = document.getElementById("pages");
const submitButton = document.getElementById("btn-submit");
const section = document.getElementById("main");

function updateLibrary() {
    section.innerHTML = "";
    myLibrary.forEach((book, index) =>
        section.append(createBookCard(index, book))
    );
}

function addBook(event) {
    event.preventDefault();
    const book = new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value
    );
    myLibrary.push(book);
    updateLibrary();
}

function deleteBook(event) {
    myLibrary = myLibrary.filter(
        (_, index) => index != event.target.parentElement.dataset.id
    );
    updateLibrary();
}

function createBookCard(id, book) {
    const div = document.createElement("div"),
        h3 = document.createElement("h3"),
        paraAuthor = document.createElement("p"),
        paraPages = document.createElement("p"),
        btnStatus = document.createElement("button"),
        btnDelete = document.createElement("button");

    h3.innerText = book.title;
    paraAuthor.innerText = book.author;
    paraPages.innerText = book.pages;
    btnStatus.innerText = book.isRead ? "Un-read" : "Read";
    btnDelete.innerText = "Delete";

    div.dataset.id = id;
    btnStatus.onclick = book.changeStatus;
    btnDelete.onclick = deleteBook;

    div.append(...[h3, paraAuthor, paraPages, btnStatus, btnDelete]);

    return div;
}

submitButton.onclick = addBook;

window.addEventListener(
    "load",
    () =>
        (document.getElementById("current-year").innerText =
            new Date().getFullYear())
);
