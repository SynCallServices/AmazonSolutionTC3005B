import ScreenRecorder  from "./ScreenRecorder";
import { withAuthenticator } from "@aws-amplify/ui-react"

function Home() {
  return (
    <div className='container'>
      <ScreenRecorder />
    </div>
  )
}

export default withAuthenticator(Home); 