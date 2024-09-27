import { MovieData } from '@/types';

import styles from './page.module.css';
import { notFound } from 'next/navigation';

// 정적으로 생성한 파라미터 외에는 모두 404로 보내고 싶다면
export const dynamicParams = false;

// 약속된 이름의 함수 ㅣ getStaticPaths 와 유사
export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
  );

  if (!response.ok) {
    console.error('전체 영화 정보를 불러오는 중 에러가 발생했습니다.');
    return [];
  }

  const movies: MovieData[] = await response.json();
  return movies.map((movie) => ({ id: movie.id.toString() }));
}
export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  // 현재 영화 정보는 변경될 일이 없으므로, force-cache 로 설정한다.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
    { cache: 'force-cache' },
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }

    return <div>영화 정보를 불러오는 중 문제가 발생했습니다...</div>;
  }

  const foundMovie: MovieData = await response.json();

  const {
    id,
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = foundMovie;

  return (
    <div className={styles.container}>
      <div
        className={styles.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} alt={title} />
      </div>
      <div className={styles.info_container}>
        <div>
          <h2>{title}</h2>
          <div>
            {releaseDate} / {genres.join(', ')} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className={styles.subTitle}>{subTitle}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </div>
  );
}
