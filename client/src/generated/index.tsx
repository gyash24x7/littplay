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

export type CreateTeamsInput = {
  gameId: Scalars['String'];
  teamA: Scalars['String'];
  teamB: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Game = {
  id: Scalars['ID'];
  gameCode: Scalars['String'];
  status: GameStatus;
  noOfPlayers: Scalars['Int'];
  teamA?: Maybe<Scalars['String']>;
  teamB?: Maybe<Scalars['String']>;
  teamAScore: Scalars['Int'];
  teamBScore: Scalars['Int'];
  teamAMembers: Array<GameToUser>;
  teamBMembers: Array<GameToUser>;
  players: Array<User>;
};

export type GameActivity = {
  id: Scalars['ID'];
  game: Game;
  description: Scalars['String'];
  kind: GameActivityKind;
};

export enum GameActivityKind {
  PlayerJoined = 'PLAYER_JOINED',
  GameStarted = 'GAME_STARTED',
  AskPlayer = 'ASK_PLAYER',
  CardGiven = 'CARD_GIVEN',
  CardDeclined = 'CARD_DECLINED',
  CallingSet = 'CALLING_SET',
  SetCalled = 'SET_CALLED',
  TeamsCreated = 'TEAMS_CREATED'
}

export enum GameStatus {
  NotStarted = 'NOT_STARTED',
  Started = 'STARTED',
  Completed = 'COMPLETED'
}

export type GameToUser = {
  user: User;
  hand?: Maybe<Array<Scalars['String']>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  login: Scalars['String'];
  createUser: Scalars['String'];
  createGame: Game;
  joinGame: Game;
  createTeams: Game;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationJoinGameArgs = {
  gameCode: Scalars['String'];
};


export type MutationCreateTeamsArgs = {
  data: CreateTeamsInput;
};

export type Query = {
  me: User;
  getGame: Game;
};


export type QueryGetGameArgs = {
  gameId: Scalars['String'];
};

export type Subscription = {
  gameActivity: GameActivity;
};


export type SubscriptionGameActivityArgs = {
  gameCode: Scalars['String'];
};

export type User = {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
};

export type CreateGameMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateGameMutation = { createGame: { id: string, gameCode: string, noOfPlayers: number } };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = { createUser: string };

export type JoinGameMutationVariables = Exact<{
  gameCode: Scalars['String'];
}>;


export type JoinGameMutation = { joinGame: { id: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login: string };

export type GetGameQueryVariables = Exact<{
  gameId: Scalars['String'];
}>;


export type GetGameQuery = { getGame: { id: string, gameCode: string, noOfPlayers: number, status: GameStatus, players: Array<{ id: string, name: string, avatar: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { id: string, name: string, email: string, avatar: string } };


export const CreateGameDocument = gql`
    mutation CreateGame {
  createGame {
    id
    gameCode
    noOfPlayers
  }
}
    `;
export type CreateGameMutationFn = ApolloReactCommon.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;
export function useCreateGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, baseOptions);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = ApolloReactCommon.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
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
    mutation JoinGame($gameCode: String!) {
  joinGame(gameCode: $gameCode) {
    id
  }
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
export const GetGameDocument = gql`
    query GetGame($gameId: String!) {
  getGame(gameId: $gameId) {
    id
    gameCode
    noOfPlayers
    status
    players {
      id
      name
      avatar
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
    id
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