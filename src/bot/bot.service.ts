/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  constructor(@InjectBot() private bot: Telegraf<Scenes.SceneContext>) {}
}
