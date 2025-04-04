import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Purchase } from 'orm/entities/purchases/Purchase';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const purchaseRepository = getRepository(Purchase);
  try {
    const purchases = await purchaseRepository.find({
      select: ['id', 'name', 'price', 'created_at', 'updated_at'],
      relations: ['user'],
      order: {
        id: 'ASC',
      },
    });
    res.customSuccess(200, 'List of purchases.', purchases);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of purchases.`, null, err);
    return next(customError);
  }
};
