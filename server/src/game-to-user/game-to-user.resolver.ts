import { Resolver } from "@nestjs/graphql";
import { GameToUserType } from "./game-to-user.type";

@Resolver(() => GameToUserType)
export class GameToUserResolver {}
