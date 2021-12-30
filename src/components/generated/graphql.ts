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

export type DeleteLearningMutationVariables = Exact<{
  id?: InputMaybe<Scalars['Int']>;
}>;


export type DeleteLearningMutation = { __typename?: 'Mutation', deleteLearning?: number | null | undefined };

export type ListLearningCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type ListLearningCategoryQuery = { __typename?: 'Query', listLearningCategory?: Array<{ __typename?: 'LearningCategory', id?: string | null | undefined, username?: string | null | undefined, name?: string | null | undefined } | null | undefined> | null | undefined };

export type ListLearningInfoQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['Int']>;
  nextKey?: InputMaybe<Scalars['Int']>;
}>;


export type ListLearningInfoQuery = { __typename?: 'Query', listLearningInfo?: Array<{ __typename?: 'LearningInfo', id?: string | null | undefined, username?: string | null | undefined, categoryId?: number | null | undefined, categoryName?: string | null | undefined, content?: string | null | undefined, referenceUrl?: string | null | undefined, createDate?: string | null | undefined } | null | undefined> | null | undefined };


export const DeleteLearningDocument = gql`
    mutation deleteLearning($id: Int) {
  deleteLearning(id: $id)
}
    `;
export type DeleteLearningMutationFn = Apollo.MutationFunction<DeleteLearningMutation, DeleteLearningMutationVariables>;

/**
 * __useDeleteLearningMutation__
 *
 * To run a mutation, you first call `useDeleteLearningMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLearningMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLearningMutation, { data, loading, error }] = useDeleteLearningMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLearningMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLearningMutation, DeleteLearningMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLearningMutation, DeleteLearningMutationVariables>(DeleteLearningDocument, options);
      }
export type DeleteLearningMutationHookResult = ReturnType<typeof useDeleteLearningMutation>;
export type DeleteLearningMutationResult = Apollo.MutationResult<DeleteLearningMutation>;
export type DeleteLearningMutationOptions = Apollo.BaseMutationOptions<DeleteLearningMutation, DeleteLearningMutationVariables>;
export const ListLearningCategoryDocument = gql`
    query listLearningCategory {
  listLearningCategory {
    id
    username
    name
  }
}
    `;

/**
 * __useListLearningCategoryQuery__
 *
 * To run a query within a React component, call `useListLearningCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useListLearningCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListLearningCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useListLearningCategoryQuery(baseOptions?: Apollo.QueryHookOptions<ListLearningCategoryQuery, ListLearningCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListLearningCategoryQuery, ListLearningCategoryQueryVariables>(ListLearningCategoryDocument, options);
      }
export function useListLearningCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListLearningCategoryQuery, ListLearningCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListLearningCategoryQuery, ListLearningCategoryQueryVariables>(ListLearningCategoryDocument, options);
        }
export type ListLearningCategoryQueryHookResult = ReturnType<typeof useListLearningCategoryQuery>;
export type ListLearningCategoryLazyQueryHookResult = ReturnType<typeof useListLearningCategoryLazyQuery>;
export type ListLearningCategoryQueryResult = Apollo.QueryResult<ListLearningCategoryQuery, ListLearningCategoryQueryVariables>;
export const ListLearningInfoDocument = gql`
    query listLearningInfo($search: String, $categoryId: Int, $nextKey: Int) {
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
 * __useListLearningInfoQuery__
 *
 * To run a query within a React component, call `useListLearningInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useListLearningInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListLearningInfoQuery({
 *   variables: {
 *      search: // value for 'search'
 *      categoryId: // value for 'categoryId'
 *      nextKey: // value for 'nextKey'
 *   },
 * });
 */
export function useListLearningInfoQuery(baseOptions?: Apollo.QueryHookOptions<ListLearningInfoQuery, ListLearningInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListLearningInfoQuery, ListLearningInfoQueryVariables>(ListLearningInfoDocument, options);
      }
export function useListLearningInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListLearningInfoQuery, ListLearningInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListLearningInfoQuery, ListLearningInfoQueryVariables>(ListLearningInfoDocument, options);
        }
export type ListLearningInfoQueryHookResult = ReturnType<typeof useListLearningInfoQuery>;
export type ListLearningInfoLazyQueryHookResult = ReturnType<typeof useListLearningInfoLazyQuery>;
export type ListLearningInfoQueryResult = Apollo.QueryResult<ListLearningInfoQuery, ListLearningInfoQueryVariables>;