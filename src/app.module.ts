import { BotModule } from './bot/bot.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { SocksProxyAgent } from 'socks-proxy-agent';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
      options: {
        telegram: {
          agent: new SocksProxyAgent('socks5h://127.0.0.1:1080'),
        },
      },
    }),

    BotModule,
  ],
})
export class AppModule {}
