// ! 클라이언트에서 발생한 오류에도 대응할 수 있도록 클라이언트 컴포넌트로 설정해야 한다.
'use client';

import { startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>영화 검색 과정에서 오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러온다. (비동기)
            reset(); // 에러 상태를 초기화하고 컴포넌트들을 다시 렌더링한다.
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
