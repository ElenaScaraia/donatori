const muovi = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
          console.log(entry);
          if (entry.isIntersecting) {

              entry.target.classList.add('mostra');
              observer.unobserve(entry.target); // Stop observing once animation is complete
          }
      });
  });

  const nascosti = document.querySelectorAll('.nascosto');
  nascosti.forEach((element) => muovi.observe(element));
//------------api--------------

// Funzione per effettuare una richiesta GET a un'API
function fetchAPI(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error('Errore:', error));
}

// Funzione per ottenere e visualizzare i donatori di sangue
async function getDonatori() {
  const utentiUrl = "https://andrianorica.alwaysdata.net/api_donazione/utenti";
  const donazioniUrl = "https://andrianorica.alwaysdata.net/api_donazione/donazione";

  const utentiResponse = await fetchAPI(utentiUrl);
  const donazioniResponse = await fetchAPI(donazioniUrl);

  // Unisco le due tabelle trammite id degli utenti
  const utenti = utentiResponse.reduce((map, utente) => {
    map[utente.id] = utente.nome_completo;
    return map;
  }, {});

  // Creiamo le card per i donatori di sangue
  const donatoriHTML = donazioniResponse.map(donazione => {
    const nomeCompleto = utenti[donazione.utente];
    const tipoSangue = utentiResponse.find(utente => utente.id === donazione.utente).tipo_sangue;
    return `
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Donatore: ${nomeCompleto}</h5>
            <p class="card-text">Tipo di Sangue: ${tipoSangue}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Renderizzo
  document.getElementById('donatori').innerHTML = donatoriHTML;
}

// Facciamo vedere i donatori una volta che la pagina si è caricata
document.addEventListener("DOMContentLoaded", getDonatori);