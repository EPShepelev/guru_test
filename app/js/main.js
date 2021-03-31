fetch("../data/numbers.json")
  .then((res) => res.json())
  .then((data) => console.log(data));

function openTab(e, contentId) {
  const tabcontent = document.querySelectorAll(".tab-content");
  tabcontent.forEach((element) => {
    element.style.display = "none";
  });

  const tablinks = document.querySelectorAll(".tab-title");
  tablinks.forEach((element) => {
    element.classList.remove("active");
  });
  document.getElementById(contentId).style.display = "block";
  e.currentTarget.classList.add("active");
}
