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

  const handleDeleteReview = () => {
    if (confirm('해당 리뷰를 정말 삭제하시겠습니까?')) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form ref={formRef} action={formAction}>
      <input type="hidden" name="reviewId" value={reviewId} />
      <input type="hidden" name="movieIed" value={movieId} />
      {isPending ? (
        <button disabled={isPending}>...삭제중...</button>
      ) : (
        <button onClick={handleDeleteReview}>삭제하기</button>
      )}
    </form>
  );
}
