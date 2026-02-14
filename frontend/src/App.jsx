import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react'
import { Routes, Route, Navigate } from 'react-router'
import Homepage from './pages/Homepage'
import Profilepage from './pages/Profilepage'
import Createpage from './pages/Createpage'
import Productpage from './pages/Productpage'
import Editpage from './pages/Editpage'
import Navbar from './components/Navbar'
import Trialpage from './pages/Trialpage'
import useUserSync from './hooks/useUserSync';
import useAuthReq from './hooks/useAuthReq';

const App = () => {

  const {isClerkLoaded, isSignedIn } = useAuthReq();

  useUserSync();

  if(!isClerkLoaded) {
    return <div className='min-h-screen flex items-center justify-center'><span className="loading loading-spinner loading-lg"></span></div>
  }
   
 
  return (
    <div className='min-h-screen bg-base-100'>
      {/* <SignedOut>
        <SignInButton mode='modal' />
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn> */}
      <main className='max-w-5xl mx-auto px-4 py-8'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/trial" element={<Trialpage />} />
          <Route path="/profile" element={isSignedIn ?<Profilepage />: <Navigate to={"/"}/>} />
          <Route path="/create" element={isSignedIn ?<Createpage />: <Navigate to={"/"}/>} />
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/edit/:id" element={isSignedIn ?<Editpage />: <Navigate to={"/"}/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
