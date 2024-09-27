export default async function delay(ms: number): Promise<string> {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve('');
    }, ms),
  );
}
