/*
Copyright 2013,2020 Alex Danilo

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
class CalDay extends HTMLElement {
	constructor() {
	    super();
	    const host = document.createElement('template');
	    host.innerHTML = this.constructor.template;
	    this.attachShadow({mode: 'open'}).appendChild(host.content.cloneNode(true));
	    this.day = 0;
	}

	static get template() {
    	return `<svg viewBox="0 0 20 20" width="20" height="20">
			<defs>
				<linearGradient id="grey" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="white"/><stop offset="1" stop-color="#bbb"/></linearGradient>
				<linearGradient id="blue" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="white"/><stop offset="1" stop-color="#88f"/></linearGradient>
				<linearGradient id="red" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="white"/><stop offset="1" stop-color="#faa"/></linearGradient>
			</defs>
			<rect x="0.5" y="0.5" width="19" height="19" fill="none" stroke="blue" stroke-width="1px" rx="3"/>
			<text text-anchor="end" x="18" y="16" font-size="14px" font-family="sans-serif"></text>
		</svg>`;
	}
	
	position(x, y) {
		var day = this.shadowRoot.querySelector("svg");
		day.style.cssText = "-webkit-transform: translate(" + x.toFixed(2) + "px, " + y.toFixed(2) + "px);";
	}

	clearDay() {
		var label = this.shadowRoot.querySelector("text");
		label.textContent = "";
	}

	setDay(day) {
		var label = this.shadowRoot.querySelector("text");
		label.textContent = day + "";
		label.setAttribute("fill", "black");
	}

	setBlue() {
		var square = this.shadowRoot.querySelector("rect");
		square.setAttribute("fill", "url(#blue)");
	}

	setGray() {
		var square = this.shadowRoot.querySelector("rect");
		square.setAttribute("fill", "url(#grey)");
	}

	setRed() {
		var square = this.shadowRoot.querySelector("rect");
		square.setAttribute("fill", "url(#red)");
		square.setAttribute("stroke", "#f66");
	}

	setToday() {
		var square = this.shadowRoot.querySelector("rect");
		square.setAttribute("fill", "black");
		var text = this.shadowRoot.querySelector("text");
		text.setAttribute("fill", "white");
	}
}

window.customElements.define('cal-day', CalDay);

export {CalDay};
