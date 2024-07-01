import express, { Router } from 'express';
import passport from 'passport';
import {isValid} from '../middleware/validation';
import MeetupController from '../controllers/meetup.controller';
import { CreateMeetupSchema } from '../dto/meetup/create-meetup.dto';
import { UpdateMeetupSchema } from '../dto/meetup/update-meetup.dto';
import { GetAllMeetupsSchema } from '../dto/meetup/get-meetups.dto';
import { checkRole, ownsResource } from '../middleware/user';
import { QueryIdSchema } from '../dto/tag/create-tag.dto';
import Meetup from '../models/meetup';
import { SubsMeetupSchema } from '../dto/meetup/subs-meetup.dto';

const router: Router = express.Router()

router.get("/:id", 
    isValid(QueryIdSchema, 'params'),
    MeetupController.get)

router.get("/", 
    isValid(GetAllMeetupsSchema, 'params'),
    MeetupController.getAll)

router.put("/:id", 
    passport.authenticate('jwt', { session: false }), 
    isValid(QueryIdSchema, 'params'),
    checkRole([2]),
    ownsResource(Meetup),
    isValid(UpdateMeetupSchema, 'body'),
    MeetupController.update)

router.post("/", 
    passport.authenticate('jwt', { session: false }), 
    checkRole([2]),
    isValid(CreateMeetupSchema, 'body'), 
    MeetupController.create)

router.post("/subscribe/:id", 
    passport.authenticate('jwt', { session: false }), 
    isValid(SubsMeetupSchema, 'body'), 
    MeetupController.subscribe)

router.post("/unsubscribe/:id", 
    passport.authenticate('jwt', { session: false }), 
    isValid(SubsMeetupSchema, 'body'), 
    MeetupController.unsubscribe)

router.delete("/:id", 
    passport.authenticate('jwt', { session: false }), 
    isValid(QueryIdSchema, 'params'), 
    checkRole([2]),
    ownsResource(Meetup),
    MeetupController.delete)

export default router