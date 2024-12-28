import Link from "next/link";
import Image from "next/image";
import {auth, signOut,signIn} from "@/auth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Navbar=async ()=>
{
    const session=await auth();
    return(
       <>
           <div className="px-5 py-3 bg-white shadow-sm font-work-sans">
               <nav className="flex items-center justify-between">
                   <Link href="/public">
                   <Image src="/logo.png" alt="logo" width={144} height={30} />
                   </Link>
                   <div className="flex items-center justify-between gap-5">
                       {session && session?.user ? (
                           <>
                           <Link href="/startup/create">
                                <span>Create</span>
                           </Link>
                           <form action= {async ()=>{
                               "use server"
                               await signOut({redirectTo:'/'})
                           }}>

                               <button type="submit">Logout</button>
                           </form>
                           <Link href={`/user/${session?.id}`}>
<Avatar className="size-10">
<AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""}/>
    <AvatarFallback >AV</AvatarFallback>
</Avatar>
                           </Link>
                           </>
                       ):(
                           <form action={async()=>
                       {
                          "use server";
                         await  signIn('github')}}>
                               <button>
                           <span>Login</span>
                       </button>
                           </form>)}
                   </div>
               </nav>

           </div>
       </>
    )
}

export default Navbar;