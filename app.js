const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const habits = [
"Gym",
"Run",
"Spanish",
"Reading",
"10k Steps"
];

let tracker = loadData();

function loadData() {

const saved = localStorage.getItem("weeklyTracker");

if (saved) {
return JSON.parse(saved);
}

const data = {};

habits.forEach(habit => {
data[habit] = Array(7).fill(false);
});

return data;

}

function saveData() {
localStorage.setItem("weeklyTracker", JSON.stringify(tracker));
}

function toggleHabit(habit, day) {

tracker[habit][day] = !tracker[habit][day];

saveData();

render();

}

function render() {

const container = document.getElementById("tracker");

container.innerHTML = "";

const table = document.createElement("table");

const header = document.createElement("tr");

const habitHeader = document.createElement("th");
habitHeader.textContent = "Habit";
header.appendChild(habitHeader);

days.forEach(day => {

const th = document.createElement("th");
th.textContent = day;

header.appendChild(th);

});

table.appendChild(header);

habits.forEach(habit => {

const row = document.createElement("tr");

const label = document.createElement("td");
label.textContent = habit;

row.appendChild(label);

days.forEach((day, index) => {

const cell = document.createElement("td");

const btn = document.createElement("button");

if (tracker[habit][index]) {
btn.classList.add("complete");
}

btn.addEventListener("click", () => {
toggleHabit(habit, index);
});

cell.appendChild(btn);

row.appendChild(cell);

});

table.appendChild(row);

});

container.appendChild(table);

}

document.getElementById("reset").addEventListener("click", () => {

const confirmed = confirm("Reset the week?");

if (confirmed) {

localStorage.removeItem("weeklyTracker");

tracker = loadData();

render();

}

});

render();
