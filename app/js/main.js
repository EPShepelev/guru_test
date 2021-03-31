const tableTabs = document.querySelector(".table-tabs");
const tableContent = document.querySelector(".table-content");

fetch("../data/numbers.json")
  .then((res) => res.json())
  .then((data) => {
    data.numbers.forEach((elem) => {
      if (elem.is_visible) {
        const headerTab = document.createElement("div");
        const tabel = document.createElement("tabel");

        headerTab.innerHTML = `${elem.alias}`;
        headerTab.classList.add("tab");

        tableTabs.appendChild(headerTab);

        tableContent.appendChild(tabel);
        tabel.classList.add("tabel");
        // tabel.id = `${elem.alias}`;

        // headerTab.onclick = function () {
        //   document.querySelector(`#${elem.alias}`).classList.toggle("hide");
        // };

        for (key in elem.number_list) {
          let row = document.createElement("tr");
          let numCell = document.createElement("td");
          let dataCell = document.createElement("td");

          tabel.appendChild(row);
          row.appendChild(numCell);
          row.appendChild(dataCell);
          numCell.innerHTML = `${elem.number_list[key].number}`;
          dataCell.innerHTML = `${elem.number_list[key].cdate}`;
        }
      }
    });
  });

window.onload = function () {
  const tabs = document.getElementsByClassName("tab");
  const tabel = document.getElementsByClassName("tabel");

  [...tabs].forEach((tab) => tab.addEventListener("click", tabClick));

  function tabClick(event) {
    const tabId = event.target.dataset.id;

    [...tabs].forEach((tab, i) => {
      tab.classList.remove("active");
      tabel[i].classList.remove("active");
    });

    tabs[tabId - 1].classList.add("active");
    sections[tabId - 1].classList.add("active");
  }
};
