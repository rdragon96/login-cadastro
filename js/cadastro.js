import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://comsaduireftfxvivozu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvbXNhZHVpcmVmdGZ4dml2b3p1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTQ4MjUwMCwiZXhwIjoyMDQxMDU4NTAwfQ.Ut_q7YpCOczYytS_FgR8XCZTdJwNMFGA0skMq4GTzQ0';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');
    const message = document.getElementById('message');

    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newUsername = document.getElementById('newUsername').value;
        const newPassword = document.getElementById('newPassword').value;

        try {
            const { data, error } = await supabase.from('users').insert([
                { username: newUsername, password: newPassword }
            ]);
            if (error) {
                const { data: existingUsers, error: getUsersError } = await supabase.from('users').select('*');
                if (existingUsers.some(user => user.username === newUsername)) {
                    message.textContent = 'Este nome de usuário já existe.';
                    message.style.color = 'red';
                    return;
                }

                console.error('Erro ao cadastrar usuário:', error);
                message.textContent = 'Erro ao processar o cadastro. Tente novamente.';
                message.style.color = 'red';
            } else {
                message.textContent = 'Cadastro realizado com sucesso!';
                message.style.color = 'green';
                cadastroForm.reset();
            }
        } catch (error) {
            console.error('Erro ao processar o cadastro:', error);
            message.textContent = 'Erro ao processar o cadastro. Tente novamente.';
            message.style.color = 'red';
        }
    });
});
