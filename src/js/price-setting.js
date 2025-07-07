document.addEventListener('DOMContentLoaded', function () {
  // Template for range slider content (used for Возраст and Сумма кредита)
  const rangeSliderTemplate = `
    <div class="flex">
      <div class="gap-4 items-center flex w-full">
        <div class="range-slider-container flex-1">
          <label class="text-xs leading-[18px] text-[#707D89] mb-[6px] block"></label>
          <input class="form-control" type="text" placeholder="18 — 25" readonly>
          <div class="range-slider"></div>
        </div>
        <div class="space-y-[6px] w-[100px]">
          <label class="text-xs text-gray-base">Стоимость, ₽</label>
          <input type="text" class="form-control">
        </div>
        <button class="w-[18px] h-[18px] flex items-center justify-center mt-[18px] delete-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.75 1.25H10.25M1.25 3.5H14.75M13.25 3.5L12.724 11.3895C12.6451 12.5732 12.6057 13.165 12.35 13.6138C12.1249 14.0088 11.7854 14.3265 11.3762 14.5248C10.9115 14.75 10.3183 14.75 9.13201 14.75H6.86799C5.68168 14.75 5.08852 14.75 4.62375 14.5248C4.21457 14.3265 3.87507 14.0088 3.64999 13.6138C3.39433 13.165 3.35488 12.5732 3.27596 11.3895L2.75 3.5M6.5 6.875V10.625M9.5 6.875V10.625" stroke="#707D89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  `;

  // Function to add new content
  function addNewContent(button) {
    const section = button.closest('.pt-6');
    const sectionTitle = section.querySelector('h3').textContent;
    const container = section.querySelector('.mt-6.space-y-6');

    if (!container) {
      console.error('Container not found for section:', sectionTitle);
      return;
    }

    // Create a new div to hold the content
    const newContent = document.createElement('div');
    newContent.innerHTML = rangeSliderTemplate;

    // Append the new content
    container.appendChild(newContent);

    // Update label text
    const label = newContent.querySelector('label');
    if (label) {
      label.textContent = sectionTitle === 'Сумма кредита' ? 'Сумма кредита' : 'Возраст';
    }

    // Add event listener to delete button
    const deleteBtn = newContent.querySelector('.delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        newContent.remove();
      });
    }

    // Ensure container is visible
    container.classList.remove('hidden');
  }

  // Add event listeners to all add buttons
  const addButtons = document.querySelectorAll('.add-btn');
  addButtons.forEach(button => {
    button.addEventListener('click', () => addNewContent(button));
  });

  // Handle modal close
  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.getElementById('add-cart');
      modal.classList.remove('show');
    });
  });

  // Add delete functionality to existing content
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.flex').remove();
    });
  });
});

const cards = document.querySelectorAll(".card-edit-el");

cards.forEach(card => {
  try {
    const tooltip = card.querySelector(".tooltip-box");
    const tooltipBtn = card.querySelector(".tooltip-btn");

    tooltipBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // btn bosilganda tashqi bosish deb hisoblanmasin
      tooltip.classList.toggle("block");
      tooltip.classList.toggle("hidden");
      tooltipBtn.classList.toggle('active');
    });

    // Tooltip ichida bosilsa, tashqi bosishga kirmasin
    tooltip.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Hujjatda istalgan joy bosilsa, tooltipni yopamiz
    document.addEventListener("click", () => {
      tooltip.classList.remove("block");
      tooltip.classList.add("hidden");
      tooltipBtn.classList.remove('active');
    });

  } catch (error) {
    console.error(error);
  }
});

const priceTabs = document.querySelector(".price-tabs");

if (priceTabs) {
  const tabLists = priceTabs.querySelectorAll(".tab-list");
  const tabContents = priceTabs.querySelectorAll(".tab-content");

  // Default holat: faqat birinchi content ko'rinadi
  tabContents.forEach((c, i) => {
    if (i === 0) {
      c.classList.add("active");
      c.classList.remove("hidden");
    } else {
      c.classList.add("hidden");
      c.classList.remove("active");
    }
  });

  tabLists.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // remove active class from all tabs
      tabLists.forEach(t => t.classList.remove("active"));
      // hide all contents
      tabContents.forEach(c => {
        c.classList.add("hidden");
        c.classList.remove("active");
      });

      // add active to clicked tab
      tab.classList.add("active");
      // show corresponding content
      tabContents[index].classList.remove("hidden");
      tabContents[index].classList.add("active");
    });
  });
}


const accordions = document.querySelectorAll(".accordion");
accordions.forEach(accordion => {
  const accordionHeader = accordion.querySelector(".accordion-header");
  const accordionContent = accordion.querySelector(".accordion-content");

  accordionHeader.addEventListener("click", () => {
    accordionContent.classList.toggle("active")
  })
})
