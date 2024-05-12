const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js"); 
const {isLoggedIn} = require("../middleware.js")
const {isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");


// Index Route
router.get("/",wrapAsync(listingController.index));
// New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
router.post("/", isLoggedIn,
 validateListing,
 wrapAsync(listingController.createListing));

//Edit the route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Update route
router.put("/:id", isLoggedIn, isOwner,
validateListing,
wrapAsync(listingController.updateListing));

//Delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;
