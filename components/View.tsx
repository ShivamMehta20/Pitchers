import Ping from "@/components/Ping";
import {client} from "@/sanity/lib/client";
import { VIEW_QUERY} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";
import {unstable_after as after} from "next/server"

const View = async ({id}:{id:string}) => {
  // const {views:totalViews}= await sanityFetch({query:VIEW_QUERY,id})
    // const {data:posts}= await sanityFetch({query:STARTUP_QUERY,params})
   const {views:totalViews}=await client.withConfig({useCdn:false}).fetch(VIEW_QUERY,{id});

   after(async()=>
       await writeClient
       .patch(id)
       .set({views: totalViews+1})
       .commit(),);

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2 ">
        <Ping/>
            </div>
            <p className="view-text">
                <span className="font-black"> {totalViews>1 ? "Views:": "View:" }{totalViews} </span>
            </p>
        </div>
    )
}
export default View
