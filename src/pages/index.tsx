import Category from "./movies/[category]";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";

export default function Index() {
  return (
    <div>
      <Category useHorizontal={true} categoryName="popular" />
      <Category useHorizontal={true} categoryName="top_rated" />
    </div>
  );
}
