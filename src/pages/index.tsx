import Category from "./movies/[category]";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";

export default function Index() {
  return (
    <div>
      <Link as={"/movies/popular"} href={"/movies/[category]"}>
        <Typography variant="h5" component="h6">
          Popular Movies
        </Typography>
      </Link>
      <Category useHorizontal={true} categoryName="popular" />
      <Link as="/movies/top_rated" href="/movies/[category]">
        <Typography variant="h5" component="h6">
          Top-Rated Movies
        </Typography>
      </Link>
      <Category useHorizontal={true} categoryName="top_rated" />
    </div>
  );
}
