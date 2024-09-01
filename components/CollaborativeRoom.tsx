"use client"
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'
import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Editor } from './editor/Editor'
import ActiveCollaborators from './ActiveCollaborators'
import { Input } from './ui/input'
import Image from 'next/image'


const CollaborativeRoom = ({ roomId, roomMetadata }: CollaborativeRoomProps) => {

  const currentUserType = "editor"  // will update later with dynamic type

  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      try {
        if(documentTitle !== roomMetadata.title) {
          
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setEditing(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[])


  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className='collaborative-room'>
          <Header>
            <div ref={containerRef} className='flex w-fit items-center justify-center gap-4'>
              {
                editing && !loading ? (
                  <Input
                    type='text'
                    value={documentTitle}
                    ref={inputRef}
                    placeholder='Enter title'
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    onKeyDown={updateTitleHandler}
                    disabled={!editing}
                    className='document-title-input'
                  />
                ) : (
                  <>
                    <p className='document-title'>{documentTitle}</p>
                  </>
                )
              }

              {
                currentUserType === "editor" && !editing && (
                  <Image
                    src="/assets/icons/edit.svg"
                    alt='edit'
                    width={24}
                    height={24}
                    onClick={() => setEditing(true)}
                    className='cursor-pointer'
                  />
                )
              }

              {
                currentUserType !== "editor" && !editing && (
                  <p className='view-only-tag'>View Only</p>
                )
              }

              {
                loading && <p className='text-sm text-gray-400'>saving...</p>
              }

            </div>
            <div className='w-full flex flex-1 justify-end gap-2 sm:gap-3'>
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom