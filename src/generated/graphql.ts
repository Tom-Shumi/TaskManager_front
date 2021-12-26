export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type LearningCategory = {
  __typename?: 'LearningCategory';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type LearningInfo = {
  __typename?: 'LearningInfo';
  categoryId?: Maybe<Scalars['Int']>;
  categoryName?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  createDate?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  referenceUrl?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteLearning?: Maybe<Scalars['Int']>;
  deleteLearningCategory?: Maybe<Scalars['Int']>;
  registerLearning?: Maybe<LearningInfo>;
  registerLearningCategory?: Maybe<LearningCategory>;
  updateLearning?: Maybe<LearningInfo>;
  updateLearningCategory?: Maybe<LearningCategory>;
};


export type MutationDeleteLearningArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationDeleteLearningCategoryArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type MutationRegisterLearningArgs = {
  categoryId?: InputMaybe<Scalars['Int']>;
  content?: InputMaybe<Scalars['String']>;
  referenceUrl?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterLearningCategoryArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateLearningArgs = {
  categoryId?: InputMaybe<Scalars['Int']>;
  content?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  referenceUrl?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateLearningCategoryArgs = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  listLearningCategory?: Maybe<Array<Maybe<LearningCategory>>>;
  listLearningInfo?: Maybe<Array<Maybe<LearningInfo>>>;
};


export type QueryListLearningInfoArgs = {
  categoryId?: InputMaybe<Scalars['Int']>;
  nextKey?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};
