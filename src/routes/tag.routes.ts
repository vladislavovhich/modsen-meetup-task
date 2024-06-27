import express, { Router } from 'express';
import passport from 'passport';
import {isValid} from '../middleware/validation';
import { checkRole, ownsResource } from '../middleware/user';
import { QueryIdSchema } from '../dto/tag/create-tag.dto';
import Tag from '../models/tag';
import TagController from '../controllers/tag.controller';
import { CreateTagSchema } from '../dto/tag/create-tag.dto';
import { UpdateTagSchema } from '../dto/tag/update-tag.dto';

const router: Router = express.Router()

router.get("/:id",
    isValid(QueryIdSchema, 'params'), 
    TagController.get)

router.get("/", TagController.getAll)

router.put("/:id", 
    passport.authenticate('jwt', { session: false }), 
    checkRole([2]),
    isValid(QueryIdSchema, 'params'), 
    isValid(UpdateTagSchema, 'body'), 
    ownsResource(Tag),
    TagController.update)

router.post("/", 
    passport.authenticate('jwt', { session: false }),
    checkRole([2]),
    isValid(CreateTagSchema, 'body'), 
    TagController.create)

router.delete("/:id", 
    passport.authenticate('jwt', { session: false }),
    checkRole([2]),
    ownsResource(Tag),
    isValid(QueryIdSchema, 'params'), 
    TagController.delete)

export default router