import { Form } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { eliminarCliente } from '../data/clientes';

export async function action({ params }) {
  await eliminarCliente(params.clienteId);
  return redirect('/');
}

const Cliente = ({ cliente }) => {
  const { nombre, empresa, id, email, telefono } = cliente;
  const navigate = useNavigate();
  return (
    <tr className='border-b'>
      <td className='p-6 space-y-2'>
        <p className='text-gray-700 text-2xl'>{nombre}</p>
        <p>{empresa}</p>
      </td>

      <td>
        <p className='text-gray-600'>
          {' '}
          <span className='text-gray-800 uppercase font-bold'>
            Email:{' '}
          </span>{' '}
          {email}
        </p>
        <p className='text-gray-600'>
          {' '}
          <span className='text-gray-800 uppercase font-bold'>
            Telefono:{' '}
          </span>{' '}
          {telefono}
        </p>
      </td>

      <td className='p-6 flex gap-3'>
        <button
          type='button'
          className='text-blue-600 hover:text-blue-700 uppercase font-bold text-xs'
          onClick={() => navigate(`/cliente/${id}/editar`)}
        >
          Editar
        </button>

        <Form
          method='post'
          action={`/cliente/${id}/eliminar/`}
          onSubmit={(e) => {
            if (!confirm('Desea Eliminar este registor')) {
              e.preventDefault();
            }
          }}
        >
          <button
            type='submit'
            className='text-red-600 hover:text-red-700 uppercase font-bold text-xs'
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};

export default Cliente;
