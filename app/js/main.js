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
          let dataCell = document.createElement("td");

          table.appendChild(row);
          row.appendChild(numCell);
          row.appendChild(dataCell);
          numCell.innerHTML = `${elem.number_list[key].number}`;
          dataCell.innerHTML = `${elem.number_list[key].cdate}`;
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

//создаем обработчик для поиска
document.querySelector("#search-input").addEventListener("keyup", function () {
  let searchText = this.value;
  let searchTable = document.querySelector(".table.active");
  searchTable.querySelectorAll("tr").forEach((elem) => {
    if (!elem.outerText.includes(searchText)) {
      elem.style.display = "none";
    } else {
      elem.style.display = "";
    }
  });
});
