import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export default function Nav() {
  return (
    <header className='flex items-center px-8 h-15 w-full bg-cyan-800 text-white'>
        
      <SignedOut>
        <a className='flex items-center h-9 px-5 rounded bg-amber-400'>
        <SignInButton />

        </a>
      </SignedOut>
     
      <SignedIn >
        
        <UserButton />
      </SignedIn>
    
    </header>
  )
}