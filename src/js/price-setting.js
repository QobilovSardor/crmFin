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
    accordionContent.classList.toggle("active");
    accordionHeader.classList.toggle("active")
  })
})

const dropdownContainer = document.querySelectorAll(".dropdown-container");
dropdownContainer.forEach(dropdown => {
  const dropdownBtn = dropdown.querySelector(".dropdown-btn");
  const dropdownContent = dropdown.querySelector(".dropdown-box");

  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownContent.classList.toggle("block");
    dropdownContent.classList.toggle("hidden");
    dropdownBtn.classList.toggle('active');
  });
})


const dropdownContainerTwo = document.querySelectorAll(".dropdown-container-two");
dropdownContainerTwo.forEach(dropdown => {
  const dropdownBtn = dropdown.querySelector(".dropdown-btn");
  const dropdownContent = dropdown.querySelector(".dropdown-box");
  console.log(dropdown);

  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active')
    dropdownContent.classList.toggle("block");
    dropdownContent.classList.toggle("hidden");
    dropdownBtn.classList.toggle('active');
  });
})
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('.add-price-btn');
  const container = document.querySelector('.space-y-4 > .space-y-4'); // Adjust to .add-price-container if you added that class

  if (!addBtn || !container) {
    console.error('Add button or container not found.');
    return;
  }

  // Template function
  const getTemplate = () => `
    <div class="flex gap-4 items-end">
      <div class="sm:w-[128px] w-[88px]">
        <label class="md:text-xs text-[10px] leading-4 md:leading-[18px] text-gray-base mb-[6px]">Условие</label>
        <div class="flex counter">
          <button class="decrement active">
            <svg width="14" height="2" viewBox="0 0 14 2"><path d="M1.16663 1H12.8333" stroke="#707D89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="increment">
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7.00033 1.16675V12.8334M1.16699 7.00008H12.8337" stroke="#707D89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
      <div class="flex-1">
        <label class="sm:text-xs text-[10px] text-gray-base mb-[6px]">Стоимость, %</label>
        <input type="text" class="form-control" value="5">
      </div>
      <div class="flex-1">
        <label class="sm:text-xs text-[10px] text-gray-base mb-[6px]">Стоимость, %</label>
        <div class="flex gap-4">
          <input type="text" class="form-control min-w-[71px]" value="5">
        </div>
      </div>
      <button class="w-[18px] h-11 flex items-center justify-center remove-price-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.75 1.25H10.25M1.25 3.5H14.75M13.25 3.5L12.724 11.3895C12.6451 12.5732 12.6057 13.165 12.35 13.6138C12.1249 14.0088 11.7854 14.3265 11.3762 14.5248C10.9115 14.75 10.3183 14.75 9.13201 14.75H6.86799C5.68168 14.75 5.08852 14.75 4.62375 14.5248C4.21457 14.3265 3.87507 14.0088 3.64999 13.6138C3.39433 13.165 3.35488 12.5732 3.27596 11.3895L2.75 3.5M6.5 6.875V10.625M9.5 6.875V10.625" stroke="#707D89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      </button>
    </div>
  `;

  // Add initial block
  container.insertAdjacentHTML('beforeend', getTemplate());

  // Counter and remove logic with event delegation
  container.addEventListener('click', (e) => {
    const block = e.target.closest('.flex.gap-4.items-end');
    if (!block) return;

    const incres = e.target.closest('.increment');
    const decres = e.target.closest('.decrement');
    const removeBtn = e.target.closest('.remove-price-btn');

    if (incres) {
      incres.classList.add('active');
      block.querySelector('.decrement').classList.remove('active');
    } else if (decres) {
      decres.classList.add('active');
      block.querySelector('.increment').classList.remove('active');
    } else if (removeBtn && container.querySelectorAll('.flex.gap-4.items-end').length > 1) {
      block.remove();
    }
  });

  // Add new block
  addBtn.addEventListener('click', () => {
    container.insertAdjacentHTML('beforeend', getTemplate());
  });
});
// const addBtn = document.querySelector('.add-price-btn');
// if (addBtn) {
//   const container = document.querySelector('.add-price-container');

//   // Template funksiyasi
//   const getTemplate = () => `
//   <div class="flex gap-4 items-end">
//     <div class="sm:w-[128px] w-[88px]">
//       <label class="md:text-xs text-[10px] leading-4 md:leading-[18px] text-gray-base mb-[6px]">Условие</label>
//       <div class="flex counter">
//         <button class="decrement active">
//           <svg width="14" height="2" viewBox="0 0 14 2"><path d="M1.16663 1H12.8333" stroke="#707D89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
//         </button>
//         <button class="increment">
//           <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7.00033 1.16675V12.8334M1.16699 7.00008H12.8337" stroke="#707D89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
//         </button>
//       </div>
//     </div>
//     <div class="flex-1">
//       <label class="sm:text-xs text-[10px] text-gray-base mb-[6px]">Стоимость, %</label>
//       <input type="text" class="form-control" value="5">
//     </div>
//     <div class="flex-1 ">
//       <label class="sm:text-xs text-[10px] text-gray-base mb-[6px]">Стоимость, %</label>
//       <div class="flex gap-4">
//         <input type="text" class="form-control min-w-[71px]" value="5">
//       </div>
//     </div>
//     <button class="w-[18px] h-11 flex items-center justify-center remove-price-btn">
//       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M5.75 1.25H10.25M1.25 3.5H14.75M13.25 3.5L12.724 11.3895C12.6451 12.5732 12.6057 13.165 12.35 13.6138C12.1249 14.0088 11.7854 14.3265 11.3762 14.5248C10.9115 14.75 10.3183 14.75 9.13201 14.75H6.86799C5.68168 14.75 5.08852 14.75 4.62375 14.5248C4.21457 14.3265 3.87507 14.0088 3.64999 13.6138C3.39433 13.165 3.35488 12.5732 3.27596 11.3895L2.75 3.5M6.5 6.875V10.625M9.5 6.875V10.625" stroke="#707D89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
// </svg>

//     </button>
//   </div>
// `;

//   // Boshlanishda bitta blok chiqsin
//   window.addEventListener('DOMContentLoaded', () => {
//     container.insertAdjacentHTML('beforeend', getTemplate());
//   });

//   // Yangi blok qo‘shish
//   addBtn.addEventListener('click', () => {
//     container.insertAdjacentHTML('beforeend', getTemplate());
//   });

//   // Trash tugmasi bosilganda istalgan blokni o‘chirish
//   container.addEventListener('click', (e) => {
//     const removeBtn = e.target.closest('.remove-price-btn');
//     if (removeBtn) {
//       const block = removeBtn.closest('.flex.gap-4.items-end');
//       if (block) block.remove();
//     }
//   });
// }

const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
  const incres = counter.querySelector(".increment");
  const decres = counter.querySelector(".decrement");

  if (incres) {
    incres.addEventListener('click', () => {
      incres.classList.add('active')
      decres.classList.remove('active');
    })
  }
  if (decres) {
    decres.addEventListener('click', () => {
      decres.classList.add('active');
      incres.classList.remove('active')
    })
  }
})


const counterstwo = document.querySelectorAll(".counter-container");
counterstwo.forEach(counter => {
  const incres = counter.querySelector(".increment");
  const decres = counter.querySelector(".decrement");

  if (incres) {
    incres.addEventListener('click', () => {
      incres.classList.add('active')
      decres.classList.remove('active');
    })
  }
  if (decres) {
    decres.addEventListener('click', () => {
      decres.classList.add('active');
      incres.classList.remove('active')
    })
  }
})
