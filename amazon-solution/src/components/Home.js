// import '../assets/styles/App.css'
import APITest from './APITest'



function Home() {
  console.log(process.env.REACT_APP_TEST)
  return (
    <div className='container'>
      <APITest />
    </div>
  )
}

export default Home; 