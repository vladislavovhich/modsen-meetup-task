import express, { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import {isValid} from '../middleware/validation';
import {AuthController} from '../controllers/auth.controller';
import { LoginUserSchema } from '../dto/user/login-user.dto';
import { CreateUserSchema } from '../dto/user/create-user.dto';

const router: Router = express.Router()

router.post("/login", 
    isValid(LoginUserSchema, "body"),
    AuthController.login)

router.post("/register", 
    isValid(CreateUserSchema, "body"),
    AuthController.register)

router.get("/logout", passport.authenticate('jwt', { session: false }), AuthController.logout)

router.get("/refresh",  passport.authenticate('jwt', { session: false }), AuthController.refreshToken)

export default router