

function CreatedUser(props) {
    function createNew() {
        props.setTrigger(true)
    }

    return (

        <div className="createduser-page">
            <div className="created-title"> User Created Successfully! </div>
            
            <button onClick={createNew} className="created-button">Create Another Account</button>
        
                
        </div>
    )
}

export default CreatedUser