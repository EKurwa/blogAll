import { Body, Controller, Get, Post } from '@nestjs/common';
import { LabelService } from './label.service';
import {
  RequireLogin,
  RequirePermission,
} from 'src/utils/decorator/custom.decorator';

@Controller('label')
@RequireLogin()
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  @RequirePermission('LABEL_ADD')
  async createLabel(@Body('name') name: string) {
    console.log(name);

    await this.labelService.createLabel(name);
  }
  @Post('/update')
  @RequirePermission('LABEL_UPDATE')
  async updateLabel(@Body('id') id: number, @Body('name') name: string) {
    await this.labelService.updateLabel(id, name);
  }

  @Get('list')
  async getLabelAll() {
    return await this.labelService.getLabelAll();
  }
}
