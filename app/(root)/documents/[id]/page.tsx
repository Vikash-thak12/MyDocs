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
        <div>
            {/* <h1>Hey This is Id page</h1> */}
            <CollaborativeRoom />
        </div>
    )
}

export default page
