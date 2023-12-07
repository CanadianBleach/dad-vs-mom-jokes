export default class ScoreTile extends HTMLElement {
	constructor(rank, score, joke) {
        // This is the only way it wouldnt append to string
        rank++;
		super();
		this.innerHTML =
			`<div class="columns is-mobile">
            <div class="column is-one-fifth has-text-right">
              <p class="bd-notification is-danger">${rank}</p>
            </div>
            <div class="column is-one-fifth has-text-left">
              <p class="bd-notification is-danger">${score}</p>
            </div>
            <div class="column has-text-left">
              <p class="bd-notification is-danger">${joke}</p>
            </div>
          </div>`;
	}
}

if ('customElements' in window) {
	customElements.define('score-tile', ScoreTile);
}