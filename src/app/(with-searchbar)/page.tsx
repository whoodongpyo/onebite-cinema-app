import MovieItem from '@/components/movie-item';

import styles from './page.module.css';

import { MovieData } from '@/types';
import delay from '@/util/delay';
import { Suspense } from 'react';

// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정 (부작용: 검색 기능 등이 제대로 동작하지 않는다.)
// 4. error : 페이지를 강제로 Static 페이지로 설정 (Static 으로 설정할 수 없는 이유가 있다면 빌드 오류를 발생시킴)

// dynamic 은 부작용이 발생할 위험이 있으므로 별로 사용을 권장하는 옵션은 아니지만, 알고는 있어야 함.
// export const dynamic = 'auto';

async function AllMovies() {
  await delay(1500);

  // 전체 영화 목록은 현재 데이터가 변경될 일이 없으므로 force-cache 를 적용한다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: 'force-cache' },
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
  await delay(3000);

  // 추천 목록은 계속 무작위로 보여줘야 하기 때문에
  // 특정 시간을 주기로 업데이트하도록 revalidate 로 적용한다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } },
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

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <Suspense fallback={<div>추천 영화 목록을 불러오는 중...</div>}>
          <RecoMovies />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <Suspense fallback={<div>모든 영화 목록을 불러오는 중...</div>}>
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
