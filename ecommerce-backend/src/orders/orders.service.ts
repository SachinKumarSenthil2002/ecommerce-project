import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const order =
      this.ordersRepository.create(
        createOrderDto,
      );

    return this.ordersRepository.save(order);
  }

  findAll(email: string, role: string) {
    if (role === 'admin') {
      return this.ordersRepository.find();
    }

    return this.ordersRepository.find({
      where: {
        customerEmail: email,
      },
    });
  }

  findOne(id: number) {
    return this.ordersRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ) {
    await this.ordersRepository.update(
      id,
      updateOrderDto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    const order = await this.findOne(id);

    if (order) {
      await this.ordersRepository.remove(
        order,
      );
    }

    return {
      message:
        'Order deleted successfully',
    };
  }
}