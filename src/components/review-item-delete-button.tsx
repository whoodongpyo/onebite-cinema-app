'use client';

import { useActionState, useEffect, useRef } from 'react';
import { deleteReviewAction } from '@/actions/delete-review.action';

export default function ReviewItemDeleteButton({
  reviewId,
  movieId,
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input type="hidden" name="reviewId" value={reviewId} />
      <input type="hidden" name="movieIed" value={movieId} />
      {isPending ? (
        <button>...</button>
      ) : (
        <button onClick={() => formRef.current?.requestSubmit()}>
          삭제하기
        </button>
      )}
    </form>
  );
}
