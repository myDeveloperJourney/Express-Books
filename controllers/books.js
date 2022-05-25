// require dependencies
const express = require('express'); // node modules use the singleton pattern
const Book = require('../models/book');
// initialize the router object
const router = express.Router(); // factory function - function that returns an object once invoked
// define router/controller code
// SEED DATA!
const bookSeed = require('../models/bookSeed.js');
router.get('/seed', (req, res) => {
	Book.deleteMany({}, (error, allBooks) => {});

	Book.create(bookSeed, (error, data) => {
		res.redirect('/books');
	});
});

// ROUTES
// INDEX
router.get('/', (req, res) => {
    Book.find({}, (error, allBooks) => {
        res.render('index.ejs', {
            books: allBooks,
        });
    });
})

// NEW
router.get('/new', (req, res) => {
    res.render('new.ejs');
})

// DELETE
router.delete("/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect("/books")
    })
})

// UPDATE
router.put('/:id', (req, res) => {
    if (req.body.completed === "on") {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    
    Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedBook) => {
            res.redirect(`/books/${req.params.id}`)
        }
    )
})

// CREATE
router.post('/', (req, res) => {

    if (req.body.completed === 'on') {
        //if checked, req.body.completed is set to 'on'
        req.body.completed = true;
    } else {
        //if not checked, req.body.completed is undefined
        req.body.completed = false;
    }

    Book.create(req.body, (error, createdBook) => {
        res.redirect('/books');
    });
})

// EDIT
router.get("/:id/edit", (req, res) => {
    Book.findById(req.params.id, (error, foundBook) => {
        res.render("edit.ejs", {
            book: foundBook,
        })
    })
})

// SHOW
router.get('/:id', (req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        res.render('show.ejs', {
            book: foundBook,
        });
    });
});

// export the router object using module.exports
module.exports = router;