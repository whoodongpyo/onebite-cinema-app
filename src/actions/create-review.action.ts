'use server'; // 서버 액션 설정

import { revalidatePath, revalidateTag } from 'next/cache';

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

    // 1. 특정 주소에 해당하는 페이지만 재검증
    // revalidatePath(`/movie/${movieId}`);

    // 2. 특정 경로의 모든 동적 페이지들을 재검증
    // revalidatePath('/movie/[id]', 'page');

    // 3. 특정 레이아웃을 갖는 모든 페이지들을 재검증
    // revalidatePath('/(with-searchbar)', 'layout');

    // 4. 모든 데이터 재검증
    // revalidatePath('/', 'layout');

    // 5. 태그를 기준으로 데이터 캐시 재검증
    revalidateTag(`review-${movieId}`);
  } catch (error) {
    console.error(error);
    return;
  }
}
