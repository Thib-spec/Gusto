const express = require('express')
const router = express.Router();

// Include API routes
const userRouter = require('./user');
const categoryRouter = require('./category');
const productRouter = require('./product');
const fridgeRouter = require("./fridge");
const menuRouter = require('./menu');
const clientRouter = require('./client');
const levelRouter = require('./level');
const saleRouter = require("./sale")
const stateRouter = require('./state');
const tagRouter = require('./tag')
const fridgePresetRouter = require("./fridgePreset")
const nationalityRouter = require("./nationality")
const badgeRouter = require("./badges")
const technologiesRouter = require("./technologies")
const uploadRouter = require("./upload")


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
router.use('/product', productRouter)
router.use('/fridge',fridgeRouter)
router.use('/menu', menuRouter);
router.use('/client', clientRouter);
router.use('/level', levelRouter);
router.use('/sale',saleRouter)
router.use('/state', stateRouter);
router.use('/tag',tagRouter)
router.use('/fridgePreset',fridgePresetRouter)
router.use("/nationality",nationalityRouter)
router.use("/badge",badgeRouter)
router.use("/technologies",technologiesRouter)
router.use("/upload",uploadRouter)


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
