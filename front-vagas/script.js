const apiUrl = 'http://backend:8080/vagas';


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('vaga-form')) {
        document.getElementById('vaga-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const vaga = {
                empresa: document.getElementById('empresa').value,
                cargo: document.getElementById('cargo').value,
                dataCandidatura: document.getElementById('dataCandidatura').value,
                salario: parseFloat(document.getElementById('salario').value),
                status: document.getElementById('status').value,
                descricao: document.getElementById('descricao').value,
            };

            await cadastrarVaga(vaga);
            alert('Vaga cadastrada com sucesso!');
            e.target.reset();
        });
    }

    if (document.getElementById('vagas')) {
        listarVagas();
        document.getElementById('filtro').addEventListener('change', listarVagas);
    }

    if (document.getElementById('vaga-detalhes')) {
        const id = new URLSearchParams(window.location.search).get('id');
        if (id) {
            carregarDetalhesVaga(id);
        }
    }

    if (document.getElementById('vaga-edit-form')) {
        document.getElementById('vaga-edit-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = new URLSearchParams(window.location.search).get('id');
            const vaga = {
                empresa: document.getElementById('edit-empresa').value,
                cargo: document.getElementById('edit-cargo').value,
                dataCandidatura: document.getElementById('edit-dataCandidatura').value,
                salario: parseFloat(document.getElementById('edit-salario').value),
                status: document.getElementById('edit-status').value,
                descricao: document.getElementById('edit-descricao').value,
            };

            await editarVaga(id, vaga);
            alert('Vaga atualizada com sucesso!');
            carregarDetalhesVaga(id);
        });
    }

    if (document.getElementById('editar-btn')) {
        document.getElementById('editar-btn').addEventListener('click', () => {
            const form = document.getElementById('vaga-edit-form');
            form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
        });
    }

    if (document.getElementById('excluir-btn')) {
        document.getElementById('excluir-btn').addEventListener('click', async () => {
            const id = new URLSearchParams(window.location.search).get('id');
            const confirmacao = confirm('Tem certeza que deseja excluir esta vaga?');
            if (confirmacao) {
                await excluirVaga(id);
                alert('Vaga excluída com sucesso!');
                window.location.href = 'vagas.html';
            }
        });
    }
});

async function cadastrarVaga(vaga) {
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vaga),
    });
}

async function listarVagas() {
    const response = await fetch(apiUrl);
    const vagas = await response.json();
    const filtro = document.getElementById('filtro').value;

    if (filtro === 'alfabetica') {
        vagas.sort((a, b) => a.cargo.localeCompare(b.cargo));
    } else if (filtro === 'data') {
        vagas.sort((a, b) => new Date(a.dataCandidatura) - new Date(b.dataCandidatura));
    }

    const vagasList = document.getElementById('vagas');
    vagasList.innerHTML = '';

    vagas.forEach(vaga => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.textContent = `${vaga.cargo} - ${vaga.empresa} (Data: ${vaga.dataCandidatura})`;
        link.href = `detalhes.html?id=${vaga.id}`;
        li.appendChild(link);
        vagasList.appendChild(li);
    });
}

async function carregarDetalhesVaga(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const vaga = await response.json();
    const detalhesDiv = document.getElementById('vaga-detalhes');

    detalhesDiv.innerHTML = `
        <h2>${vaga.cargo} - ${vaga.empresa}</h2>
        <p><strong>Data de Candidatura:</strong> ${vaga.dataCandidatura}</p>
        <p><strong>Salário:</strong> R$ ${vaga.salario.toFixed(2)}</p>
        <p><strong>Status:</strong> ${vaga.status}</p>
        <p><strong>Descrição:</strong> ${vaga.descricao}</p>
    `;

    document.getElementById('edit-empresa').value = vaga.empresa;
    document.getElementById('edit-cargo').value = vaga.cargo;
    document.getElementById('edit-dataCandidatura').value = vaga.dataCandidatura;
    document.getElementById('edit-salario').value = vaga.salario;
    document.getElementById('edit-status').value = vaga.status;
    document.getElementById('edit-descricao').value = vaga.descricao;

    document.getElementById('vaga-edit-form').style.display = 'none';
}

async function editarVaga(id, vaga) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vaga),
    });
}

async function excluirVaga(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });
}
