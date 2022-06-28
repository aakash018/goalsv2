import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  ok: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  logout: LogoutResponse;
  signup: UserResponse;
};


export type MutationLoginArgs = {
  loginOptions: LoginInput;
};


export type MutationSignupArgs = {
  options: UsernamePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  authToken: ResToken;
  hello: Scalars['String'];
  yo: Scalars['String'];
};

export type ResToken = {
  __typename?: 'ResToken';
  token: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  token?: Maybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  pasword: Scalars['String'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  loginOptions: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', token?: string | null, error?: { __typename?: 'FieldError', field: string, message: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResponse', ok: boolean } };

export type SignupMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserResponse', token?: string | null, error?: { __typename?: 'FieldError', field: string, message: string } | null } };

export type AuthTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthTokenQuery = { __typename?: 'Query', authToken: { __typename?: 'ResToken', token: string } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type YoQueryVariables = Exact<{ [key: string]: never; }>;


export type YoQuery = { __typename?: 'Query', yo: string };


export const LoginDocument = gql`
    mutation Login($loginOptions: LoginInput!) {
  login(loginOptions: $loginOptions) {
    token
    error {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    ok
  }
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const SignupDocument = gql`
    mutation Signup($options: UsernamePasswordInput!) {
  signup(options: $options) {
    token
    error {
      field
      message
    }
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const AuthTokenDocument = gql`
    query AuthToken {
  authToken {
    token
  }
}
    `;

export function useAuthTokenQuery(options?: Omit<Urql.UseQueryArgs<AuthTokenQueryVariables>, 'query'>) {
  return Urql.useQuery<AuthTokenQuery>({ query: AuthTokenDocument, ...options });
};
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

export function useHelloQuery(options?: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'>) {
  return Urql.useQuery<HelloQuery>({ query: HelloDocument, ...options });
};
export const YoDocument = gql`
    query yo {
  yo
}
    `;

export function useYoQuery(options?: Omit<Urql.UseQueryArgs<YoQueryVariables>, 'query'>) {
  return Urql.useQuery<YoQuery>({ query: YoDocument, ...options });
};