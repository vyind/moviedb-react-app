import Category from "./movies/[category]";
import Link from "next/link";

const fetchUrls = {};

export default function Index() {
  return (
    <div>
      <Link as={"/movies/popular"} href={"/movies/[category]"}>
        <a>
          <h2>Popular Movies</h2>
        </a>
      </Link>
      <Category useHorizontal={true} categoryName="popular" />
      <Link as="/movies/top_rated" href="/movies/[category]">
        <a>
          <h2>Top-Rated Movies</h2>
        </a>
      </Link>
      <Category useHorizontal={true} categoryName="top_rated" />
    </div>
  );
}
