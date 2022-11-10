import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  insertItem(title: string, description: string, price: number) {
    const itemId = new Date().toString();
    const newItem = new Item(itemId, title, description, price);
    this.items.push(newItem);
    return itemId;
  }

  fetchItems() {
    return [...this.items];
  }
}
