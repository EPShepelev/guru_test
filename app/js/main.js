fetch("../data/numbers.json")
  .then((res) => res.json())
  .then((data) => console.log(data));
