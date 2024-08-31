"use client"
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { CreateDocument } from '@/lib/actions/room.actions'
import { useRouter } from 'next/navigation'

const AddDocument = ({userId, email}: AddDocumentBtnProps) => {
    const router = useRouter()
    const addDocumentHandle = async () => {
        try {
           const room = await CreateDocument({ userId, email})
           if(room) router.push(`/documents/${room.id}`)
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <Button type='submit' onClick={addDocumentHandle} className='gradient-blue flex gap-1 shadow-md'>
        <Image
        src="/assets/icons/add.svg"
        alt='Add'
        width={24}
        height={24}
         />
         <p>Click to Create a Document</p>
    </Button>
  )
}

export default AddDocument