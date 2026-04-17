async function testRegistration() {
  const url = 'https://system-kyron.vercel.app/api/auth/register';
  const data = {
    tipo: 'juridico',
    razonSocial: 'Empresa de Prueba ' + Date.now(),
    rif: 'J-12345678-9',
    tipo_empresa: 'Sociedad Anónima',
    actividad_economica: 'Servicios de Tecnología',
    codigo_ciiu: '6201',
    fecha_constitucion: '2024-01-01',
    registro_mercantil: 'Registro Mercantil Primero de Caracas',
    capital_social: '10000',
    telefono: '04121234567',
    telefono_alt: '2121234567',
    estado_empresa: 'Distrito Capital',
    municipio_empresa: 'Libertador',
    direccion: 'Av. Urdaneta, Edf. Prueba',
    repNombre: 'Juan',
    repApellido: 'Pérez',
    repCedula: 'V-12345678',
    rep_cargo: 'Presidente',
    rep_telefono: '04121234567',
    repEmail: 'prueba' + Date.now() + '@example.com',
    password: 'StrongP@ssw0rd!123',
    modules: [{ id: 'asesoria_contable', label: 'Asesoría Contable' }],
    plan: 'contable_esencial',
    plan_monto: 8
  };

  console.log('Testing registration with data:', JSON.stringify(data, null, 2));

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

testRegistration();
