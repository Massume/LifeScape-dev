export default function Page({ params }: { params: { id: string } }) {
  return <div>Street {params.id}</div>;
}
