import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Purchase } from 'orm/entities/purchases/Purchase';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { name, price, user_id } = req.body;

  const purchaseRepository = getRepository(Purchase);
  const userRepository = getRepository(User);

  try {
    const purchase = await purchaseRepository.findOne(id);
    if (!purchase) {
      const customError = new CustomError(404, 'General', `Purchase with id:${id} not found.`, ['Purchase not found.']);
      return next(customError);
    }

    const user = await userRepository.findOne(user_id);
    if (!user) {
      const customError = new CustomError(404, 'General', `User with id:${user_id} not found.`, ['User not found.']);
      return next(customError);
    }

    purchase.name = name;
    purchase.price = price;
    purchase.user = user;

    try {
      await purchaseRepository.save(purchase);
      res.customSuccess(200, 'Purchase successfully saved.');
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `Purchase '${purchase.id}' can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
