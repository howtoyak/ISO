const search = document.getElementById("search");
const filters = [...document.querySelectorAll(".filter")];
const docs = [...document.querySelectorAll(".doc")];
const groups = [...document.querySelectorAll(".group")];
const empty = document.getElementById("empty");
let active = "all";
function update() {
  const q = search.value.trim().toLowerCase();
  let visible = 0;
  docs.forEach((card) => {
    const categoryMatch = active === "all" || card.dataset.cat === active;
    const textMatch = (card.dataset.search + " " + card.innerText)
      .toLowerCase()
      .includes(q);
    const show = categoryMatch && textMatch;
    card.style.display = show ? "" : "none";
    if (show) visible++;
  });
  groups.forEach((group) => {
    const any = [...group.querySelectorAll(".doc")].some(
      (card) => card.style.display !== "none",
    );
    group.style.display = any ? "" : "none";
  });
  empty.style.display = visible ? "none" : "block";
}
search.addEventListener("input", update);
filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    active = btn.dataset.filter;
    filters.forEach((b) => b.classList.toggle("active", b === btn));
    update();
  }),
);

const flowModal = document.getElementById("flow-modal");
const openFlow = document.getElementById("open-flow");
if (flowModal && openFlow) {
  openFlow.addEventListener("click", () => flowModal.showModal());
  flowModal.addEventListener("click", (e) => {
    if (e.target === flowModal) flowModal.close();
  });
}
