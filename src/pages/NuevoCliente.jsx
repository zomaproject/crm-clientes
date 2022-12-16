import { redirect } from 'react-router-dom';
import { useNavigate, Form, useActionData } from 'react-router-dom';
import Error from '../components/Error';
import Formulario from '../components/Formulario';
import { agregarCliente } from '../data/clientes';

export async function action({ request }) {
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

  await agregarCliente(datos);
  return redirect('/');
}

const NuevoCliente = () => {
  const navigate = useNavigate();

  const errores = useActionData();
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Nuevo cliente</h1>
      <p className='mt-3'>
        Llena todos los campos para registrar un nuevo cliente
      </p>

      <div className='flex justify-end'>
        <button
          type='button'
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
          <Formulario />

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

export default NuevoCliente;
