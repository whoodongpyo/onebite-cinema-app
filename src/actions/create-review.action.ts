'use server'; // 서버 액션 설정

import { revalidatePath } from 'next/cache';

export async function createReviewAction(formData: FormData) {
  const movieId = formData.get('movieId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!movieId || !content || !author) return;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ movieId, content, author }),
      },
    );

    console.log(response.status);

    revalidatePath(`/movie/${movieId}`);
    // 1) 서버 컴포넌트 내부에서만 호출할 수 있다.
    // 2) 해당 페이지에 포함된 캐시들을 모두 PURGE 한다. -> force-cache 로 설정되어 있어도 캐시들이 적용되지 않는다.
    // 3) 풀 라우트 캐시도 PURGE 하고, 새로운 페이지를 풀 라우트 캐시로 저장하지 않는다. (같은 페이지에 다시 접속해야 한다.)
  } catch (error) {
    console.error(error);
    return;
  }
}
