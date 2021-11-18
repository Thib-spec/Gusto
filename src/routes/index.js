const express = require('express')
const router = express.Router();

// Include API routes
const userRouter = require('./user');
const categoryRouter = require('./category');


/* ----------------------- */
/* ----- API ROUTING ----- */
/* ----------------------- */


/* ----- Public API Routes ----- */

// Handle root


// // Handle login
// router.use('/login', loginRouter);


/* ----- Private API Routes ----- */

// Handle main API routes
router.use('/user', userRouter);
router.use('/category', categoryRouter);



// Handle other API routes, send Not found

router.use('*', function (req, res) {
    res.status(404).json({
        "message": "Route not found",
        "originalUrl": req.originalUrl,
        "url": req.url,
        "path": req.path,
        "params": req.params
    });
});


module.exports = router
