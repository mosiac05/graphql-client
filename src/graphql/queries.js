import { gql } from '@apollo/client';

export const GET_SUBJECTS = gql`
  query GetSubjects {
    subjects {
      subjects {
        description
        id
        name
      }
      total
    }
  }
`;

export const GET_STUDENT_PENDINGS = gql`
  query GetStudentPendings {
    getStudentPendings {
      studentPendings {
        childId
        childType
        groupHeaderId
        id
        shortDescription
        status
        userId
      }
      total
    }
  }
`;
