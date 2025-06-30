export default function Page({ params }: { params: { id: string } }) {
  return <div>District {params.id}</div>;
}
