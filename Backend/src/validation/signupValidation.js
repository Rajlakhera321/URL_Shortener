import { check } from 'express-validator';
import userModel from '../model/user.js';
export const signUpValidationRule = () => {
  return [
    check("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .matches(/^[a-zA-Z ]*$/)
      .withMessage("Only Characters with white space are allowed"),
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .normalizeEmail()
      .isEmail()
      .withMessage("must be a valid email")
      .custom(async (value) => {
        const data = await userModel.findOne({ email: value });
        if (data) {
          return Promise.reject("Email is already exist");
        }
      }),
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Password required")
      .isLength({ min: 5 })
      .withMessage("password must be minimum 5 length")
  ];
};
