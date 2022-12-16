import { useNavigate, useActionData,useLoaderData, redirect } from 'react-router-dom';
import { Form } from 'react-router-dom';
import { editarCliente, obtenerCliente } from '../data/clientes';
import Error from './Error';
import Formulario from './Formulario';

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId);

  if (!Object.values(cliente).length) {
    throw new Response('', {
      status: 404,
      statusText: 'Cliente no encontrado',
    });
  }
  return cliente;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  // Validación de los datos

  const errores = [];
  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son oblgatorios');
  }
  let regexEmail = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  );

  if (!regexEmail.test(formData.get('email'))) {
    errores.push('El email no es válido');
  }

  if (errores.length) {
    return errores;
  }

  await editarCliente(params.clienteId, datos)
  return redirect('/');
}

const EditarCliente = () => {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo cliente</h1>
      <p className='mt-3'>
        Llena todos los campos para registrar un nuevo cliente
      </p>

      <div className='flex justify-end'>
        <button
          className='bg-blue-800 text-white px-3 py-1 font-bold uppercase '
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method='post' noValidate>
          <Formulario cliente={cliente} />

          <input
            type='submit'
            value='Registrar Cliente'
            className='bg-blue-800 text-white px-3 py-1 font-bold uppercase text-lg mt-5 w-full '
          />
        </Form>
      </div>
    </>
  );
};

export default EditarCliente;
