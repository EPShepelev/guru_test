// document.querySelectorAll(".tab-title").forEach((elem) => {
//   elem.addEventListener("click", openTab);
// });

// function openTab(e, contentId) {
//   const tabcontent = document.querySelectorAll(".tab-content");
//   tabcontent.forEach((element) => {
//     element.style.display = "none";
//   });

//   const tablinks = document.querySelectorAll(".tab-title");
//   tablinks.forEach((element) => {
//     element.classList.remove("active");
//   });
//   document.getElementById(contentId).style.display = "block";
//   e.currentTarget.classList.add("active");
// }

// function createTableFromJson(tableData) {
//   const tableContainer = document.querySelector(".table-container");
//   for (key in tableData) {
//     let row = `<tr>
//                 <td>${tableData.number}</td>
//                 <td>${tableData.cdate}</td>
//               </tr>`;
//     tableContainer.innerHTML += row;
//   }
// }

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
