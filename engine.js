
        const form = document.getElementById('clienteForm');

        form.addEventListener('submit', function(event) {
        
            event.preventDefault();

            // 2. Ler os valores de todos os campos (<input>).
            // A forma mais fácil é usar o objeto FormData.
            const formData = new FormData(form);

            // 3. Montar um objeto JSON com esses valores.
            // Convertemos os dados do formulário para um objeto simples.
            const data = Object.fromEntries(formData.entries());

            // 4. Fazer uma requisição fetch do tipo POST para a sua API.
            console.log('Enviando para a API:', data); // Útil para depuração

            fetch('http://localhost:8080/api/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Converte o objeto JavaScript em uma string JSON
            })
            .then(response => {
                if (!response.ok) {
                    // Se a resposta do servidor não for de sucesso (ex: erro 500),
                    // nós lançamos um erro para cair no .catch()
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json(); // Pega a resposta da API (o cliente criado)
            })
            .then(clienteCriado => {
                // Se tudo deu certo, a API retorna o cliente que foi salvo no banco.
                alert('Cliente cadastrado com sucesso! ID: ' + clienteCriado.id);
                form.reset(); // Limpa o formulário
            })
            .catch(error => {
                // Se deu algum erro na comunicação ou na API.
                console.error('Erro ao cadastrar cliente:', error);
                alert('Ocorreu um erro ao tentar cadastrar o cliente.');
            });
        });