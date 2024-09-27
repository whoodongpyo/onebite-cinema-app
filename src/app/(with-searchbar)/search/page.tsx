import MovieItem from '@/components/movie-item';

import styles from './page.module.css';

import { MovieData } from '@/types';

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const { q } = searchParams;

  // 현재는 영화 데이터가 변경될 일이 없으므로, force-cache 를 적용한다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
  );

  if (!response.ok) {
    return <div>검색 중 문제가 발생했습니다...</div>;
  }

  const searchedMovies: MovieData[] = await response.json();

  return (
    <div className={styles.search_container}>
      {searchedMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
