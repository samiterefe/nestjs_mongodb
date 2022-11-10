import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Item } from './item.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  constructor(@InjectModel('Item') private readonly ItemModel: Model<Item>) {}

  async insertItem(title: string, description: string, price: number) {
    const newItem = new this.ItemModel({
      title,
      description,
      price,
    });
    const savedItem = await newItem.save();
    console.log(savedItem);
    return savedItem.id as string;
  }

  async fetchItems() {
    const items = await this.ItemModel.find().exec();
    return items;
  }
  async fetchOneItem(itemmId: string) {
    const item = await this.findItem(itemmId);
    if (!item) {
      throw new NotFoundException();
    }

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.price,
    };
  }

  async updateItem(
    itemmId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updatedItem = await this.findItem(itemmId);

    if (title) {
      updatedItem.title = title;
    }
    if (description) {
      updatedItem.description = description;
    }
    if (price) {
      updatedItem.price = price;
    }
    updatedItem.save();
  }

  private async findItem(id: string): Promise<Item> {
    let item;
    try {
      const item = await this.ItemModel.findById(id);
    } catch (error) {
      throw new NotFoundException('cound not found a item.');
    }

    if (!item) {
      throw new NotFoundException('cound not found a item.');
    }
    return item;
  }

  removeItem(itemmId: string) {
    const index = this.findItem(itemmId)[1];
    this.items.splice(index, 1);
  }
}
