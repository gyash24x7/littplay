import { Module } from '@nestjs/common';
import { GameActivityResolver } from './game-activity.resolver';
import { GameActivityService } from './game-activity.service';

@Module({
  providers: [GameActivityResolver, GameActivityService]
})
export class GameActivityModule {}
