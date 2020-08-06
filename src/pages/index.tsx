import Category from "./movie/[category]";
import TopAppBar from "../components/topAppBar";

export default function Index() {
  return (
    <div>
      <Category useHorizontal={true} categoryName="popular" />
      <Category useHorizontal={true} categoryName="top_rated" />
    </div>
  );
}
