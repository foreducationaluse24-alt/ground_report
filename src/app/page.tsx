
import NewsCard from "@/component/NewsCard";


export default function Home() {
  return (
    <div className="grid grid-cols-3 h-full gap-3">
      <div className="col-span-2 px-2 py-1">
          <NewsCard source="afasf" timeAgo="2 days ago" credibility={88} headline="asfdsfsafsdfsfsfsfdsfsfsf" snippet="asfasfsafasfdfasfasfasf" publications={32} clusterId="1"></NewsCard>
          <NewsCard source="afasf" timeAgo="2 days ago" credibility={88} headline="asfdsfsafsdfsfsfsfdsfsfsf" snippet="asfasfsafasfdfasfasfasf" publications={32} clusterId="2"></NewsCard>
          <NewsCard source="afasf" timeAgo="2 days ago" credibility={88} headline="asfdsfsafsdfsfsfsfdsfsfsf" snippet="asfasfsafasfdfasfasfasf" publications={32} clusterId="3"></NewsCard>
          <NewsCard source="afasf" timeAgo="2 days ago" credibility={88} headline="asfdsfsafsdfsfsfsfdsfsfsf" snippet="asfasfsafasfdfasfasfasf" publications={32} clusterId="4"></NewsCard>
      </div>
      <div className=" bg-amber-300 col-span-1">
        <section aria-label="Blindspots">
          <h2 className="side-title">Blindspots</h2>
          <p className="muted small">
            Stories one side of the spectrum is barely covering.
          </p>
        </section>
      </div>
      
    </div> 
  )
}
