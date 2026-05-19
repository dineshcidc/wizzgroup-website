// Section 4 (About Page) — Corridors and Markets
// Handles tab switching and positions the vertical connector line under the active tab.

// animated=true  → smooth slide (used on tab click)
// animated=false → instant snap (used on scroll / resize)
function updateCorridorConnector(tab, animated = false) {
  const connector = document.getElementById("corridor-connector");
  if (!connector || !tab || !connector.parentElement) return;
  const wrapperRect = connector.parentElement.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const centerX = tabRect.left + tabRect.width / 2 - wrapperRect.left;
  connector.style.transition = animated ? "left 0.3s ease" : "none";
  connector.style.left = `${centerX}px`;
}

function flashDesktopImage() {
  const img = document.getElementById("corridor-desktop-img");
  if (!img) return;
  img.style.opacity = "0";
  img.style.filter = "blur(6px)";
  setTimeout(() => {
    img.style.opacity = "";
    img.style.filter = "";
  }, 180);
}

function updateMobileImage(index) {
  document.querySelectorAll(".corridor-mobile-img").forEach((img) => {
    img.classList.add("hidden");
  });
  const target = document.querySelector(
    `.corridor-mobile-img[data-tab-index="${index}"]`,
  );
  if (target) target.classList.remove("hidden");
}

function getActiveTab() {
  return (
    document.querySelector(".corridor-tab.border-\\[\\#F79A59\\]") ??
    document.querySelector(".corridor-tab")
  );
}

export function setupCorridorTabs() {
  const tabs = document.querySelectorAll(".corridor-tab");

  requestAnimationFrame(() => updateCorridorConnector(getActiveTab(), false));

  window.addEventListener("resize", () =>
    updateCorridorConnector(getActiveTab(), false),
  );

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("bg-[#FFBD00]/17", "border-[#F79A59]");
        t.classList.add("bg-[#8A8A8A]/10", "border-transparent");
      });
      tab.classList.remove("bg-[#8A8A8A]/10", "border-transparent");
      tab.classList.add("bg-[#FFBD00]/17", "border-[#F79A59]");
      updateCorridorConnector(tab, true);
      updateMobileImage(tab.dataset.tabIndex);
      flashDesktopImage();
    });
  });
}
