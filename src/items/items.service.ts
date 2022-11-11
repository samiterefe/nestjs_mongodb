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
    desc: string,
    price: number,
  ) {
    const updatedItem = await this.finditem(itemId);
    if (title) {
      updatedItem.title = title;
    }
    if (desc) {
      updatedItem.description = desc;
    }
    if (price) {
      updatedItem.price = price;
    }
    updatedItem.save();
  }

  async removeItem(prodId: string) {
    const result = await this.ItemModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find item.');
    }
  }

  private async finditem(id: string): Promise<item> {
    let item;
    try {
      item = await this.ItemModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find item.');
    }
    if (!item) {
      throw new NotFoundException('Could not find item.');
    }
    return item;
  }
}
