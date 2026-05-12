// Section 2 (Right Column) — Our Presence
// Handles tab switching between regions and fades in the corresponding map/region image.

// Moves the vertical connector line under the center of the given tab element.
function updateConnectorPosition(tab) {
  const connector = document.getElementById("presence-connector");
  if (!connector || !tab) return;
  const wrapperRect = connector.parentElement.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const centerX = tabRect.left + tabRect.width / 2 - wrapperRect.left;
  connector.style.left = `${Math.max(0, centerX)}px`;
}

export function setupPresenceSection(images) {
  const presenceData = {
    gcc: images.gcc,
    "india & sea": images.indiaSea,
    usa: images.usa,
    "rest of the world": images.restOfWorld,
  };

  const presenceWrapper = document.getElementById("presence-section");
  const presenceImage = document.getElementById("presence-image");

  if (!presenceWrapper || !presenceImage) return;

  const presenceTabCard = presenceWrapper.querySelector(".tab-card");
  if (!presenceTabCard) return;

  // Position connector under the initially active tab
  const initialTab =
    Array.from(presenceTabCard.querySelectorAll(".tab-item")).find((t) =>
      t.classList.contains("border-[#F79A59]")
    ) ?? presenceTabCard.querySelector(".tab-item");
  updateConnectorPosition(initialTab);

  presenceTabCard.querySelectorAll(".tab-item").forEach((tab) => {
    tab.addEventListener("click", () => {
      // Move connector line under the clicked tab
      updateConnectorPosition(tab);

      const key = tab.textContent.trim().toLowerCase();
      const imageSrc = presenceData[key] ?? presenceData.gcc;

      presenceImage.style.opacity = "0";
      setTimeout(() => {
        presenceImage.src = imageSrc;
        presenceImage.alt = `${tab.textContent.trim()} image`;
        presenceImage.style.opacity = "1";
      }, 250);
    });
  });
}
