import { HomepageClient } from "./_homepage/homepage-client"
import { HideFooter } from "@/components/layout/footer-context"
import { auth } from "@/lib/auth"

export default async function Home() {
  const session = await auth()

  return (
    <div className="text-tech-main selection:bg-tech-main/20 selection:text-tech-main-dark relative flex h-screen w-full overflow-hidden font-sans">
      <HideFooter />
      <HomepageClient
        loggedInUsername={
          session?.user?.githubLogin ?? session?.user?.name ?? null
        }
      />
    </div>
  )
}
