const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js"); 
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const { required } = require("joi");
const reviewController = require("../controllers/review.js");
//Post Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Delete Reviews Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, 
   wrapAsync(reviewController.deleteReview));

module.exports = router;