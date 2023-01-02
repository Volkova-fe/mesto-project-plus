import cardsController from '../controllers/cardsController';
import { Router } from 'express';

const router = Router();

router.get('/', cardsController.getAllCards);
router.post('/', cardsController.createCard);
router.delete('/:cardId', cardsController.removeCard);

router.put('/:cardId/likes', cardsController.likeCard);
router.delete('/:cardId/likes', cardsController.dislikeCard);


export default router;