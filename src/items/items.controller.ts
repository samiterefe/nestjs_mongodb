/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly ItemsService: ItemsService) {}

  @Post()
  addItem(
    @Body('title') itemTitle: string,
    @Body('description') itemDesc: string,
    @Body('price') itemPrice: number,
  ) {
    const generetedId = this.ItemsService.insertItem(
      itemTitle,
      itemDesc,
      itemPrice,
    );
    return { id: generetedId };
  }

  @Get()
  getAllItems() {
    return this.ItemsService.fetchItems();
  }

  @Get(':id')
  getItem(@Param('id') itemId: string) {
    return this.ItemsService.fetchOneItem(itemId);
  }
  @Patch(':id')
  updateItem(
    @Param('id') itemId: string,
    @Body('title') itemTitle: string,
    @Body('description') itemDesc: string,
    @Body('price') itemPrice: number,
  ) {
    return this.ItemsService.updateItem(itemId, itemTitle, itemDesc, itemPrice);
    return null;
  }
  @Delete(':id')
  deleteItem(@Param('id') itemId: string) {
    return this.ItemsService.removeItem(itemId);
  }
}
