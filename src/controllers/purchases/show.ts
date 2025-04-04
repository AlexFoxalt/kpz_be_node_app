import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Purchase } from 'orm/entities/purchases/Purchase';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const purchaseRepository = getRepository(Purchase);
  try {
    const purchase = await purchaseRepository.findOne(id, {
      select: ['id', 'name', 'price', 'created_at', 'updated_at'],
    });

    if (!purchase) {
      const customError = new CustomError(404, 'General', `Purchase with id:${id} not found.`, ['Purchase not found.']);
      return next(customError);
    }
    res.customSuccess(200, 'Purchase found', purchase);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
