import express from 'express';
import NotesController from './notes.controller';

const router = express.Router();

router.route('/').get(NotesController.apiGetNotes);

export default router;
