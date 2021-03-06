// получаем родительские элементы в которые будем вставлять данные
const tableTabs = document.querySelector(".table-tabs");
const tableContent = document.querySelector(".table-content");

// получаем данные из json, создаем таблицы
fetch("../data/numbers.json")
  .then((res) => res.json())
  .then((data) => {
    data.numbers.forEach((elem, index) => {
      //таблица создается если поле is_visible = true
      if (elem.is_visible) {
        const headerTab = document.createElement("div");
        const table = document.createElement("table");

        //делаем первую букву в названии месяца заглавной
        const monthName =
          elem.alias.charAt(0).toUpperCase() + elem.alias.slice(1);

        headerTab.innerHTML = `${monthName}`;
        headerTab.classList.add("tab");
        headerTab.dataset.id = `${index}`;

        tableTabs.appendChild(headerTab);
        tableContent.appendChild(table);

        table.classList.add("table");
        table.dataset.id = `${index}`;

        for (key in elem.number_list) {
          let row = document.createElement("tr");
          let numCell = document.createElement("td");
          numCell.classList.add("td-number");
          let dataCell = document.createElement("td");

          //обрабатываем дату
          let createDate = new Date(elem.number_list[key].cdate);
          const createMonthCorrectly = (date) => {
            if (date.getMonth() + 1 < 10) {
              return `0${date.getMonth() + 1}`;
            } else {
              return `${date.getMonth() + 1}`;
            }
          };
          let dateToHtml = `${createDate.getDate()}.${createMonthCorrectly(
            createDate
          )}.${createDate.getFullYear()}`;

          table.appendChild(row);
          row.appendChild(numCell);
          row.appendChild(dataCell);
          numCell.innerHTML = `${elem.number_list[key].number}`;
          dataCell.innerHTML = `${dateToHtml}`;
        }
      }
    });
  });

//когда страница полностью сформирована добавляем обработчик click для табов
window.onload = function () {
  const tabs = document.querySelectorAll(".tab");
  const table = document.querySelectorAll(".table");

  //задаем по умолчанию класс active первому табу
  tabs[0].classList.add("active");
  table[0].classList.add("active");

  tabs.forEach(function (tabClicked) {
    tabClicked.addEventListener("click", function (event) {
      let id = event.target.dataset.id,
        content = document.querySelector('.table[data-id="' + id + '"]'),
        activeTab = document.querySelector(".tab.active"),
        activeTable = document.querySelector(".table.active");

      activeTab.classList.remove("active");
      tabClicked.classList.add("active");

      activeTable.classList.remove("active");
      content.classList.add("active");
    });
  });
};

//добавляем обработчик для поиска
document.querySelector("#search-input").addEventListener("keyup", function () {
  let searchText = this.value;
  let searchTable = document.querySelector(".table.active");
  searchTable.querySelectorAll(".td-number").forEach((elem) => {
    if (!elem.outerText.includes(searchText)) {
      elem.parentElement.style.display = "none";
    } else {
      elem.parentElement.style.display = "";
    }
  });
});

// задание 2
function clock() {
  let date = new Date(),
    hours =
      date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours(),
    minutes =
      date.getUTCMinutes() < 10
        ? "0" + date.getUTCMinutes()
        : date.getUTCMinutes(),
    seconds =
      date.getUTCSeconds() < 10
        ? "0" + date.getUTCSeconds()
        : date.getUTCSeconds();
  if (hours >= 12 && hours < 18) {
    // время выводится в консоль по условию задания, можно вывести в блок на страницу и менять содержимое блока - более эстетично
    console.log(
      hours + ":" + minutes + ":" + seconds + " Вот время и настало..."
    );
  } else {
    console.log(hours + ":" + minutes + ":" + seconds);
  }
}

setInterval(clock, 1000);
clock();
