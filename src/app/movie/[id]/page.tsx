import { MovieData } from '@/types';

import styles from './page.module.css';

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
  );

  if (!response.ok) {
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
