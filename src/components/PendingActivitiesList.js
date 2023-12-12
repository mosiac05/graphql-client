import React, { useEffect } from 'react'
import PendingActivity from './PendingActivity';

const PendingActivitiesList = (props) => {
  // eslint-disable-next-line
  useEffect(() => props.subscribeToNewPendingActivities(), []);

  return (
    <div>
      <ul>
        <p>List of pending activities</p>
        {props.studentPendings.map(pendingActivity => <PendingActivity key={pendingActivity.id} pendingActivity={pendingActivity} />)}
      </ul>
    </div>
  )
}

export default PendingActivitiesList;
