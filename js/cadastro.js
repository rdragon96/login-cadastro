document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');
    const message = document.getElementById('message');

    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        try {
            const response = await fetch('data/users.json');
            let users = await response.json();

            // Verificar se o usuário já existe
            if (users.some(user => user.username === newUsername)) {
                message.textContent = 'Este nome de usuário já existe.';
                message.style.color = 'red';
                return;
            }

            // Adicionar novo usuário
            users.push({ username: newUsername, password: newPassword });

            // Criar blob e link para download
            const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'users.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            message.textContent = 'Cadastro realizado com sucesso! O arquivo JSON foi baixado.';
            message.style.color = 'green';
            cadastroForm.reset();
        } catch (error) {
            console.error('Erro ao processar o cadastro:', error);
            message.textContent = 'Erro ao processar o cadastro. Tente novamente.';
            message.style.color = 'red';
        }
    });
});