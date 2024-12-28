import {SearchForm} from "@/components/SearchForm";
import {StartupCard, StartupTypeCard} from "@/components/StartupCard";
// import {client} from "@/sanity/lib/client";
import {STARTUP_QUERY} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}:{
    searchParams:Promise<{query?:string}>
}) {
    const query= (await searchParams).query;
    const params={search:query || null}
    // const posts = await client.fetch(STARTUP_QUERY)
    const {data:posts}= await sanityFetch({query:STARTUP_QUERY,params})

    const session=await auth()
    console.log(session?.id)
  return (
      <>
      <section className="pink_container">
    <h1 className="heading">Pitch Your Startup,<br/> Connect with Entrepreneurs</h1>
    <p className="sub_heading !max-w-3xl">
        Submit Ideas, Vote on pitches and Get Noticed in Virtual Competitions
    </p>
          <SearchForm query={query}/>
      </section>
          <section className="section_container">
              <p className="text-30-semibold">
                  {query ? `Search results for "${query}"` : "All startup"}
              </p>
              <ul className="mt-7 card_grid">
                  {posts?.length > 0 ?
                      posts.map((post:StartupTypeCard)=>(
                          <StartupCard key={post?._id} post={post}/>)
                      ):
                      (
                          <p className="no-results">No results found</p>
                      )
                  }
              </ul>
          </section>
          <SanityLive/>
          </>
  );
}
