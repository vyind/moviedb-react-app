import Category from "./movies/[category]";

const fetchUrls = {};

export default function Index() {
  return (
    <div>
      <Category useHorizontal={true} categoryName="popular" />
      <Category useHorizontal={true} categoryName="top_rated" />
    </div>
  );
}
