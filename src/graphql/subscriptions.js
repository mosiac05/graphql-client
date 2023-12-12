import { gql } from "@apollo/client";

export const PENDING_ACTIVITIES_SUBSCRIPTION = gql`
  subscription OnCreatedPendingActivity($groupHeaderId: ID!){
    createdPendingActivity(groupHeaderId: $groupHeaderId){
      id
      childId
      childType
      parentId
      parentType
      status
      shortDescription
    }
  }
`;
