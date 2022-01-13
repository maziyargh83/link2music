import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import { Ctx, Update, Sender, Url, On, Message } from 'nestjs-telegraf';
import { resolve } from 'path';
import { Scenes } from 'telegraf';
import { get } from 'request';

@Update()
export class BotService {
  @Url(/^.*.(mp3|mp4)$/)
  async link(@Ctx() ctx: Scenes.SceneContext, @Message() message) {
    console.log(message.text);
    if (!existsSync(resolve(__dirname, 'musics'))) {
      await mkdirSync(resolve(__dirname, 'musics'));
    }
    await get(message.text)
      .on('end', async () => {
        console.log(__dirname);

        const file = await readFileSync(
          resolve(__dirname, 'musics', ctx.from.id.toString() + '.mp3'),
        );
        await ctx.telegram.sendDocument(ctx.chat.id, {
          source: file,
          filename: ctx.from.id.toString() + '.mp3',
        });
      })
      .pipe(
        createWriteStream(
          resolve(__dirname, 'musics', ctx.from.id.toString() + '.mp3'),
        ),
      );
  }
}
