import Category from "./tv/[category]";

export default function Index() {
  return (
    <div>
      <Category useHorizontal={true} categoryName="trending" />
      <Category useHorizontal={true} categoryName="popular" />
      <Category useHorizontal={true} categoryName="airing_today" />
      <Category useHorizontal={true} categoryName="on_the_air" />
      <Category useHorizontal={true} categoryName="top_rated" />
    </div>
  );
}
