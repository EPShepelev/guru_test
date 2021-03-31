const tableTabs = document.querySelector(".table-tabs");
const tableContainer = document.querySelector(".table-container");

fetch("../data/numbers.json")
  .then((res) => res.json())
  .then((data) => {
    data.numbers.forEach((elem) => {
      if (elem.is_visible) {
        const header = document.createElement("div");
        const tabel = document.createElement("tabel");

        header.innerHTML = `${elem.alias}`;
        tableTabs.appendChild(header);

        tableContainer.appendChild(tabel);
        tabel.classList.add("tabel-content");

        for (key in elem.number_list) {
          tabel.insertAdjacentHTML(
            "beforeend",
            `<tr>
          <td>${elem.number_list[key].number}</td>
          <td>${elem.number_list[key].cdate}</td>
        </tr>`
          );
        }
      }
    });
  });
