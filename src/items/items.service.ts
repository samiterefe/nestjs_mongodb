import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  insertItem(title: string, description: string, price: number) {
    const itemId = Math.random().toString();
    const newItem = new Item(itemId, title, description, price);
    this.items.push(newItem);
    return itemId;
  }

  fetchItems() {
    return [...this.items];
  }
  fetchOneItem(itemmId: string) {
    const item = this.findItem(itemmId)[0];
    if (!item) {
      throw new NotFoundException();
    }

    return { ...item };
  }

  updateItem(
    itemmId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [item, index] = this.findItem(itemmId);
    const updatedItem = { ...item };

    if (title) {
      updatedItem.title = title;
    }
    if (description) {
      updatedItem.description = description;
    }
    if (price) {
      updatedItem.price = price;
    }
    this.items[index] = updatedItem;
  }

  private findItem(id: string): [Item, number] {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    const item = this.items[itemIndex];
    if (!item) {
      throw new NotFoundException('cound not found a item.');
    }
    return [item, itemIndex];
  }

  removeItem(itemmId: string){
    const index = this.findItem(itemmId)[1];
    this.items.splice(index, 1);
  }
}
