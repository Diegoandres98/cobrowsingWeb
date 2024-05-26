import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function User({ user }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: user.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: '#d8b4fe', // Aplicamos el color azul de fondo
    padding: '5px', // Ajustamos el relleno
    borderRadius: '20px', // Radios de borde en las esquinas
    marginBottom: '3px' 
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-blue-500 p-4 rounded-full shadow-md my-2 text-slate-950"
    >
      <h3 style={{ textAlign: 'center' }}>
        {user.client_name} - {user.collectionAddress} - {user.collector_username}- {user.borrowedValue}
      </h3>
    </div>
  );
}

export default User;
