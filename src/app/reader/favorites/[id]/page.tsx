
export default function Favorite({ params }: { params: { id: string } }) {

  return (
    <div>
      <h1>Carpeta Favorita: {params.id}</h1>
      
    </div>
  );
}