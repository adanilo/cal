/*
    Copyright 2013 Alex Danilo

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
function earlier(evt) {
    var cal = document.querySelector('cal-cal');
    cal.setYear(cal.year - 1);
}
function later(evt) {
    var cal = document.querySelector('cal-cal');
    cal.setYear(cal.year + 1);
}
document.getElementById("b4").addEventListener("click", earlier);
document.getElementById("l8r").addEventListener("click", later);
