
import UserManagementCard from './UserManagementCard.js'

function UserManagement() {
  return (
    <div className="manage-container">
      <h1 className="manage-title">User Management</h1>
      <div className="manage-card-container">
        <UserManagementCard
          username='Jorge-Cab'
          firstName='Jothe'
          lastName='Cabiedes'
          email='Test@Test.com'
          agentId={`ID: 91025824524`}
          role='agent'
        />

        
        

      </div>
    </div>
  )
}

export default UserManagement
