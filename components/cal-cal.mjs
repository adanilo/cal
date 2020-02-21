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

import {CalDay} from './cal-day.mjs';
import {CalMonth} from './cal-month.mjs';

class CalCal extends HTMLElement {
	constructor() {
	    super();
	    const host = document.createElement('template');
	    host.innerHTML = this.constructor.template;
	    this.attachShadow({mode: 'open'}).appendChild(host.content.cloneNode(true));
	    this.yearElement = this.shadowRoot.querySelector('h2');
		this.year = 1971;
		this.yearElement.textContent = this.year + '';
		this._curyear = 0;
		this._curmonth = 0;
		this._curday = 0;
	}

	static get template() {
    	return `<style>
			  	cal-month {
					position: absolute;
					left: 0;
					top: 0;
				}
				.calcontainer {
					position: absolute;
					left: 0;
					top: 0;			
				}
				.year {
					text-align: center;
					font-family: sans-serif;
					min-width: 460px;
				}
			  </style>
			  <div class="calcontainer">
			  	<div class="year"><h2></h2></div>
				<cal-month></cal-month><cal-month></cal-month><cal-month></cal-month>
				<cal-month></cal-month><cal-month></cal-month><cal-month></cal-month>
				<cal-month></cal-month><cal-month></cal-month><cal-month></cal-month>
				<cal-month></cal-month><cal-month></cal-month><cal-month></cal-month>
			  </div>`;
	}

	isLeap(year) {
	    if ((((year % 4) == 0) && ((year % 100) != 0)) || (year % 400) == 0) {
	        return true;
		}
		return false;
	}

	daysPerYear(year) {
		if (this.isLeap(year))
			return 366;
		else
			return 365;
	}

	startDay(year) {
		var off1970 = 4;	// 1970 started on Thursday
		var days = off1970;
		if (year >= 1970) {
			for (var i = 1970; i < year; i++) {
				days += this.daysPerYear(i);
			}
		}
		else {
			for (var i = 1970; i > year; i--) {
				days -= this.daysPerYear(i);
			}
			if (this.isLeap(year))	// Going backwards we need to compensate
				days--;
			days = (7 - ((-days) % 7));
		}
		return days % 7;
	}

	setYear(year) {
		var month = this.shadowRoot.querySelectorAll("cal-month");
		var days = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		var offset = this.startDay(year);

		this.year = year;
		this.yearElement.textContent = this.year + '';

		var isleap = this.isLeap(this.year);

		if (month.length == 12) {
			for (var row = 0; row < 4; row++) {
				for (var col = 0; col < 3; col++) {
					var x = col * 160;
					var y = row * 160 + 60;		// 60 for the year
					var index = row * 3 + col;
					month[index].position(x, y);
					month[index].setMonth(row * 3 + col + 1);
					if (index == 1 && isleap) {
						month[index].setDays(offset, days[index] + 1);
						offset++;	// Compensate for leap day
					}
					else {
						month[index].setDays(offset, days[index]);
					}
					offset = (days[index] + offset) % 7;
					if (index == this._curmonth && year == this._curyear)
						month[index].setToday(this._curday);
				}
			}
		}
	}

	setToday(y, m, d) {
		this._curyear = y;
		this._curmonth = m - 1;
		this._curday = d - 1;
	}

	connectedCallback() {
		var dobj = new Date;
		this.setToday(dobj.getFullYear(), dobj.getMonth() + 1, dobj.getDate());
		const yearValue = this.getAttribute('year');
		if (yearValue) {
			this.setYear(Number(yearValue));
		} else {
			this.setYear(dobj.getFullYear());
		}
	}
}

window.customElements.define('cal-cal', CalCal);

export {CalCal};

