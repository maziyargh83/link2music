import { BotService } from './bot.update';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  providers: [BotService, BotService],
})
export class BotModule {}
