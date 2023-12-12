import React from 'react'

const PendingActivity = ({pendingActivity}) => {
  return (
    <li>
      <div>
        <strong>{pendingActivity.childType}</strong> -
        <span>{pendingActivity.shortDescription}</span> -
        <span>{pendingActivity.status}</span>
      </div>
    </li>
  )
}

export default PendingActivity;
