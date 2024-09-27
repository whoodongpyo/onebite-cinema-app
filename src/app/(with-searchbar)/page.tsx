import MovieItem from '@/components/movie-item';

import styles from './page.module.css';

import { MovieData } from '@/types';

async function AllMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
  );

  if (!response.ok) {
    return <div>모든 영화를 불러오는 중 오류가 발생했습니다...</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return (
    <div className={styles.all_container}>
      {allMovies.map((movie) => (
        <MovieItem key={`all-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

async function RecoMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
  );

  if (!response.ok) {
    return <div>추천 영화를 불러오는 중 오류가 발생했습니다...</div>;
  }

  const recoMovies: MovieData[] = await response.json();

  return (
    <div className={styles.reco_container}>
      {recoMovies.map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <RecoMovies />
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <AllMovies />
      </section>
    </div>
  );
}
