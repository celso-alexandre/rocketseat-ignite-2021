import { Router } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Customer } from './entity/Customer';

import { getObjKeys } from './utils/getObjKeys';

export default class Routes {
  routes: Router;

  customersRepository: Repository<Customer>;

  constructor() {
    this.routes = Router();
    this.customersRepository = getRepository(Customer);

    this.routes.post('/customer', async (request, response) => {
      const payload = getObjKeys(request.body, ['cpf', 'name']) as Omit<Customer, 'id'>;

      const customerAlreadyExists = await this.customersRepository.findOne({ cpf: payload.cpf });

      if (customerAlreadyExists) return response.status(409).json({ error: 'Customer already exists' });

      const customer = await this.customersRepository.save(payload);
      return response.status(201).json(customer);
    });
  }
}
