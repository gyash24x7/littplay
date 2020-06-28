import { Module } from '@nestjs/common';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

@Module({
  providers: [TeamResolver, TeamService]
})
export class TeamModule {}
