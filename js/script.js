document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('data/users.json');
            const users = await response.json();

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                message.textContent = 'Login bem-sucedido!';
                message.style.color = 'green';
            } else {
                message.textContent = 'Usuário ou senha inválidos.';
                message.style.color = 'red';
            }
        } catch (error) {
            console.error('Erro ao carregar os dados de usuários:', error);
            message.textContent = 'Erro ao processar o login. Tente novamente.';
            message.style.color = 'red';
        }
    });
});