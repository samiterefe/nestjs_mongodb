import { Body, Controller, Post } from '@nestjs/common';
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
}
