document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    Promise.all([
        fetch('/api/tabella1').then(response => response.json()),
        fetch('/api/tabella2').then(response => response.json())
    ]).then(([tabella1, tabella2]) => {
        const combinedData = tabella1.map(item1 => {
            const userInfo = tabella2.find(item2 => item2.id === item1.utente);
            return { ...item1, ...userInfo };
        });

        combinedData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'col-md-4';
            card.innerHTML = `
                <div class="card mb-3 card-custom">
                    <div class="card-body">
                        <h5 class="card-title">ID: ${item.id}</h5>
                        <p class="card-text">Nome Completo: ${item.nome_completo}</p>
                        <p class="card-text">Tipo Sangue: ${item.tipo_sangue}</p>
                    </div>
                </div>
            `;
            content.appendChild(card);
        });
    }).catch(error => console.error('Error fetching data:', error));
});
