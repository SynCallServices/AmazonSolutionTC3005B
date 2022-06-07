function CreateUser() {
  return (
    <div>
      <div className="create-card">
        <div className="create-title">Create account</div>

        <input className="create-input" name="name" placeholder="Email"/>
        <input className="create-input" name="email" placeholder="Username"/>
        <input className="create-input" name="firstName" placeholder="First Name"/>
        <input className="create-input" name="lastName" placeholder="Last Name"/>

        <button className="create-button">Create Account</button>

      </div> 
    </div>
  )
}

export default CreateUser
