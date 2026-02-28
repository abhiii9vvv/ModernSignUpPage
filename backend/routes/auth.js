import express from "express";
import { body, validationResult } from "express-validator";
import { signup, login } from "../controller/authController.js";

const router = express.Router();

const handlevalidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

const signupValidation = [ // NEW: Validation rules for signup
  body('firstName').trim().notEmpty().withMessage('First name is required').isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 chars'),
  body('lastName').trim().notEmpty().withMessage('Last name is required').isLength({ min: 2, max: 50 }).withMessage('Last name must be 2-50 chars'),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  }).withMessage('Password must be 6+ chars and include upper, lower, number, symbol')
];

const loginValidation = [ // NEW: Validation rules for login
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

router.post("/login",loginValidation,handlevalidation, login);
router.post("/signup",loginValidation,handlevalidation, signup);

export default router;