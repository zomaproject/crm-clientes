export async function obtenerClientes() {
  const clientes = await fetch(import.meta.env.VITE_API_URL).then((res) =>
    res.json()
  );
  return clientes;
}

export async function obtenerCliente(id) {
  const cliente = await fetch(`${import.meta.env.VITE_API_URL}/${id}`).then(
    (res) => res.json()
  );
  return cliente;
}

export async function agregarCliente(datos) {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: { 'Content-Type': 'application/json' },
    });
    await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function editarCliente(id, datos) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(datos),
      headers: { 'Content-Type': 'application/json' },
    });
    await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function eliminarCliente(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'DELETE',
    });
    await res.json();
  } catch (error) {
    console.log(error);
  }
}
