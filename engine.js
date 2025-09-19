// ================== Utilitários ==================
function getUserIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  return Number.isInteger(id) && id > 0 ? id : 1;
}

// ================== Carregar Cliente por ID ==================
function carregarCliente() {
  const form = document.getElementById('clienteForm');
  if (!form) return;

  fetch(`http://localhost:8080/api/clientes/${getUserIdFromUrl()}`)
    .then(res => res.json())
    .then(cliente => {
      Object.entries(cliente).forEach(([key, value]) => {
        const input = document.querySelector(`[name=${key}]`);
        if (input) input.value = value;
      });
    })
    .catch(() => alert('Erro ao carregar cliente.'));
}

// ================== Atualizar Cliente ==================
document.getElementById('updateBtn')?.addEventListener('click', e => {
  e.preventDefault();
  const form = document.getElementById('clienteForm');
  const data = Object.fromEntries(new FormData(form).entries());

  fetch(`http://localhost:8080/api/clientes/${getUserIdFromUrl()}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(cliente => alert('Atualizado com sucesso! ID: ' + cliente.id))
    .catch(() => alert('Erro ao atualizar cliente.'));
});

// ================== Remover Cliente ==================
document.getElementById('deleteBtn')?.addEventListener('click', e => {
  e.preventDefault();
  if (!confirm('Remover cliente?')) return;

  fetch(`http://localhost:8080/api/clientes/${getUserIdFromUrl()}`, {
    method: 'DELETE'
  })
    .then(() => {
      alert('Removido com sucesso!');
      document.getElementById('clienteForm').reset();
    })
    .catch(() => alert('Erro ao remover cliente.'));
});

// ================== Navegação ==================
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('anteriorBtn')?.addEventListener('click', () => {
    const id = Math.max(1, getUserIdFromUrl() - 1);
    window.location.href = `userInfo.html?id=${id}`;
  });

  document.getElementById('proximoBtn')?.addEventListener('click', () => {
    const id = getUserIdFromUrl() + 1;
    window.location.href = `userInfo.html?id=${id}`;
  });

  carregarCliente();
});

// ================== Buscar por Nome Fantasia ==================
function buscarClientePorNome() {
  const nome = document.getElementById('nomeFantasiaInput')?.value;
  const tabela = document.getElementById('resultadoTabela');
  if (!nome || !tabela) return;

  tabela.innerHTML = '';

  fetch(`http://localhost:8080/api/clientes/buscar?nome_fantasia=${encodeURIComponent(nome)}`)
    .then(res => res.json())
    .then(clientes => {
      if (!Array.isArray(clientes)) clientes = [clientes];
      if (clientes.length === 0) {
        tabela.innerHTML = '<tr><td colspan="3">Nenhum cliente encontrado.</td></tr>';
        return;
      }

      clientes.forEach(c => {
        tabela.innerHTML += `
          <tr>
            <td>${c.id}</td>
            <td>${c.nomeFantasia}</td>
            <td><button onclick="window.location.href='userInfo.html?id=${c.id}'">Ver</button></td>
          </tr>
        `;
      });
    })
    .catch(() => alert('Erro ao buscar cliente.'));
}
document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('buscarBtn');
      if (btn) btn.addEventListener('click', buscarClientePorNome);
    });
