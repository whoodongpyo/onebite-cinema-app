'use server'; // 서버 액션 설정

import { revalidatePath, revalidateTag } from 'next/cache';
import delay from '@/util/delay';

export async function createReviewAction(
  previousState: any,
  formData: FormData,
) {
  const movieId = formData.get('movieId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  await delay(2000);

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 입력해 주세요.',
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/1`,
      {
        method: 'POST',
        body: JSON.stringify({ movieId, content, author }),
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${movieId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다. : ${error}`,
    };
  }
}
