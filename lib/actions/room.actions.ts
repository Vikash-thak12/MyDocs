'use server'
import {nanoid} from "nanoid"
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";
export const CreateDocument = async ({ userId, email}: CreateDocumentParams) => {
    const roomId = nanoid();
    try {
        const metadata = {
            creatorId: userId, 
            email,
            title: "Untitled"
        }

        const usersAccesses: RoomAccesses = {
            [email]: ['room:write']
        }

        const room = await liveblocks.createRoom(roomId, {
            metadata,
            usersAccesses,
            defaultAccesses: ['room:write'],  // Later it will be removed during the production 
          });

        revalidatePath('/')
        return parseStringify(room)


    } catch (error) {
        console.log(`Error happened while creating a room: ${error}`);
        
    }
}

export const getDocument = async ({ roomId, userId}: { roomId: string, userId: string}) => {
    try {
        const room = await liveblocks.getRoom(roomId);
        // TODO: Remove the comment when the app is ready for production 
        // const hasAccess = Object.keys(room.usersAccesses).includes(userId)   //userAccess have only gmail so why there is userId
        // if(!hasAccess) {
        //     throw new Error("You don't have access to this document")
        // }
        return parseStringify(room)
    } catch (error) {
        console.log(`Error happened while getting the room: ${error}`);
        
    }
}