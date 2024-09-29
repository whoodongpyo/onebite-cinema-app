'use client';

import { useActionState, useEffect } from 'react';
import { createReviewAction } from '@/actions/create-review.action';

import styles from './review-editor.module.css';

export default function ReviewEditor({ movieId }: { movieId: string }) {
  // state : Action 이 return 한 결과가 담긴다.
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form className={styles.form_container} action={formAction}>
        <input type="hidden" name="movieId" value={movieId} />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={styles.submit_container}>
          <input
            required
            disabled={isPending}
            type="text"
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {isPending ? '...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}
