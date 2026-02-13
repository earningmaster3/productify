import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react'
import { Routes, Route } from 'react-router'
import Homepage from './pages/Homepage'
import Profilepage from './pages/Profilepage'
import Createpage from './pages/Createpage'
import Productpage from './pages/Productpage'
import Editpage from './pages/Editpage'
import Navbar from './components/Navbar'
import Trialpage from './pages/Trialpage'
const App = () => {
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
          <Route path="/profile" element={<Profilepage />} />
          <Route path="/create" element={<Createpage />} />
          <Route path="/product/:id" element={<Productpage />} />
          <Route path="/edit/:id" element={<Editpage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
