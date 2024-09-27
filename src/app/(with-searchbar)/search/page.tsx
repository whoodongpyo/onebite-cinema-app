import MovieItem from '@/components/movie-item';

import styles from './page.module.css';
import movies from '@/mock/dummy.json';

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const { q } = searchParams;

  const filteredMovies = q
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(q.toString().toLowerCase()),
      )
    : movies;

  return (
    <div className={styles.search_container}>
      {filteredMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
