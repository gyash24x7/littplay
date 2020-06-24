import { Resolver } from "@nestjs/graphql";
import { Game } from "./game.entity";

@Resolver(() => Game)
export class GameResolver {}
