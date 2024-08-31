import { liveblocks } from "@/lib/liveblocks";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
    const ClerkUser = await currentUser();  // this is the user i'm getting from the clerk
    // console.log("The clerk user is: ", ClerkUser);

    if(!ClerkUser) redirect('/sign-in')
    const {id, firstName, lastName, imageUrl, emailAddresses} = ClerkUser;

    const user = {               // storing the clerk user details in this user variable 
        id,
        info: {
            id,
            name: `${firstName} ${lastName}`,
            email: emailAddresses[0].emailAddress,
            avatar: imageUrl,
            color: getUserColor(id)
        }
    }

//   Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [],
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}