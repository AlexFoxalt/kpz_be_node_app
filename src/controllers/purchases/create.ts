import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Purchase } from 'orm/entities/purchases/Purchase';
import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, price, user_id } = req.body;

  const purchaseRepository = getRepository(Purchase);
  const userRepository = getRepository(User);
  const user = await userRepository.findOne(user_id);
  if (!user) {
    const customError = new CustomError(404, 'General', `User with id:${user_id} not found.`, ['User not found.']);
    return next(customError);
  }
  try {
    const newPurchase = new Purchase();
    newPurchase.name = name;
    newPurchase.price = price;
    newPurchase.user = user;
    await purchaseRepository.save(newPurchase);

    res.customSuccess(200, 'Purchase successfully created.');
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Purchase can't be created`, null, err);
    return next(customError);
  }
};
