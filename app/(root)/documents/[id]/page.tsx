import CollaborativeRoom from '@/components/CollaborativeRoom'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs'

const page = () => {
    return (
        <main className='w-full flex flex-col items-center'>
            <CollaborativeRoom />
        </main>
    )
}

export default page
