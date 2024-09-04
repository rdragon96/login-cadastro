import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://comsaduireftfxvivozu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbXNhZHVpcmVmdGZ4dml2b3p1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTQ4MjUwMCwiZXhwIjoyMDQxMDU4NTAwfQ.Ut_q7YpCOczYytS_FgR8XCZTdJwNMFGA0skMq4GTzQ0';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const { data: users, error: getUsersError } = await supabase.from('users').select('*');

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
