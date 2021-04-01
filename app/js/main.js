const tableTabs = document.querySelector(".table-tabs");
const tableContent = document.querySelector(".table-content");

fetch("../data/numbers.json")
  .then((res) => res.json())
  .then((data) => {
    data.numbers.forEach((elem, index) => {
      if (elem.is_visible) {
        const headerTab = document.createElement("div");
        const table = document.createElement("table");
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

window.onload = function () {
  const tabs = document.querySelectorAll(".tab");
  const table = document.querySelectorAll(".table");
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
