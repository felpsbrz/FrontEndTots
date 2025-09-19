// ================== Cadastrar Novo Cliente (POST) ==================
document.getElementById('clienteForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = document.getElementById('clienteForm');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  console.log('Enviando para a API:', data);

  fetch('http://localhost:8080/api/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro na requisição: ' + response.statusText);
      return response.json();
    })
    .then(clienteCriado => {
      alert('Cliente cadastrado com sucesso! ID: ' + clienteCriado.id);
      form.reset();
    })
    .catch(error => {
      console.error('Erro ao cadastrar cliente:', error);
      alert('Ocorreu um erro ao tentar cadastrar o cliente.');
    });
});
