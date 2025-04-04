import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Purchase } from 'orm/entities/purchases/Purchase';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const purchaseRepository = getRepository(Purchase);
  try {
    const purchase = await purchaseRepository.findOne({ where: { id } });

    if (!purchase) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Purchase with id:${id} doesn't exists.`]);
      return next(customError);
    }
    purchaseRepository.delete(id);

    res.customSuccess(200, 'Purchase successfully deleted.', {
      id: purchase.id,
      name: purchase.name,
      price: purchase.price,
    });
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
