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
class CalMonth extends HTMLElement {
	constructor() {
	    super();
	    const host = document.createElement('template');
	    host.innerHTML = this.constructor.template;
	    this.attachShadow({mode: 'open'}).appendChild(host.content.cloneNode(true));
	    this.month = 1;
		this.offset = 0;
	}

	static get template() {
    	return `<style>
			    cal-day {
					position: absolute;
					left: 0;
					top: 0;
				}
				.monthcontainer {
					position: absolute;
					left: 0;
					top: 0;			
				}
				.monthname {
					min-width: 140px;
					text-align: center;
					line-height:75%;
				}
				div {
					font-family: sans-serif;
				}
				span {
					display: inline-block;
					font-size: 8pt;
					width: 20px;
					text-align: center;
				}
			  </style>
			  <div class="monthcontainer">
				  <div class="monthname">Month</div>
				  <div>
				  	  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
				  </div>
				  <div class="days">
				      <cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day>
				      <cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day>
				      <cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day>
				      <cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day>
				      <cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day>
				      <cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day><cal-day></cal-day>
				  </div>
			  </div>`;
	}

	connectedCallback() {
		if (this !== window) {
			var days = this.shadowRoot.querySelectorAll("cal-day");
			if (days.length == 42) {
				// Lay them out (6 weeks of 7 days)
				for (var row = 0; row < 6; row++) {
					days[row * 7].setRed();
					for (var col = 0; col < 7; col++) {
						var x = col * 20;
						var y = row * 20 + 30;	// 20 for each row + 20 for month name
						days[row * 7 + col].position(x, y);
					}
				}						
			}
			this.setMonth(this.month);
		}		
	}

	setMonth(month) {
		var label = this.shadowRoot.querySelector(".monthname");
		if ((0 < month && month < 13) && label !== "undefined") {
			switch (month) {
			case 1: label.textContent = "January"; break;
			case 2: label.textContent = "February"; break;
			case 3: label.textContent = "March"; break;
			case 4: label.textContent = "April"; break;
			case 5: label.textContent = "May"; break;
			case 6: label.textContent = "June"; break;
			case 7: label.textContent = "July"; break;
			case 8: label.textContent = "August"; break;
			case 9: label.textContent = "September"; break;
			case 10: label.textContent = "October"; break;
			case 11: label.textContent = "November"; break;
			case 12: label.textContent = "December"; break;
			}
		}
	}

	setDays(start, number) {		// Start day of the of the month (Sunday == 0), no. days in month
		this.offset = start;
		if ((start + number) < 43) {
			var days = this.shadowRoot.querySelectorAll("cal-day");
			for (var i = 0; i < start; i++) {
				if ((i % 7) == 0)
					days[i].setRed();
				else
					days[i].setBlue();
				days[i].clearDay();
			}
			for (var day = start; day < start + number; day++) {
				days[day].setDay(day - start + 1);
				days[day].setGray();
			}
			for (; day < 42; day++) {
				if ((day % 7) == 0)
					days[day].setRed();
				else
					days[day].setBlue();
				days[day].clearDay();
			}
		}
	}

	setToday(day) {
		var days = this.shadowRoot.querySelectorAll("cal-day");
		days[this.offset + day].setToday();
	}

	position(x, y) {
		var month = this.shadowRoot.querySelector(".monthcontainer");
		month.style.cssText = "-webkit-transform: translate(" + x.toFixed(2) + "px, " + y.toFixed(2) + "px);";
	}
}

window.customElements.define('cal-month', CalMonth);

export {CalMonth};
