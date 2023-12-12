import { useQuery } from '@apollo/client';
import React, { } from 'react'
import { PENDING_ACTIVITIES_SUBSCRIPTION } from '../graphql/subscriptions';
import { GET_STUDENT_PENDINGS } from '../graphql/queries';
import PendingActivitiesList from './PendingActivitiesList';

const PendingActivitiesListWithData = props => {

  const { subscribeToMore, data, loading, error } = useQuery(GET_STUDENT_PENDINGS, {
    onError: err => console.log(err),
  }
  )

  if (loading) {
    return (<strong>Still loading...</strong>)
  }

  if (error) {
    console.log(error);
    return (<p>An error occurred.</p>)
  }

  return (
    <PendingActivitiesList studentPendings={data.getStudentPendings.studentPendings} subscribeToNewPendingActivities={() =>
      subscribeToMore({
        document: PENDING_ACTIVITIES_SUBSCRIPTION,
        variables: { groupHeaderId: 1 },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          console.log("Received valid data....");
          let newPendingActivity = subscriptionData.data.createdPendingActivity;
          newPendingActivity = {
            ...newPendingActivity,
            status: "Just Fetched"
          }
          console.log("the new pending activitiy");
          console.log(newPendingActivity);

          return Object.assign({}, prev, {
            getStudentPendings: {
              studentPendings: [newPendingActivity, ...prev.getStudentPendings.studentPendings],
              total: prev.getStudentPendings.total + 1
            }
          });
        }
      })
    } />
  )
}

export default PendingActivitiesListWithData;
