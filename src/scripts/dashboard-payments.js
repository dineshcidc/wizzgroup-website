// Section 2 (Left Column) — Financial Capabilities
// Handles tab switching (Payments / Lending / Tech Infra) and card carousel pagination.

const CARDS_PER_PAGE = 4;
let paymentsCurrentPage = 0;
let activePaymentsKey = "payments";

function buildTabContentData(images) {
  return {
    payments: {
      title: "Cross Border Payments",
      cards: [
        { label: "B2C Remittances", image: images.b2cRemittances, hoverText: "Businesses sending money directly to customers, like refunds or payouts." },
        { label: "Foreign Exchange", image: images.foreignExchange, hoverText: "Converting one country's currency into another for international transactions." },
        { label: "B2B Remittances", image: images.b2bRemittances, hoverText: "Businesses sending payments to other businesses for goods or services." },
        { label: "WPS Salary payouts", image: images.wpsSalaryPayouts, hoverText: "Employers paying salaries through regulated systems to ensure timely employee payments." },
        { label: "FX Prepaid Cards", image: images.fxPrepaidCards, hoverText: "Preloaded cards for spending in foreign currencies while traveling abroad." },
        { label: "Bill Payments", image: images.billPayments, hoverText: "Paying utility or service bills like electricity, water, or internet." },
      ],
    },
    lending: {
      title: "Secured Lending",
      cards: [
        { label: "Asset - Backed Lending", image: images.assetBackedLending, hoverText: "Loans secured using assets like property, inventory, or equipment as collateral." },
        { label: "Remit Now Pay Later", image: images.remitNowPayLater, hoverText: "Send money instantly and pay the amount back at a later time." },
        { label: "Insurance Premium Finance", image: images.insurancePremiumFinance, hoverText: "Spreading insurance premium payments over time instead of paying the full amount upfront." },
        { label: "Education Loans", image: images.educationLoans, hoverText: "Borrowed funds to pay for education, repaid over time with interest." },
      ],
    },
    techinfra: {
      title: "Technology Infrastructure",
      cards: [
        { label: "Proprietary Core", image: images.proprietaryCore, hoverText: "A company's own built system used to manage its operations and services." },
        { label: "AI-powered decisioning", image: images.aiPoweredDecisioning, hoverText: "Using artificial intelligence to analyze data and make automated business decisions." },
        { label: "Cloud-native & API - first", image: images.cloudNativeApi, hoverText: "Built for cloud environments with APIs enabling easy integration and scalability." },
        { label: "Card issuing platform", image: images.cardIssue, hoverText: "System enabling businesses to create, manage, and distribute payment cards." },
        { label: "Stablecoin Treasury & Liquidity", image: images.stablecoin, hoverText: "Managing stablecoin funds and ensuring sufficient liquidity for transactions and operations." },
      ],
    },
  };
}

function renderPaymentsCards(tabContentData, titleElement, cardsContainer) {
  const content = tabContentData[activePaymentsKey];
  const totalPages = Math.ceil(content.cards.length / CARDS_PER_PAGE);
  const start = paymentsCurrentPage * CARDS_PER_PAGE;
  const pageCards = content.cards.slice(start, start + CARDS_PER_PAGE);
  const paymentsContent = document.getElementById("payments-content");

  function applyUpdate() {
    titleElement.textContent = content.title;
    cardsContainer.innerHTML = pageCards
      .map(
        (card) => `
        <div class="relative group flex items-center justify-between gap-4 bg-[#373737]/12 border border-white/10 rounded-xl p-4 md:p-5 min-h-[110px] md:min-h-[130px] transition duration-300 hover:bg-[#474747]/20">
          <span class="text-white text-sm sm:text-base">${card.label}</span>
          <img src="${card.image}" alt="${card.label}" class="h-16 xl:h-24 w-auto object-contain" />
          ${card.hoverText ? `<div class="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 z-10 w-60 flex flex-col gap-1 text-left bg-[#3F3F3F]/75 backdrop-blur-md border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="padding: 12px"><span class="text-white text-base font-medium leading-tight">${card.label}</span><span class="text-white/75 text-sm leading-snug">${card.hoverText}</span></div>` : ""}
        </div>
      `,
      )
      .join("");

    // Rebuild pagination dots for the current page count
    const dotsContainer = document.getElementById("payments-dots");
    if (dotsContainer) {
      dotsContainer.innerHTML = Array.from({ length: totalPages }, (_, i) =>
        `<span class="w-2 h-2 rounded-full cursor-pointer ${i === paymentsCurrentPage ? "bg-[#BA7F4A]" : "bg-white/40"}" data-page="${i}"></span>`
      ).join("");
      dotsContainer.querySelectorAll("span").forEach((dot) => {
        dot.addEventListener("click", () => {
          paymentsCurrentPage = parseInt(dot.dataset.page);
          renderPaymentsCards(tabContentData, titleElement, cardsContainer);
        });
      });
    }

    if (paymentsContent) paymentsContent.style.opacity = "1";
  }

  if (paymentsContent) {
    paymentsContent.style.opacity = "0";
    setTimeout(applyUpdate, 250);
  } else {
    applyUpdate();
  }
}

// Moves the vertical connector line under the center of the given tab element.
function updateConnectorPosition(tab) {
  const connector = document.getElementById("tab-connector");
  if (!connector || !tab) return;
  const wrapperRect = connector.parentElement.getBoundingClientRect();
  const tabRect = tab.getBoundingClientRect();
  const centerX = tabRect.left + tabRect.width / 2 - wrapperRect.left;
  connector.style.left = `${Math.max(0, centerX)}px`;
}

export function setupPaymentsSection(images) {
  const paymentsWrapper = document.getElementById("payments-section");
  const titleElement = document.getElementById("card-title");
  const cardsContainer = document.getElementById("cards-container");

  if (!paymentsWrapper || !titleElement || !cardsContainer) return;

  const tabContentData = buildTabContentData(images);

  // Carousel previous / next buttons
  const prevBtn = document.getElementById("payments-prev");
  const nextBtn = document.getElementById("payments-next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(tabContentData[activePaymentsKey].cards.length / CARDS_PER_PAGE);
      paymentsCurrentPage = (paymentsCurrentPage - 1 + totalPages) % totalPages;
      renderPaymentsCards(tabContentData, titleElement, cardsContainer);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(tabContentData[activePaymentsKey].cards.length / CARDS_PER_PAGE);
      paymentsCurrentPage = (paymentsCurrentPage + 1) % totalPages;
      renderPaymentsCards(tabContentData, titleElement, cardsContainer);
    });
  }

  // Tab click handler — switch active dataset, reset page, and move connector line
  const paymentsTabCard = paymentsWrapper.querySelector(".tab-card");
  if (paymentsTabCard) {
    // Position connector under the initially active tab
    const initialTab =
      Array.from(paymentsTabCard.querySelectorAll(".tab-item")).find((t) =>
        t.classList.contains("border-[#F79A59]")
      ) ?? paymentsTabCard.querySelector(".tab-item");
    updateConnectorPosition(initialTab);

    paymentsTabCard.querySelectorAll(".tab-item").forEach((tab) => {
      tab.addEventListener("click", () => {
        // Move connector line under the clicked tab
        updateConnectorPosition(tab);

        const label = tab.textContent.trim().toLowerCase();
        if (label === "cross border payments") {
          activePaymentsKey = "payments";
        } else if (label === "secured lending") {
          activePaymentsKey = "lending";
        } else if (label === "technology infrastructure") {
          activePaymentsKey = "techinfra";
        }
        paymentsCurrentPage = 0;
        renderPaymentsCards(tabContentData, titleElement, cardsContainer);
      });
    });
  }
}
