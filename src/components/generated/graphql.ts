import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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

export type GetListLearningCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListLearningCategoryQuery = { __typename?: 'Query', listLearningCategory?: Array<{ __typename?: 'LearningCategory', id?: string | null | undefined, username?: string | null | undefined, name?: string | null | undefined } | null | undefined> | null | undefined };

export type GetListLearningInfoQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['Int']>;
  nextKey?: InputMaybe<Scalars['Int']>;
}>;


export type GetListLearningInfoQuery = { __typename?: 'Query', listLearningInfo?: Array<{ __typename?: 'LearningInfo', id?: string | null | undefined, username?: string | null | undefined, categoryId?: number | null | undefined, categoryName?: string | null | undefined, content?: string | null | undefined, referenceUrl?: string | null | undefined, createDate?: string | null | undefined } | null | undefined> | null | undefined };


export const GetListLearningCategoryDocument = gql`
    query getListLearningCategory {
  listLearningCategory {
    id
    username
    name
  }
}
    `;

/**
 * __useGetListLearningCategoryQuery__
 *
 * To run a query within a React component, call `useGetListLearningCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListLearningCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListLearningCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetListLearningCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetListLearningCategoryQuery, GetListLearningCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListLearningCategoryQuery, GetListLearningCategoryQueryVariables>(GetListLearningCategoryDocument, options);
      }
export function useGetListLearningCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListLearningCategoryQuery, GetListLearningCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListLearningCategoryQuery, GetListLearningCategoryQueryVariables>(GetListLearningCategoryDocument, options);
        }
export type GetListLearningCategoryQueryHookResult = ReturnType<typeof useGetListLearningCategoryQuery>;
export type GetListLearningCategoryLazyQueryHookResult = ReturnType<typeof useGetListLearningCategoryLazyQuery>;
export type GetListLearningCategoryQueryResult = Apollo.QueryResult<GetListLearningCategoryQuery, GetListLearningCategoryQueryVariables>;
export const GetListLearningInfoDocument = gql`
    query getListLearningInfo($search: String, $categoryId: Int, $nextKey: Int) {
  listLearningInfo(search: $search, categoryId: $categoryId, nextKey: $nextKey) {
    id
    username
    categoryId
    categoryName
    content
    referenceUrl
    createDate
  }
}
    `;

/**
 * __useGetListLearningInfoQuery__
 *
 * To run a query within a React component, call `useGetListLearningInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetListLearningInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetListLearningInfoQuery({
 *   variables: {
 *      search: // value for 'search'
 *      categoryId: // value for 'categoryId'
 *      nextKey: // value for 'nextKey'
 *   },
 * });
 */
export function useGetListLearningInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetListLearningInfoQuery, GetListLearningInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetListLearningInfoQuery, GetListLearningInfoQueryVariables>(GetListLearningInfoDocument, options);
      }
export function useGetListLearningInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetListLearningInfoQuery, GetListLearningInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetListLearningInfoQuery, GetListLearningInfoQueryVariables>(GetListLearningInfoDocument, options);
        }
export type GetListLearningInfoQueryHookResult = ReturnType<typeof useGetListLearningInfoQuery>;
export type GetListLearningInfoLazyQueryHookResult = ReturnType<typeof useGetListLearningInfoLazyQuery>;
export type GetListLearningInfoQueryResult = Apollo.QueryResult<GetListLearningInfoQuery, GetListLearningInfoQueryVariables>;