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

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
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
  hello: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
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


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', error?: { __typename?: 'FieldError', message: string, field: string } | null, user?: { __typename?: 'User', lastName: string, firstName: string, username: string } | null } };

export type SignupMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserResponse', error?: { __typename?: 'FieldError', field: string, message: string } | null, user?: { __typename?: 'User', username: string, lastName: string, firstName: string } | null } };


export const LoginDocument = gql`
    mutation Login($loginOptions: LoginInput!) {
  login(loginOptions: $loginOptions) {
    error {
      message
      field
    }
    user {
      lastName
      firstName
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const SignupDocument = gql`
    mutation Signup($options: UsernamePasswordInput!) {
  signup(options: $options) {
    error {
      field
      message
    }
    user {
      username
      lastName
      firstName
    }
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};