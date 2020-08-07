import MovieCategory from "./movie/[category]";
import ShowCategory from "./tv/[category]";

export default function Index() {
  return (
    <div>
      <MovieCategory useHorizontal={true} categoryName="trending" />
      <MovieCategory useHorizontal={true} categoryName="popular" />
      <ShowCategory useHorizontal={true} categoryName="trending" />
      <ShowCategory useHorizontal={true} categoryName="popular" />
    </div>
  );
}
