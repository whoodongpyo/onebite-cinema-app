import { MovieData } from '@/types';

import styles from './page.module.css';
import movies from '@/mock/dummy.json';

export default function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const { id } = params;

  const foundMovie: MovieData | undefined = movies.find(
    (movie) => movie.id === Number(id),
  );

  if (!foundMovie) {
    return '존재하지 않는 영화 정보입니다. 다시 시도해주세요.';
  }

  const {
    // id,
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
