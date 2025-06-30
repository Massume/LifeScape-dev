export default function Page({ params }: { params: { id: string } }) {
  return <div>Decision {params.id}</div>;
}
