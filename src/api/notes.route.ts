import express from 'express';
import NotesController from './notes.controller';

const router = express.Router();

router.route('/').post(NotesController.getNotes);
router.route('/add').post(NotesController.addNote);
router.route('/delete').delete(NotesController.deleteNote);
router.route('/update').patch(NotesController.updateNote);

export default router;
