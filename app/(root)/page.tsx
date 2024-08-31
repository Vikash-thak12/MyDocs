import Header from "@/components/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const documents = []
  return (
    <main>
      {/* <h1>This is page</h1> */}
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <p>Notification</p>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {
        documents.length > 0 ? (
          <div>

          </div>
        ) : (
          <div className="document-list-empty">
            <Image
              src='/assets/icons/doc.svg'
              alt="Document"
              width={32}
              height={32}
              className="mx-auto"
            />
          </div>
        )
      }
    </main>
  );
}
