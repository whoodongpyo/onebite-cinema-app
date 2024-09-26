export default function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  return <div>movie/[id] 페이지 {params.id}</div>;
}
