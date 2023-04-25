import "../styles/Infopage.css";

const Infopage = () => {
  return (
    <div className="Infopage">
      <div className="infopage-container">
        <h2>Regolamento</h2>
        <p>
          Il wist è un gioco di carte che si può giocare da 2 a 6 giocatori.
        </p>
        <p>
          Ogni partita è divisa in 8 round, ciascuno con delle diverse regole.
          Nei primi 4 è presente una briscola (cuori, quadri, fiori e picche),
          mentre negli ultimi 4 round non è presente nessuna briscola.
        </p>
        <h3>Chiamata</h3>
        <p>
          All'interno di ogni round vengono distribuite tutte le carte del mazzo
          (il numero totale di carte varia in base al numero di giocatori). A
          questo punto ogni giocatore a turno, partendo da chi è stato scelto
          come primo e procedendo in senso orario, dovrà fare una
          <em> chiamata</em>, ovvero una previsione di quante prese riuscirà a
          fare (quanti turni riuscirà a prendere). Attenzione che l'ultimo
          giocatore che chiama però ha una condizione da rispettare: il totale
          delle chiamata non può essere uguale al numero di carte in mano (e
          quindi alle prese possibili): almeno uno dei giocatori sbaglierà
          sicuramente la chiamata.
        </p>
        <h3>Svolgimento del turno</h3>
        <p>
          Una volta che tutti i giocatori hanno chiamato si procede a giocare il
          round. Il giocatore che ha chiamato per primo dovrà giocare una carta,
          e tutti gli altri giocatori dovranno giocare una carta dello stesso
          seme, se ne hanno, altrimenti sono liberi di giocare qualsiasi carta.
          Alla fine del giro si valuta chi ha preso la mano:
        </p>
        <ul>
          <li>
            se sono state giocare briscole (ad esempio carte di cuori nel primo
            round) ha preso chi ha giocato la carta più alta di briscola;
          </li>
          <li>
            se non sono state giocare briscole ha preso chi ha giocato la carta
            più alta dello stesso seme della prima carta.
          </li>
        </ul>
        <p>
          A questo punto il turno successivo inizia partendo dal giocatore che
          ha preso l'ultima mano
        </p>
        <h3>Conclusione del round e calcolo dei punti</h3>
        <p>
          Quando sono state giocate tutte le carte in mano dei giocatori si
          conclude il round, e si procede al calcolo dei punti in base alla
          chiamata e alle prese effettuate.
        </p>
        <p>I punti vengono calcolati in questo modo:</p>
        <ul>
          <li>
            se un giocatore ha chiamato 0 (Wist):
            <ul>
              <li>
                se ha fatto effettivamente 0 prese allora otterrà 15 punti
                (questi punti cambiano in base al numero di giocatori, vedi
                sezione "Numero di giocatori");
              </li>
              <li>
                se invece ha fatto delle prese, quindi non ha indovinato la
                chiamata, riceverà - 5 punti per ogni presa effettuata;
              </li>
            </ul>
          </li>
          <li>
            se un giocatore non ha chiamato Wist ( e quindi ha chiamato un
            numero tra 1 e 8):
            <ul>
              <li>
                se ha fatto il numero di prese dichiarato allora riceverà n
                <sup>2</sup> + 10 punti, dove n è il numero chiamato;
              </li>
              <li>
                se invece ha fatto un numero di prese diverso da quello
                dichiarato, allora i suoi punti saranno pari al numero stesso di
                prese;
              </li>
            </ul>
          </li>
        </ul>
        <h3>Regole dei round</h3>
        <p>
          Come già anticipato, nei primo quattro round si alternano i 4 semi
          come briscola (cuori, quadri, fiori e picche in ordine).
        </p>
        <p>
          Il quinto round si chiama "Libera", e come si evince dal nome l'unica
          regola è che non ci sono briscole, quindi comanda sempre il primo seme
          che viene giocato. Questa regola sarà sempre presente negli ultimi 4
          round
        </p>
        <p>
          Il sesto round si chiama "La Leo", e qui purtroppo il nome non è di
          aiuto. In questo round, dopo la chiamata, si passano 2 carte al
          giocatore successivo (alla propria sinistra) e se ricevono due da
          quello precedente (da destra).
        </p>
        <p>
          Il settimo round si chiama "Buio", e in questo round si è obbligati a
          chiamare prima di vedere le carte, al buio quindi.
        </p>
        <p>
          Per concludere, l'ottavo round, ovvero la "Wist", in cui tutti i
          giocatori sono obbligati a chiamare Wist, e quindi devono cercare di
          non prendere.
        </p>
        <h3>Conclusione della partita</h3>
        <p>
          Una volta concluso l'ultimo round la partita si conclude, si sommano
          tutti i punteggi fatti durante gli 8 round (non preoccupatevi, ci
          pensa il gioco per voi) e vince il giocatore che ha ottenuto il
          punteggio più alto.
        </p>
        <h3>Partita a 2 giocatori</h3>
        <p>
          Per giocare in 2 giocatori è necessario fare degli accorgimenti.
          Infatti usando le regole scritte sopra sarebbero note anche le carte
          dell'altro giocatore. Per evitare questo problema quindi si usano
          tutte le 48 carte dal 3 all'asso, ma vengono distribuite solo 8 carte
          a testa, lasciando le restanti 32 carte inutilizzate. Una volta finito
          il round le carte utilizzate verranno mescolate nuovamente all'interno
          del mazzo e ne verranno discribuite altre 16 (8 a testa) per iniziare
          un nuovo round.
        </p>
        <h3>Numero di giocatori</h3>
        <p>
          Ci sono diverse regole che cambiano in base al numero di giocatori; in
          questa sezione faremo un riassunto di tutte queste variabili:
        </p>
        <table className="info-table">
          <thead>
            <tr>
              <th>Giocatori</th>
              <th>Carte in mano</th>
              <th>Punti Wist</th>
              <th>Carta bassa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
              <td>8</td>
              <td>50</td>
              <td>3</td>
            </tr>
            <tr>
              <td>3</td>
              <td>8</td>
              <td>25</td>
              <td>9</td>
            </tr>
            <tr>
              <td>4</td>
              <td>12</td>
              <td>25</td>
              <td>3</td>
            </tr>
            <tr>
              <td>5</td>
              <td>8</td>
              <td>15</td>
              <td>5</td>
            </tr>
            <tr>
              <td>6</td>
              <td>8</td>
              <td>15</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer>
        <a href="/">Home page</a>
      </footer>
    </div>
  );
};

export default Infopage;
