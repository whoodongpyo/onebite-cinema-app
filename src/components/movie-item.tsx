import { MovieData } from '@/types';
import Link from 'next/link';
import styles from './movie-item.module.css';
import Image from 'next/image';

export default function MovieItem({
  id,
  title,
  releaseDate,
  company,
  genres,
  subTitle,
  description,
  runtime,
  posterImgUrl,
}: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={styles.container}>
      <Image
        src={posterImgUrl}
        alt={`${title} 포스터`}
        width={263}
        height={395}
        priority={true}
      />
    </Link>
  );
}
