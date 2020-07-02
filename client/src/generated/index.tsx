import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AskCardInput = {
  gameId: Scalars['String'];
  askedFrom: Scalars['String'];
  askedFor: Scalars['String'];
};

export type CreateTeamsInput = {
  gameId: Scalars['String'];
  teams: Array<Scalars['String']>;
};

export type CreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Game = {
  _id: Scalars['ID'];
  code: Scalars['String'];
  createdBy: User;
  players: Array<Player>;
  status: GameStatus;
  playerCount: Scalars['Int'];
  teams: Array<Scalars['String']>;
  lastMove?: Maybe<Move>;
  currentMove?: Maybe<Move>;
};

export enum GameStatus {
  NotStarted = 'NOT_STARTED',
  PlayersReady = 'PLAYERS_READY',
  TeamsCreated = 'TEAMS_CREATED',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED'
}

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Move = {
  type: MoveType;
  description: Scalars['String'];
  turn?: Maybe<Scalars['String']>;
  askedFrom?: Maybe<Scalars['String']>;
  askedBy?: Maybe<Scalars['String']>;
  askedFor?: Maybe<Scalars['String']>;
};

export enum MoveType {
  Ask = 'ASK',
  Turn = 'TURN',
  Call = 'CALL'
}

export type Mutation = {
  createGame: Scalars['String'];
  joinGame: Scalars['String'];
  createTeams: Scalars['Boolean'];
  startGame: Scalars['Boolean'];
  askCard: Scalars['Boolean'];
  login: Scalars['String'];
  createUser: Scalars['String'];
};


export type MutationJoinGameArgs = {
  code: Scalars['String'];
};


export type MutationCreateTeamsArgs = {
  data: CreateTeamsInput;
};


export type MutationStartGameArgs = {
  gameId: Scalars['String'];
};


export type MutationAskCardArgs = {
  data: AskCardInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type Player = {
  _id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
  hand: Array<Scalars['String']>;
  team: Scalars['String'];
};

export type Query = {
  getGame: Game;
  me: User;
};


export type QueryGetGameArgs = {
  gameId: Scalars['String'];
};

export type Subscription = {
  game: Game;
};


export type SubscriptionGameArgs = {
  gameId: Scalars['String'];
};

export type User = {
  _id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
};

export type AskCardMutationVariables = Exact<{
  gameId: Scalars['String'];
  askedFor: Scalars['String'];
  askedFrom: Scalars['String'];
}>;


export type AskCardMutation = { askCard: boolean };

export type CreateGameMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateGameMutation = { createGame: string };

export type CreateTeamsMutationVariables = Exact<{
  teams: Array<Scalars['String']>;
  gameId: Scalars['String'];
}>;


export type CreateTeamsMutation = { createTeams: boolean };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { createUser: string };

export type JoinGameMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type JoinGameMutation = { joinGame: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login: string };

export type StartGameMutationVariables = Exact<{
  gameId: Scalars['String'];
}>;


export type StartGameMutation = { startGame: boolean };

export type GetGameQueryVariables = Exact<{
  gameId: Scalars['String'];
}>;


export type GetGameQuery = { getGame: { _id: string, teams: Array<string>, status: GameStatus, code: string, playerCount: number, createdBy: { _id: string, name: string, avatar: string, email: string }, players: Array<{ _id: string, team: string, hand: Array<string>, name: string, avatar: string }>, lastMove?: Maybe<{ type: MoveType, turn?: Maybe<string>, description: string, askedFrom?: Maybe<string>, askedFor?: Maybe<string>, askedBy?: Maybe<string> }>, currentMove?: Maybe<{ type: MoveType, turn?: Maybe<string>, description: string, askedFrom?: Maybe<string>, askedFor?: Maybe<string>, askedBy?: Maybe<string> }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { _id: string, name: string, email: string, avatar: string } };

export type GameSubscriptionVariables = Exact<{
  gameId: Scalars['String'];
}>;


export type GameSubscription = { game: { _id: string, teams: Array<string>, status: GameStatus, code: string, playerCount: number, createdBy: { _id: string, name: string, avatar: string, email: string }, players: Array<{ _id: string, team: string, hand: Array<string>, name: string, avatar: string }>, lastMove?: Maybe<{ type: MoveType, turn?: Maybe<string>, description: string, askedFrom?: Maybe<string>, askedFor?: Maybe<string>, askedBy?: Maybe<string> }>, currentMove?: Maybe<{ type: MoveType, turn?: Maybe<string>, description: string, askedFrom?: Maybe<string>, askedFor?: Maybe<string>, askedBy?: Maybe<string> }> } };


export const AskCardDocument = gql`
    mutation AskCard($gameId: String!, $askedFor: String!, $askedFrom: String!) {
  askCard(data: {gameId: $gameId, askedFor: $askedFor, askedFrom: $askedFrom})
}
    `;
export type AskCardMutationFn = ApolloReactCommon.MutationFunction<AskCardMutation, AskCardMutationVariables>;
export function useAskCardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AskCardMutation, AskCardMutationVariables>) {
        return ApolloReactHooks.useMutation<AskCardMutation, AskCardMutationVariables>(AskCardDocument, baseOptions);
      }
export type AskCardMutationHookResult = ReturnType<typeof useAskCardMutation>;
export type AskCardMutationResult = ApolloReactCommon.MutationResult<AskCardMutation>;
export type AskCardMutationOptions = ApolloReactCommon.BaseMutationOptions<AskCardMutation, AskCardMutationVariables>;
export const CreateGameDocument = gql`
    mutation CreateGame {
  createGame
}
    `;
export type CreateGameMutationFn = ApolloReactCommon.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;
export function useCreateGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, baseOptions);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = ApolloReactCommon.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const CreateTeamsDocument = gql`
    mutation CreateTeams($teams: [String!]!, $gameId: String!) {
  createTeams(data: {teams: $teams, gameId: $gameId})
}
    `;
export type CreateTeamsMutationFn = ApolloReactCommon.MutationFunction<CreateTeamsMutation, CreateTeamsMutationVariables>;
export function useCreateTeamsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTeamsMutation, CreateTeamsMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTeamsMutation, CreateTeamsMutationVariables>(CreateTeamsDocument, baseOptions);
      }
export type CreateTeamsMutationHookResult = ReturnType<typeof useCreateTeamsMutation>;
export type CreateTeamsMutationResult = ApolloReactCommon.MutationResult<CreateTeamsMutation>;
export type CreateTeamsMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTeamsMutation, CreateTeamsMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!, $password: String!) {
  createUser(data: {email: $email, password: $password, name: $name})
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const JoinGameDocument = gql`
    mutation JoinGame($code: String!) {
  joinGame(code: $code)
}
    `;
export type JoinGameMutationFn = ApolloReactCommon.MutationFunction<JoinGameMutation, JoinGameMutationVariables>;
export function useJoinGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinGameMutation, JoinGameMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinGameMutation, JoinGameMutationVariables>(JoinGameDocument, baseOptions);
      }
export type JoinGameMutationHookResult = ReturnType<typeof useJoinGameMutation>;
export type JoinGameMutationResult = ApolloReactCommon.MutationResult<JoinGameMutation>;
export type JoinGameMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinGameMutation, JoinGameMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password})
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const StartGameDocument = gql`
    mutation StartGame($gameId: String!) {
  startGame(gameId: $gameId)
}
    `;
export type StartGameMutationFn = ApolloReactCommon.MutationFunction<StartGameMutation, StartGameMutationVariables>;
export function useStartGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartGameMutation, StartGameMutationVariables>) {
        return ApolloReactHooks.useMutation<StartGameMutation, StartGameMutationVariables>(StartGameDocument, baseOptions);
      }
export type StartGameMutationHookResult = ReturnType<typeof useStartGameMutation>;
export type StartGameMutationResult = ApolloReactCommon.MutationResult<StartGameMutation>;
export type StartGameMutationOptions = ApolloReactCommon.BaseMutationOptions<StartGameMutation, StartGameMutationVariables>;
export const GetGameDocument = gql`
    query GetGame($gameId: String!) {
  getGame(gameId: $gameId) {
    _id
    teams
    status
    code
    createdBy {
      _id
      name
      avatar
      email
    }
    playerCount
    players {
      _id
      team
      hand
      name
      avatar
    }
    lastMove {
      type
      turn
      description
      askedFrom
      askedFor
      askedBy
    }
    currentMove {
      type
      turn
      description
      askedFrom
      askedFor
      askedBy
    }
  }
}
    `;
export function useGetGameQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
        return ApolloReactHooks.useQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, baseOptions);
      }
export function useGetGameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetGameQuery, GetGameQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetGameQuery, GetGameQueryVariables>(GetGameDocument, baseOptions);
        }
export type GetGameQueryHookResult = ReturnType<typeof useGetGameQuery>;
export type GetGameLazyQueryHookResult = ReturnType<typeof useGetGameLazyQuery>;
export type GetGameQueryResult = ApolloReactCommon.QueryResult<GetGameQuery, GetGameQueryVariables>;
export function refetchGetGameQuery(variables?: GetGameQueryVariables) {
      return { query: GetGameDocument, variables: variables }
    }
export const MeDocument = gql`
    query Me {
  me {
    _id
    name
    email
    avatar
  }
}
    `;
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export function refetchMeQuery(variables?: MeQueryVariables) {
      return { query: MeDocument, variables: variables }
    }
export const GameDocument = gql`
    subscription Game($gameId: String!) {
  game(gameId: $gameId) {
    _id
    teams
    status
    code
    createdBy {
      _id
      name
      avatar
      email
    }
    playerCount
    players {
      _id
      team
      hand
      name
      avatar
    }
    lastMove {
      type
      turn
      description
      askedFrom
      askedFor
      askedBy
    }
    currentMove {
      type
      turn
      description
      askedFrom
      askedFor
      askedBy
    }
  }
}
    `;
export function useGameSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<GameSubscription, GameSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<GameSubscription, GameSubscriptionVariables>(GameDocument, baseOptions);
      }
export type GameSubscriptionHookResult = ReturnType<typeof useGameSubscription>;
export type GameSubscriptionResult = ApolloReactCommon.SubscriptionResult<GameSubscription>;