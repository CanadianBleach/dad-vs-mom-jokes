export default class ScoreTile extends HTMLElement {
	constructor(rank, score, joke) {
        // This is the only way it wouldnt append to string
        rank++;
		super();
		this.innerHTML =
			`<div class="columns is-mobile">
            <div class="column is-one-fifth has-text-centered">
              <p class="is-size-3">${rank})</p>
            </div>
            <div class="column is-one-fifth has-text-centered">
              <p class="is-size-3">${score}</p>
            </div>
            <div class="column has-text-left">
              <p class="is-size-5">${joke}</p>
            </div>
          </div>`;
	}
}

if ('customElements' in window) {
	customElements.define('score-tile', ScoreTile);
}