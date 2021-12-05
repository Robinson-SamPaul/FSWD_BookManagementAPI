require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dataBase = require("./DataBase")
const BookModel = require("./Database/book");
const AuthorModel = require("./Database/author");
const PublicationModel = require("./Database/publication");
var bodyParser = require("body-parser");

const booky = express();

mongoose.connect(
    process.env.MongoURL
).then(() => console.log("Connection is established"));

booky.use(bodyParser.urlencoded({
    extended : true
}));
booky.use(bodyParser.json());

// Get All LinkDetails

// Route             /
// Description       Get all routes
// Access            public 
// Parameter         None 
// Method            Get

booky.get("/", (req, res) => {
    return res.json({
        Links : {
            BookLinks : {
                AllBooks : "http://localhost:3000/book",
                BookByISBN : "http://localhost:3000/isbn/:isbn",
                BooksByCategory : "http://localhost:3000/category/:category",
                BooksByLanguage : "http://localhost:3000/language/:language",
                AddNewBook : "http://localhost:3000/book/new",
            },
            AuthorLinks : {
                AllAuthors : "http://localhost:3000/author",
                AuthorByID : "http://localhost:3000/authorID/:ID",
                AuthorByBooks : "http://localhost:3000/authorBook/:books",
                AddNewAuthor : "http://localhost:3000/author/new",
            },
            PublicationLinks : {
                AllPublications : "http://localhost:3000/publication",
                PublicationByID : "http://localhost:3000/publicationID/:ID",
                PublicationByBooks : "http://localhost:3000/publicationBook/:books",
                AddNewPublication : "http://localhost:3000/publication/new",
            },
            UpdateLinks : {
                UpdateAuthorBooks : "http://localhost:3000/author/update/book/:isbn",
                UpdatePublicationBooks : "http://localhost:3000/publication/update/book/:isbn",
            },
            DeleteLinks : {
                DeleteAuthorsInBookAndViceVersa : "http://localhost:3000/author/delete/book/:authorID/:isbn",
                DeleteAuthorsInBookAndViceVersa : "http://localhost:3000//publication/delete/book/:pubID/:isbn" 
            }
        }       
    });
});

// Get All Books

// Route             /book
// Description       Get all books
// Access            public 
// Parameter         None 
// Method            Get 

booky.get("/book", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

// Get Specific Book By ISBN

// Route             /isbn
// Description       Get books by ISBN
// Access            public 
// Parameter         isbn
// Method            Get 

booky.get("/isbn/:isbn", async (req, res) => {
    const getSpecBook = await BookModel.findOne({
        ISBN : req.params.isbn
    });

    if(!getSpecBook) {
        return res.json({
            error : `No Books with an ISBN of ${req.params.isbn}`
        });
    }
    
    return res.json({
        Books : getSpecBook
    });
});

// Get Specific Book By Category

// Route             /category
// Description       Get books by Category
// Access            public 
// Parameter         category
// Method            Get

booky.get("/category/:category", async (req, res) => {
    const getCatgBook = await BookModel.findOne({
        category : req.params.category
    });

    if(!getCatgBook) {
        return res.json({
            error : `No Books with the category of ${req.params.category}`
        });
    }
    
    return res.json({
        Books : getCatgBook
    });
});

// Get Specific Book By Language

// Route             /language
// Description       Get books by Language
// Access            public 
// Parameter         language
// Method            Get

booky.get("/language/:language", async (req, res) => {
    const getLangBook = await BookModel.findOne({
        language : req.params.language
    });

    if(!getLangBook) {
        return res.json({
            error : `No Books with the language for ${req.params.language}`
        });
    }
    
    return res.json({
        Books : getLangBook
    });
});

// Add New Books

// Route             /book/new
// Description       Add new book
// Access            public 
// Parameter         None
// Method            Post

booky.post("/book/new", async (req,res) => {
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json(addNewBook
        // Book : addNewBook,
        // message : "The Book was addde successfully."
    );
});

// Get All Authors

// Route             /author
// Description       Get all authors
// Access            public 
// Parameter         None 
// Method            Get 

booky.get("/author", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({
        Authors : getAllAuthors
    });
});

// Get Specific Author By ID

// Route             /authorID
// Description       Get authors by ID
// Access            public 
// Parameter         ID
// Method            Get

booky.get("/authorID/:ID", async (req, res) => {
    const getAuthor = await AuthorModel.findOne({
        ID : req.params.ID
    });

    if(!getAuthor) {
        return res.json({
            error : `No Authors with an ID of ${req.params.ID}`
        });
    }
    
    return res.json({
        Authors : getAuthor
    });
});

// Get Specific Author By Book

// Route             /authorBook
// Description       Get authors by Book
// Access            public 
// Parameter         books
// Method            Get

booky.get("/authorBook/:books", async (req, res) => {
    const getAuthBook = await AuthorModel.findOne({
        books : req.params.books
    });

    if(!getAuthBook) {
        return res.json({
            error : `No Authors written the book of ${req.params.books}`
        });
    }
    
    return res.json({
        Authors : getAuthBook
    });
})

// Add New Authors

// Route             /author/new
// Description       Add new Author
// Access            public 
// Parameter         None
// Method            Post

booky.post("/author/new", async (req,res) => {
    const {newAuth} = req.body;
    const addNewAuthor = AuthorModel.create(newAuth);
    return res.json({
        Author : addNewAuthor,
        message : "The new Author was added succesfully."
    });
});

// Get All Publications

// Route             /publication
// Description       Get all Publications
// Access            public 
// Parameter         None
// Method            Get

booky.get("/publication", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json({
        Publications : getAllPublications
    });
});

// Get Specific Publication By ID

// Route             /publicationID
// Description       Get Publications by ID
// Access            public 
// Parameter         ID
// Method            Get

booky.get("/publicationID/:ID", async (req, res) => {
    const getPub = await PublicationModel.findOne({
        ID : req.params.ID
    });

    if(!getPub) {
        return res.json({
            error : `No Publications with an ID of ${req.params.ID}`
        });
    }
    
    return res.json({
        Publications : getPub
    });
});

// Get Specific Publication By Book

// Route             /publicationBook
// Description       Get Publications by Book
// Access            public 
// Parameter         books
// Method            Get

booky.get("/publicationBook/:books", async (req, res) => {
    const getPubBook = await PublicationModel.findOne({
        books : req.params.books
    });

    if(!getPubBook) {
        return res.json({
            error : `No publications published the book of ${req.params.books}`
        });
    }
    
    return res.json({
        Publications : getPubBook
    });
});

// Add New Publications

// Route             /author/new
// Description       Add new Publication
// Access            public 
// Parameter         None
// Method            Post

booky.post("/publication/new", async (req,res) => {
    const {newPub} = req.body;
    const addNewPublication = PublicationModel.create(newPub);
    return res.json({
        Publication : addNewPublication,
        message : "The new Publication was added successfully."
    });
});

// Update Publication and Book

// Route             /publication/update/book
// Description       Update the Publication and the Book
// Access            public 
// Parameter         isbn
// Method            Put

booky.put("/publication/update/book/:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn
        },
        {
            $push: {
                publication : req.body.pubID
            }
        },
        {
            new : true
        }
    );

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            ID : req.body.pubID
        },
        {
            $push: {
                books : req.params.isbn
            }
        },
        {
            new : true
        }
    );

    return res.json({
        books : updatedBook,
        publications : updatedPublication,
        message : "Succesfully Updated"
    });
});

// Update Author and Book

// Route             /author/update/book
// Description       Update the Author and the Book
// Access            public 
// Parameter         isbn
// Method            Put

booky.put("/author/update/book/:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn
        },
        {
            $push: {
                author : req.body.authID
            }
        },
        {
            new : true
        }
    );

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            ID : req.body.authID
        },
        {
            $push: {
                books : req.params.isbn
            }
        },
        {
            new : true
        }
    );

    return res.json({
        Books : updatedBook,
        Authors : updatedAuthor,
        message : "Succesfully Updated"
    });
});

// Delete Author and Book

// Route             /author/delete/book
// Description       Delete the Author from the book and Vice-Versa
// Access            public 
// Parameter         isbn, authorID
// Method            Delete

booky.delete("/author/delete/book/:authorID/:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn
        },
        {
            $pull : {
                author : req.params.authorID   
            }
        },
        {
            new : true
        }
    );

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            ID : req.params.authorID
        },
        {
            $pull : {
                books : req.params.isbn   
            }
        },
        {
            new : true
        }
    ); 
});

// Delete Publication and Book

// Route             /publication/delete/book
// Description       Delete the Publication from the book and Vice-Versa
// Access            public 
// Parameter         isbn, pubID
// Method            Delete

booky.delete("/publication/delete/book/:pubID/:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn
        },
        {
            $pull : {
                publication : req.params.pubID   
            }
        },
        {
            new : true
        }
    );

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            ID : req.params.pubID
        },
        {
            $pull : {
                books : req.params.isbn   
            }
        },
        {
            new : true
        }
    ); 
});

booky.listen(3000, () => {
    console.log("The server is up and running.");
});

