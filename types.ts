export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  deleteProduct?: Maybe<Product>;
  register: User;
  updateProduct?: Maybe<Product>;
};


export type MutationCreateProductArgs = {
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  ownerId: Scalars['String'];
  price: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  imageUrl?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  title?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  createdAt?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  ownerId: Scalars['String'];
  price: Scalars['Float'];
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getProduct: Product;
  getProducts: Array<Product>;
  getUserProducts: Array<Product>;
  getUsers: Array<User>;
  login: User;
};


export type QueryGetProductArgs = {
  id: Scalars['Int'];
};


export type QueryGetProductsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetUserProductsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  ownerId: Scalars['String'];
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  expiry?: Maybe<Scalars['Int']>;
  password: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};
