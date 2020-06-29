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
  teams: Array<Scalars['String']>;
};

export type CreateUserInput = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Game = {
  id: Scalars['ID'];
  code: Scalars['String'];
  playerCount: Scalars['Int'];
  players: Array<Player>;
  status: GameStatus;
  teams: Array<Scalars['String']>;
  activity: Array<GameActivity>;
  createdBy: User;
};

export type GameActivity = {
  id: Scalars['ID'];
  description: Scalars['String'];
  type: GameActivityType;
  game: Game;
};

export enum GameActivityType {
  PlayerJoined = 'PLAYER_JOINED',
  TeamsCreated = 'TEAMS_CREATED',
  GameStarted = 'GAME_STARTED'
}

export enum GameStatus {
  NotStarted = 'NOT_STARTED',
  TeamsCreated = 'TEAMS_CREATED',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED'
}

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  createUser: Scalars['String'];
  login: Scalars['String'];
  createGame: Scalars['String'];
  joinGame: Scalars['String'];
  createTeams: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationJoinGameArgs = {
  code: Scalars['String'];
};


export type MutationCreateTeamsArgs = {
  data: CreateTeamsInput;
};

export type Player = {
  id: Scalars['ID'];
  user: User;
  team: Scalars['String'];
  game: Game;
  hand: Array<Scalars['String']>;
};

export type Query = {
  me: User;
  getGame: Game;
};


export type QueryGetGameArgs = {
  gameId: Scalars['String'];
};

export type User = {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
};

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

export type GetGameQueryVariables = Exact<{
  gameId: Scalars['String'];
}>;


export type GetGameQuery = { getGame: { id: string, code: string, playerCount: number, status: GameStatus, teams: Array<string>, players: Array<{ id: string, team: string, user: { id: string, name: string, avatar: string } }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me: { id: string, name: string, email: string, avatar: string } };


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
export const GetGameDocument = gql`
    query GetGame($gameId: String!) {
  getGame(gameId: $gameId) {
    id
    code
    playerCount
    status
    teams
    players {
      id
      team
      user {
        id
        name
        avatar
      }
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