import { createReviewAction } from '@/actions/create-review.action';

import styles from './review-editor.module.css';

export default function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section>
      <form className={styles.form_container} action={createReviewAction}>
        <input type="hidden" name="movieId" value={movieId} />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={styles.submit_container}>
          <input required type="text" name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
