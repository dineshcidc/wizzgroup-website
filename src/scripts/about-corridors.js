// Section 4 (About Page) — Corridors and Markets
// Handles tab switching and positions the vertical connector line under the active tab.

function updateCorridorConnector(tab) {
  const connector = document.getElementById("corridor-connector");
  if (!connector || !tab || !connector.parentElement) return;
  const wrapperRect = connector.parentElement.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const centerX = tabRect.left + tabRect.width / 2 - wrapperRect.left;
  connector.style.left = `${Math.max(0, centerX)}px`;
}

function getActiveTab() {
  return (
    document.querySelector(".corridor-tab.border-\\[\\#F79A59\\]") ??
    document.querySelector(".corridor-tab")
  );
}

export function setupCorridorTabs() {
  const tabs = document.querySelectorAll(".corridor-tab");

  // Defer first positioning to match Dashboard's deferred module-script behaviour,
  // ensuring the browser has finished layout before measuring.
  requestAnimationFrame(() => updateCorridorConnector(getActiveTab()));

  // Recalculate whenever the viewport is resized (handles all breakpoints).
  window.addEventListener("resize", () => updateCorridorConnector(getActiveTab()));

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("bg-[#FFBD00]/17", "border-[#F79A59]");
        t.classList.add("bg-[#8A8A8A]/10", "border-transparent");
      });
      tab.classList.remove("bg-[#8A8A8A]/10", "border-transparent");
      tab.classList.add("bg-[#FFBD00]/17", "border-[#F79A59]");
      updateCorridorConnector(tab);
    });
  });
}
