import styles from './review-item.module.css';
import { ReviewData } from '@/types';

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div>
      <div>{author}</div>
      <div>{content}</div>
      <div>
        <div>{new Date(createdAt).toLocaleString()}</div>
        <div>
          <button>삭제하기</button>
        </div>
      </div>
    </div>
  );
}
