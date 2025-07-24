document.addEventListener('DOMContentLoaded', () => {
  // Modal ochish va yopish funksiyalari
  document.querySelectorAll('[data-modal-target]').forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = document.querySelector(btn.dataset.modalTarget);
      if (modal) {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.classList.add("overflow-hidden");
      }
      // Agar delete-cart modalidagi "Удалить" tugmasi bosilsa
      if (btn.dataset.modalTarget === '#delete-cart-two') {
        const currentModal = btn.closest('.modal');
        if (currentModal) {
          currentModal.classList.add("hidden");
          currentModal.classList.remove("flex");
        }
      }
    });
  });

  // Modal yopish tugmalari
  document.querySelectorAll(".modal-close").forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.classList.remove("overflow-hidden");
      }
    });
  });

  // Modal tashqi qismiga bosilganda yopish
  document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.classList.remove("overflow-hidden");
      }
    });
  });

  // delete-cart-two modalidagi inputlar
  const inputs = document.querySelectorAll('#delete-cart-two input[type="number"]');
  const confirmButton = document.querySelector('.confirm-button');
  const changePhoneText = document.querySelectorAll('#delete-cart-two .hide-el');

  // Default holatga qaytarish funksiyasi
  const resetModal = () => {
    inputs.forEach(input => {
      input.value = '';
    });
    confirmButton.setAttribute('disabled', 'true');
    changePhoneText.forEach(el => {
      el.classList.remove('hidden');
    });
    const modal = document.querySelector('#delete-cart-two');
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
    }
  };

  inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      // Faqat bitta raqam kiritish imkoniyati
      if (e.target.value.length > 1) {
        e.target.value = e.target.value.slice(0, 1);
      }
      // Agar raqam kiritilgan bo'lsa, keyingi inputga focus o'tkazish
      if (e.target.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
      // Barcha inputlar to'ldirilganligini tekshirish
      const allFilled = Array.from(inputs).every(input => input.value.length === 1);
      if (allFilled) {
        confirmButton.removeAttribute('disabled');
        changePhoneText.forEach(el => {
          el.classList.add('hidden');
        });
      } else {
        confirmButton.setAttribute('disabled', 'true');
      }
    });
  });

  // prev-btn funksiyasi
  const prevButton = document.querySelector('#delete-cart-two .prev-btn');
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      const currentModal = document.querySelector('#delete-cart-two');
      const prevModal = document.querySelector('#delete-cart');
      if (currentModal && prevModal) {
        currentModal.classList.add('hidden');
        currentModal.classList.remove('flex');
        prevModal.classList.remove('hidden');
        prevModal.classList.add('flex');
      }
    });
  }

  // ConfirmButton bosilganda modal yopiladi va hamma narsa default holatga qaytadi
  if (confirmButton) {
    confirmButton.addEventListener('click', () => {
      resetModal();
    });
  }
});


const modalTooltip = document.getElementById('modal-tooltip');
if (modalTooltip) {
  const toltipContent = document.querySelector('.tooltip-content')
  modalTooltip.addEventListener('click', () => {
    toltipContent.classList.toggle('hidden')
  })
}

class ApplicationState {
  constructor() {
    this.sidebar = {
      isExpanded: true,
      isMobileOpen: false,
      isHovered: false
    };
    this.header = {
      isMobileOpen: false,
      isApplicationMenuOpen: false,
      isNotificationOpen: false,
      isUserDropdownOpen: false
    };
    this.overlay = {
      isOpen: false
    }
    this.filters = {
      isOpen: false,
      ageRange: [20, 50],
      creditRange: [10000, 3000000],
      priceRange: [70, 200],
      uniqueOnly: false
    };
    this.table = {
      selectedRows: [],
      sortConfig: { key: 'id', direction: 'asc' },
      data: [
        {
          id: '2224',
          createdAt: '14.02.2024 20:15 (+3)',
          region: 'Самарская область',
          city: 'Самара',
          name: 'Максим',
          phone: '+7 (925) ххх-хх-хх',
          birthDate: '12.03.1980 (44)',
          loanAmount: '580 000',
          loanType: 'Потребительский',
          price: '120'
        },
        {
          id: '2221',
          createdAt: '14.02.2024 20:15 (+3)',
          region: 'Самарская область',
          city: 'Самара',
          name: 'Максим',
          phone: '+7 (925) ххх-хх-хх',
          birthDate: '12.03.1980 (44)',
          loanAmount: '580 000',
          loanType: 'Потребительский',
          price: '120'
        }
      ]
    };
    this.currentPath = window.location.pathname;

    this.initializeElements();
    this.bindEvents();
    this.initialize();

  }

  updateSidebarState() {
    const shouldShowExpanded = this.sidebar.isExpanded || this.sidebar.isMobileOpen || this.sidebar.isHovered;
    const { sidebar, logoSection, logoImg, mainContent, fixedBar } = this.elements;

    // Update sidebar width and position
    if (shouldShowExpanded) {
      sidebar?.classList.remove('w-[90px]');
      sidebar?.classList.add('sm:w-[292px]', 'w-[284px]');
      mainContent?.classList.remove('lg:ml-[90px]');
      mainContent?.classList.add('lg:ml-[292px]');
      // fixedBar?.classList.remove('lg:w-[calc(100%_-_234px)]');
      // fixedBar?.classList.add('lg:w-[calc(100%_-_120px_-_292px)]');
    } else {
      sidebar?.classList.remove('sm:w-[292px]', 'w-[284px]');
      sidebar?.classList.add('w-[90px]');
      mainContent?.classList.remove('lg:ml-[292px]');
      mainContent?.classList.add('lg:ml-[90px]');
      // fixedBar?.classList.remove('lg:w-[calc(100%_-_120px_-_292px)]');
      // fixedBar?.classList.add('lg:w-[calc(100%_-_234px)]');
    }

    // Update mobile visibility
    if (this.sidebar.isMobileOpen) {
      sidebar?.classList.remove('-translate-x-full');
      sidebar?.classList.add('translate-x-0');
    } else {
      sidebar?.classList.remove('translate-x-0');
      sidebar?.classList.add('-translate-x-full');
    }

    // Update logo
    if (shouldShowExpanded && logoImg) {
      logoImg.width = 114;
      logoImg.height = 32;
      logoSection?.classList.remove('lg:justify-center');
      logoSection?.classList.add('justify-start');
    } else if (logoImg) {
      logoImg.width = 32;
      logoImg.height = 32;
      logoSection?.classList.remove('justify-start');
      logoSection?.classList.add('lg:justify-center');
    }

    this.updateMenuTitles(shouldShowExpanded);
    this.renderMenuItems();

    // Notify table state of sidebar change
    if (this.tableState) {
      this.tableState.updateFixedBarWidth();
    }
  }

  updateFixedBarWidth() {
    const { fixedBar } = this.elements;

    // Only update if fixedBar exists
    if (!fixedBar) return;

    const shouldShowExpanded = this.sidebar.isExpanded || this.sidebar.isMobileOpen || this.sidebar.isHovered;


    if (shouldShowExpanded) {
      fixedBar.classList.remove("lg:w-[calc(100%_-_234px)]");
      fixedBar.classList.add("lg:w-[calc(100%_-_120px_-_292px)]");
    } else {
      fixedBar.classList.remove("lg:w-[calc(100%_-_120px_-_292px)]");
      fixedBar.classList.add("lg:w-[calc(100%_-_234px)]");
    }
  }

  initializeElements() {
    this.elements = {
      // Sidebar elements
      sidebar: document.getElementById('sidebar'),
      fixedBar: document.getElementById('fixed-bar'),
      logoSection: document.getElementById('logo-section'),
      logoImg: document.getElementById('logo-img'),
      mainMenuTitle: document.getElementById('main-menu-title'),
      financeMenuTitle: document.getElementById('finance-menu-title'),
      supportMenuTitle: document.getElementById('support-menu-title'),
      mainMenu: document.getElementById('main-menu'),
      financeMenu: document.getElementById('finance-menu'),
      supportMenu: document.getElementById('support-menu'),
      mainContent: document.querySelector('main'),


      // Header elements
      sidebarToggle: document.getElementById('sidebar-toggle'),
      overlay: document.getElementById('overlay'),
      hamburgerIcon: document.getElementById('hamburger-icon'),
      crossIcon: document.getElementById('cross-icon'),
      appMenuToggle: document.getElementById('app-menu-toggle'),
      applicationMenu: document.getElementById('application-menu'),
      notificationToggle: document.getElementById('notification-toggle'),
      userDropdownToggle: document.getElementById('user-dropdown-toggle'),
      userDropdownArrow: document.getElementById('user-dropdown-arrow'),
      notificationDropdown: document.getElementById('notification-dropdown'),
      notificationClose: document.getElementById('notification-close'),
      notificationIcon: document.getElementById('notification-icon'),
      userDropdown: document.getElementById('user-dropdown'),

      // Filter elements
      filterToggle: document.getElementById('filter-toggle'),
      filterSection: document.getElementById('filter-section'),
      datePicker: document.getElementById('date-picker'),
      uniqueCheckbox: document.getElementById('unique-checkbox'),

      // Table elements
      selectAll: document.getElementById('select-all'),
      tableBody: document.getElementById('table-body'),
      purchaseTableBody: document.getElementById('purchase-table-body'),
      fixedBar: document.getElementById('fixed-bar'),
      selectedCount: document.getElementById('selected-count'),
      totalPrice: document.getElementById('total-price'),
      clearSelection: document.getElementById('clear-selection'),

      // Range sliders
      ageRangeDisplay: document.getElementById('age-range-display'),
      creditRangeDisplay: document.getElementById('credit-range-display'),
      priceRangeDisplay: document.getElementById('price-range-display'),

      // Mobile menu dots
      dot1: document.getElementById('dot-1'),
      dot2: document.getElementById('dot-2'),
      dot3: document.getElementById('dot-3')
    };

  }

  // Navigation data
  getNavItems() {
    return [
      {
        icon: `<svg width="20" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.57181 19C7.90661 18.3598 9.40997 18 11 18C12.59 18 14.0934 18.3598 15.4282 19M5.8 15H16.2C17.8802 15 18.7202 15 19.362 14.673C19.9265 14.3854 20.3854 13.9265 20.673 13.362C21 12.7202 21 11.8802 21 10.2V5.8C21 4.11984 21 3.27976 20.673 2.63803C20.3854 2.07354 19.9265 1.6146 19.362 1.32698C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V10.2C1 11.8802 1 12.7202 1.32698 13.362C1.6146 13.9265 2.07354 14.3854 2.63803 14.673C3.27976 15 4.11984 15 5.8 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
        name: 'Заявки',
        path: '/'
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L1 19M13 9L13 19M7 1L7 19M19 1V19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
        name: 'Статистика',
        path: '/discount.html'
      },
    ];
  }

  getFinanceItems() {
    return [
      {
        icon: `<svg width="20" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5 14L20.5 19M20.5 14L15.5 19M11 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z" stroke="#707D89" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
        name: 'Блокировка',
        path: '/block-user.html'
      },
    ];
  }

  getSupportItems() {
    return [
      {
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 10H5.51M10 10H10.01M14.5 10H14.51M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 11.1971 1.23374 12.3397 1.65806 13.3845C1.73927 13.5845 1.77988 13.6845 1.798 13.7653C1.81572 13.8443 1.8222 13.9028 1.82221 13.9839C1.82222 14.0667 1.80718 14.1569 1.77711 14.3374L1.18413 17.8952C1.12203 18.2678 1.09098 18.4541 1.14876 18.5888C1.19933 18.7067 1.29328 18.8007 1.41118 18.8512C1.54589 18.909 1.73218 18.878 2.10476 18.8159L5.66265 18.2229C5.84309 18.1928 5.9333 18.1778 6.01613 18.1778C6.09715 18.1778 6.15566 18.1843 6.23472 18.202C6.31554 18.2201 6.41552 18.2607 6.61549 18.3419C7.6603 18.7663 8.80286 19 10 19ZM6 10C6 10.2761 5.77614 10.5 5.5 10.5C5.22386 10.5 5 10.2761 5 10C5 9.72386 5.22386 9.5 5.5 9.5C5.77614 9.5 6 9.72386 6 10ZM10.5 10C10.5 10.2761 10.2761 10.5 10 10.5C9.72386 10.5 9.5 10.2761 9.5 10C9.5 9.72386 9.72386 9.5 10 9.5C10.2761 9.5 10.5 9.72386 10.5 10ZM15 10C15 10.2761 14.7761 10.5 14.5 10.5C14.2239 10.5 14 10.2761 14 10C14 9.72386 14.2239 9.5 14.5 9.5C14.7761 9.5 15 9.72386 15 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`,
        name: 'Контакты',
        path: '/account-details-individual.html'
      }
    ];
  }

  // Utility functions
  isActive(path) {
    return this.currentPath === path;
  }

  formatNumber(value) {
    return value.toLocaleString('ru-RU');
  }



  updateMenuTitles(shouldShowExpanded) {
    const titles = [
      { element: this.elements.mainMenuTitle, text: 'Цена' },
      { element: this.elements.financeMenuTitle, text: 'Настройка системы' },
      { element: this.elements.supportMenuTitle, text: 'Поддержка' }
    ];

    titles.forEach(({ element, text }) => {
      if (!element) return;

      if (shouldShowExpanded) {
        element.innerHTML = text;
        element.classList.remove('lg:justify-center');
        element.classList.add('justify-start');
      } else {
        element.innerHTML = `<svg class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="12" r="2" fill="currentColor"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                    <circle cx="19" cy="12" r="2" fill="currentColor"/>
                </svg>`;
        element.classList.remove('justify-start');
        element.classList.add('lg:justify-center');
      }
    });
  }

  createMenuItem(item, index, menuType) {
    const li = document.createElement('li');
    const shouldShowExpanded = this.sidebar.isExpanded || this.sidebar.isMobileOpen || this.sidebar.isHovered;
    const itemIsActive = this.isActive(item.path);

    if (item.subItems) {
      // Submenu item
      const button = document.createElement('button');
      button.className = `menu-item group ${this.openSubmenu?.type === menuType && this.openSubmenu?.index === index
        ? 'menu-item-active'
        : 'menu-item-inactive'
        } cursor-pointer ${!shouldShowExpanded ? 'lg:justify-center' : 'lg:justify-start'
        }`;

      // Update icon color based on active state
      const iconColor = (this.openSubmenu?.type === menuType && this.openSubmenu?.index === index) ? '#3B82F6' : '#707D89';
      const updatedIcon = item.icon.replace(/stroke="[^"]*"/g, `stroke="${iconColor}"`);

      button.innerHTML = `
        <span class="menu-item-icon-size flex items-center justify-center ${this.openSubmenu?.type === menuType && this.openSubmenu?.index === index
          ? 'menu-item-icon-active'
          : 'menu-item-icon-inactive'
        }">
          ${updatedIcon}
        </span>
        ${shouldShowExpanded ? `
          ${item.notification ? `<span class="menu-notification-badge">${item.notification}</span>` : ''}
          <span class="menu-item-text">${item.name}</span>
          <svg class="ml-auto w-5 h-5 transition-transform duration-200 ${this.openSubmenu?.type === menuType && this.openSubmenu?.index === index
            ? 'rotate-180 text-blue-500'
            : ''
          }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        ` : ''}
      `;

      button.addEventListener('click', () => this.handleSubmenuToggle(index, menuType));
      li.appendChild(button);

      // Submenu implementation would go here
    } else {
      // Regular menu item
      const link = document.createElement('a');
      link.href = item.path;
      link.className = `menu-item group ${itemIsActive ? 'menu-item-active' : 'menu-item-inactive'
        }`;

      // Update icon color based on active state
      const iconColor = itemIsActive ? '#3B82F6' : '#707D89';
      const updatedIcon = item.icon.replace(/stroke="[^"]*"/g, `stroke="${iconColor}"`);

      link.innerHTML = `
        <span class="menu-item-icon-size flex items-center ${itemIsActive ? 'menu-item-icon-active' : 'menu-item-icon-inactive'
        }">
          ${updatedIcon}
        </span>
        ${shouldShowExpanded ? `
          ${item.notification ? `<span class="menu-notification-badge bg-blue-50 absolute right-3 top-1/2 -translate-y-1/2 w-[23px] h-[23px] flex items-center justify-center rounded-full text-xs text-blue-500 font-normal">${item.notification}</span>` : ''}
          <span class="menu-item-text">${item.name}</span>
        ` : ''}
      `;

      li.appendChild(link);
    }

    return li;
  }

  renderMenuItems() {
    const { mainMenu, financeMenu, supportMenu } = this.elements;

    // Clear existing items
    if (mainMenu) mainMenu.innerHTML = '';
    if (financeMenu) financeMenu.innerHTML = '';
    if (supportMenu) supportMenu.innerHTML = '';

    // Render main menu items
    this.getNavItems().forEach((item, index) => {
      mainMenu?.appendChild(this.createMenuItem(item, index, 'main'));
    });

    // Render finance menu items
    this.getFinanceItems().forEach((item, index) => {
      financeMenu?.appendChild(this.createMenuItem(item, index, 'finance'));
    });

    // Render support menu items
    this.getSupportItems().forEach((item, index) => {
      supportMenu?.appendChild(this.createMenuItem(item, index, 'support'));
    });
  }


  // Header functions
  handleToggle() {
    if (window.innerWidth >= 1024) {
      // Desktop sidebar toggle
      this.sidebar.isExpanded = !this.sidebar.isExpanded;
      this.updateSidebarState();
      this.updateFixedBarWidth();
    } else {
      // Mobile sidebar toggle
      this.header.isMobileOpen = !this.header.isMobileOpen;
      this.sidebar.isMobileOpen = this.header.isMobileOpen;
      this.overlay.isOpen = !this.overlay.isOpen;
      const overlay = document.getElementById('overlay');
      overlay.classList.toggle('show')


      const { hamburgerIcon, crossIcon } = this.elements;
      if (this.header.isMobileOpen) {
        hamburgerIcon?.classList.add('hidden');
        crossIcon?.classList.remove('hidden');
      } else {
        hamburgerIcon?.classList.remove('hidden');
        crossIcon?.classList.add('hidden');
      }
      this.updateSidebarState();
      this.updateFixedBarWidth();
    }
  }

  toggleApplicationMenu() {
    this.header.isApplicationMenuOpen = !this.header.isApplicationMenuOpen;
    const { applicationMenu, dot1, dot2, dot3 } = this.elements;

    if (this.header.isApplicationMenuOpen) {
      applicationMenu?.classList.remove('hidden');
      applicationMenu?.classList.add('flex');
      // Change dots color to blue
      dot1?.setAttribute('stroke', '#3B82F6');
      dot2?.setAttribute('stroke', '#3B82F6');
      dot3?.setAttribute('stroke', '#3B82F6');
    } else {
      applicationMenu?.classList.remove('flex');
      applicationMenu?.classList.add('hidden');
      // Reset dots color
      dot1?.setAttribute('stroke', '#707D89');
      dot2?.setAttribute('stroke', '#707D89');
      dot3?.setAttribute('stroke', '#707D89');
    }
  }

  // Filter functions
  toggleFilterSection() {
    this.filters.isOpen = !this.filters.isOpen;
    const { filterSection, filterToggle } = this.elements;

    if (this.filters.isOpen) {
      filterSection?.classList.remove('hidden');
      filterSection?.classList.add('block');
      filterToggle?.classList.add('shadow-[0px_0px_0px_4px_#465FFF1F]');
    } else {
      filterSection?.classList.remove('block');
      filterSection?.classList.add('hidden');
      filterToggle?.classList.remove('shadow-[0px_0px_0px_4px_#465FFF1F]');
    }
  }

  updateFixedBar() {
    const { fixedBar, selectedCount, totalPrice } = this.elements;

    if (this.table.selectedRows.length > 0) {
      const total = this.table.selectedRows.reduce((sum, rowId) => {
        const row = this.table.data.find(r => r.id === rowId);
        return row ? sum + parseFloat(row.price) : sum;
      }, 0);

      selectedCount.textContent = this.table.selectedRows.length;
      totalPrice.textContent = `${total.toFixed(2)} ₽`;
      fixedBar?.classList.remove('hidden');
    } else {
      fixedBar?.classList.add('hidden');
    }
  }

  clearSelection() {
    this.table.selectedRows = [];
    this.updateFixedBar();
  }
  toggleNotificationDropdown() {
    this.header.isNotificationOpen = !this.header.isNotificationOpen;
    const { notificationDropdown, notificationIcon } = this.elements;

    if (this.header.isNotificationOpen) {
      notificationDropdown?.classList.add('show');
      notificationIcon?.classList.add('blue-icon');
    } else {
      notificationDropdown?.classList.remove('show');
      notificationIcon?.classList.remove('blue-icon');
    }
    this.header.notifying = false;
  }

  toggleUserDropdown() {
    this.header.isUserDropdownOpen = !this.header.isUserDropdownOpen;
    const { userDropdown, userDropdownArrow } = this.elements;

    if (this.header.isUserDropdownOpen) {
      userDropdown?.classList.add('show');
      userDropdownArrow?.classList.add('rotate-180', 'stroke-blue-500');
    } else {
      userDropdown?.classList.remove('show');
      userDropdownArrow?.classList.remove('rotate-180', 'stroke-blue-500');
    }
  }

  closeAllDropdowns() {
    // Close notification dropdown if open
    if (this.header.isNotificationOpen) {
      const { notificationDropdown, notificationIcon } = this.elements;
      notificationDropdown?.classList.remove('show');
      notificationIcon?.classList.remove('blue-icon');
      this.header.isNotificationOpen = false;
    }

    // Close user dropdown if open
    if (this.header.isUserDropdownOpen) {
      const { userDropdown, userDropdownArrow } = this.elements;
      userDropdown?.classList.remove('show');
      userDropdownArrow?.classList.remove('rotate-180', 'stroke-blue-500');
      this.header.isUserDropdownOpen = false;
    }
  }

  bindEvents() {
    const {
      sidebar, sidebarToggle, appMenuToggle, notificationToggle,
      notificationClose, userDropdownToggle, notificationDropdown, userDropdown, overlay
    } = this.elements;

    // Sidebar events
    sidebar?.addEventListener('mouseenter', () => {
      if (!this.sidebar.isExpanded) {
        this.sidebar.isHovered = true;
        this.updateSidebarState();
        this.updateFixedBarWidth();
      }
    });

    sidebar?.addEventListener('mouseleave', () => {
      this.sidebar.isHovered = false;
      this.updateSidebarState();
      this.updateFixedBarWidth();
    });

    // Header events
    sidebarToggle?.addEventListener('click', () => this.handleToggle());
    overlay?.addEventListener('click', () => this.handleToggle());
    appMenuToggle?.addEventListener('click', () => this.toggleApplicationMenu());

    notificationToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleNotificationDropdown();
    });

    notificationClose?.addEventListener('click', () => this.toggleNotificationDropdown());

    userDropdownToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleUserDropdown();
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!notificationDropdown?.contains(e.target) &&
        !notificationToggle?.contains(e.target) &&
        !userDropdown?.contains(e.target) &&
        !userDropdownToggle?.contains(e.target)) {
        this.closeAllDropdowns();
      }
    });

    // Window resize handler
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        const { applicationMenu, hamburgerIcon, crossIcon } = this.elements;
        applicationMenu?.classList.remove('hidden');
        applicationMenu?.classList.add('flex');
        // Reset mobile state
        this.header.isMobileOpen = false;
        this.sidebar.isMobileOpen = false;
        hamburgerIcon?.classList.remove('hidden');
        crossIcon?.classList.add('hidden');
        this.updateSidebarState();
        this.updateFixedBarWidth();
      } else if (!this.header.isApplicationMenuOpen) {
        this.elements.applicationMenu?.classList.remove('flex');
        this.elements.applicationMenu?.classList.add('hidden');
      }
    });

    // Browser navigation
    window.addEventListener('popstate', () => {
      this.currentPath = window.location.pathname;
      this.updateSidebarState();
      this.updateFixedBarWidth();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        console.log('Search shortcut triggered');
      }
    });
  }
  // Initialize the application
  initialize() {
    // Initialize the application menu for desktop
    if (window.innerWidth >= 1024) {
      this.elements.applicationMenu?.classList.remove('hidden');
      this.elements.applicationMenu?.classList.add('flex');
    }

    // Initialize date picker
    if (this.elements.datePicker) {
      flatpickr(this.elements.datePicker, {
        mode: 'range',
        dateFormat: 'd.m.Y',
        defaultDate: ['2025-03-15', '2025-03-15'],
        locale: {
          rangeSeparator: ' — ',
        },
        altInput: true,
        altFormat: 'd.m.Y'
      });
    }

    this.updateSidebarState();
    this.updateFixedBarWidth();
  }

}
// Application state
class ApplicationTableState {

  constructor(sidebarState) {
    this.sidebarState = sidebarState || { isExpanded: false, isHovered: false }; // Fallback to default state
    this.selectedRows = [];
    this.sortConfig = { key: "id", direction: "asc" };
    this.initElements();
    this.bindEvents();
  }
  initElements() {
    this.elements = {
      tableBody: document.getElementById("table-body"),
      selectAll: document.getElementById("select-all"),
      fixedBar: document.getElementById("fixed-bar"),
      selectedCount: document.getElementById("selected-count"),
      totalPrice: document.getElementById("total-price"),
      clearSelection: document.getElementById("clear-selection"),
      sortableHeaders: document.querySelectorAll("[data-sort]"),
    };
  }

  bindEvents() {
    // Select all checkbox

    if (this.elements.selectAll) {
      this.elements.selectAll.addEventListener("change", () => this.handleSelectAll())
    }

    // Clear selection button
    if (this.elements.clearSelection) {
      this.elements.clearSelection.addEventListener("click", () => this.clearSelection())
    }

    // Sortable headers
    this.elements.sortableHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const key = header.dataset.sort
        this.handleSort(key)
      })
    })

    // Row selection (delegated event)
    if (this.elements.tableBody) {
      this.elements.tableBody.addEventListener("change", (e) => {
        if (e.target.type === "checkbox" && e.target.dataset.rowId) {
          this.handleRowSelection(e.target.dataset.rowId)
        }
      })
    }
    if (this.elements.purchaseTableBody) {
      this.elements.purchaseTableBody.addEventListener("change", (e) => {
        if (e.target.type === "checkbox" && e.target.dataset.rowId) {
          this.handleRowSelection(e.target.dataset.rowId)
        }
      })
    }

    // Update fixed bar position on window resize
    // window.addEventListener("resize", () => this.updateFixedBarWidth())
  }

  handleSort(key) {
    this.sortConfig = {
      key,
      direction: this.sortConfig.key === key && this.sortConfig.direction === "asc" ? "desc" : "asc",
    }

    this.renderTable()
  }

  handleSelectAll() {
    if (this.selectedRows.length === tableData.length) {
      this.selectedRows = []
    } else {
      this.selectedRows = tableData.map((row) => row.id)
    }

    this.renderTable()
    this.updateFixedBar()
  }

  handleRowSelection(rowId) {
    if (this.selectedRows.includes(rowId)) {
      this.selectedRows = this.selectedRows.filter((id) => id !== rowId)
    } else {
      this.selectedRows.push(rowId)
    }

    this.updateSelectAllCheckbox()
    this.updateFixedBar()
  }

  updateSelectAllCheckbox() {
    this.elements.selectAll.checked = this.selectedRows.length === tableData.length && tableData.length > 0
  }

  clearSelection() {
    this.selectedRows = []
    this.renderTable()
    this.updateFixedBar()
  }

  getSortedData() {
    return [...tableData].sort((a, b) => {
      const aValue = a[this.sortConfig.key]
      const bValue = b[this.sortConfig.key]

      if (aValue < bValue) return this.sortConfig.direction === "asc" ? -1 : 1
      if (aValue > bValue) return this.sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
  }

  renderTable() {
    const sortedData = this.getSortedData()
    const tableBody = this.elements.tableBody

    // Clear existing rows
    if (tableBody) tableBody.innerHTML = ""

    // Create new rows
    sortedData.forEach((row) => {
      const tr = document.createElement("tr")

      // Checkbox cell
      const checkboxCell = document.createElement("td")
      checkboxCell.className = "pl-6 w-14"

      const checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.className = "checkbox checkbox-input"
      checkbox.dataset.rowId = row.id
      checkbox.checked = this.selectedRows.includes(row.id)

      checkboxCell.appendChild(checkbox)
      tr.appendChild(checkboxCell)

      // Data cells
      columns.forEach((column, index) => {
        const td = document.createElement("td")
        td.className = `px-3 h-11 py-2 text-start ${index === columns.length - 1 ? "w-[88px]" : ""} `

        if (column.key === "id") {
          // Special case for ID column with status indicator
          td.innerHTML = `
            <div class="flex items-center gap-2" >
              <span class="md:text-sm text-xs">${row[column.key]}</span>
              <div class="w-[6px] h-[6px] rounded-full bg-[#039855] opacity-20"></div>
            </div>
      `
        } else {
          td.innerHTML = `<span class="md:text-sm text-xs" > ${row[column.key]}</span> `
        }

        tr.appendChild(td)
      })

      if (tableBody) tableBody.appendChild(tr)
    })

    // Update sort indicators
    this.updateSortIndicators()

    // Update select all checkbox
    this.updateSelectAllCheckbox()
  }

  renderTable2() {
    const sortedData = this.getSortedData()
    const tableBody = this.elements.tableBody;

    // Clear existing rows
    if (tableBody) tableBody.innerHTML = ""

    // Create new rows
    sortedData.forEach((row) => {
      const tr = document.createElement("tr")

      // Checkbox cell
      const checkboxCell = document.createElement("td")
      checkboxCell.className = "pl-6 w-14"

      const checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.className = "checkbox checkbox-input"
      checkbox.dataset.rowId = row.id
      checkbox.checked = this.selectedRows.includes(row.id)

      checkboxCell.appendChild(checkbox)
      tr.appendChild(checkboxCell)

      // Data cells
      columns.forEach((column, index) => {
        const td = document.createElement("td")
        td.className = `px-3 h-11 py-2 text-start ${index === columns.length - 1 ? "w-[88px]" : ""} `

        if (column.key === "id") {
          // Special case for ID column with status indicator
          td.innerHTML = `
            <div class="flex items-center gap-2" >
              <span class="md:text-sm text-xs">${row[column.key]}</span>
              <div class="w-[6px] h-[6px] rounded-full bg-[#039855] opacity-20"></div>
            </div>
      `
        } else {
          td.innerHTML = `<span class="md:text-sm text-xs" > ${row[column.key]}</span> `
        }

        tr.appendChild(td)
      })

      if (tableBody) tableBody.appendChild(tr)
    })

    // Update sort indicators
    this.updateSortIndicators()

    // Update select all checkbox
    this.updateSelectAllCheckbox()
  }

  updateSortIndicators() {
    if (this.elements.sortableHeaders) {
      this.elements.sortableHeaders.forEach((header) => {
        const key = header.dataset.sort
        const arrow = header.querySelector("svg")

        if (this.sortConfig.key === key) {
          arrow.classList.toggle("rotate-180", this.sortConfig.direction === "asc")
        } else {
          arrow.classList.remove("rotate-180")
        }
      })
    }
  }

  updateFixedBar() {
    const { fixedBar, selectedCount, totalPrice } = this.elements;

    if (this.selectedRows.length > 0 && fixedBar && selectedCount && totalPrice) {
      // Calculate total price
      const total = this.selectedRows.reduce((sum, rowId) => {
        const row = tableData.find((r) => r.id === rowId);
        return row ? sum + Number.parseFloat(row.price) : sum;
      }, 0);

      // Update UI
      selectedCount.textContent = this.selectedRows.length;
      totalPrice.textContent = `${total.toFixed(2)} ₽`;
      fixedBar.classList.remove("hidden");

      // Update width based on sidebar state
      // this.updateFixedBarWidth();
    } else {
      fixedBar?.classList.add("hidden");
    }
  }
}
// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new ApplicationState();
});

// intro code

// Toggle filter section
const filterToggle = document.getElementById('filter-toggle');
if (filterToggle) {
  const filterSection = document.getElementById('filter-section');
  filterToggle.addEventListener('click', () => {
    filterSection.classList.toggle('hidden');
    filterToggle.classList.toggle('shadow-[0px_0px_0px_4px_#465FFF1F]');
  });
}

// Checkbox state

// select custom
// Initialize all dropdowns
document.querySelectorAll('.select').forEach((select, index) => {
  const toggle = select.querySelector('.select-toggle');
  const optionsList = select.querySelector('.select-options');
  const display = select.querySelector('.select-display');
  const arrow = select.querySelector('.select-arrow');
  let isOpen = false;

  // Toggle dropdown
  function toggleDropdown() {
    isOpen = !isOpen;
    optionsList.classList.toggle('hidden', !isOpen);
    arrow.classList.toggle('rotate-180', isOpen);
  }

  // Handle option selection
  function handleSelect(value) {
    display.textContent = value;
    display.classList.add('font-medium', 'text-black');
    select.querySelectorAll('.select-option').forEach(li => {
      li.classList.toggle('select-option-selected', li.textContent === value);
    });
    toggleDropdown();
    console.log(`Select ${index + 1} selected value: `, value);
  }

  // Handle click outside
  function handleClickOutside(event) {
    if (!select.contains(event.target)) {
      isOpen = false;
      optionsList.classList.add('hidden');
      arrow.classList.remove('rotate-180');
    }
  }

  // Event listeners
  toggle.addEventListener('click', toggleDropdown);
  document.addEventListener('mousedown', handleClickOutside);
  select.querySelectorAll('.select-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      handleSelect(option.textContent);
    });
  });

  // Cleanup
  window.addEventListener('unload', () => {
    document.removeEventListener('mousedown', handleClickOutside);
  });
});


// // Initialize all date pickers
// document.querySelectorAll('.date-picker').forEach((picker, index) => {
//   const input = picker.querySelector('.date-picker-input');
//   const id = `date - picker - ${index + 1} `;
//   input.id = id; // Ensure unique ID
//   const defaultValue = input.dataset.default || '15.03.2025 — 15.03.2025';

//   const flatpickrInstance = flatpickr(input, {
//     mode: 'range',
//     static: true,
//     monthSelectorType: 'static',
//     dateFormat: 'd.m.Y',
//     defaultDate: ['2025-03-15', '2025-03-15'],
//     altInput: true,
//     altFormat: 'd.m.Y',
//     locale: {
//       rangeSeparator: ' — '
//     },
//     defaultHour: 0,
//     defaultMinute: 0,
//     onChange: (selectedDates, dateStr) => {
//       console.log(`Date Picker ${index + 1} selected: `, dateStr);
//       console.log('Start date:', selectedDates[0]);
//       console.log('End date:', selectedDates[1]);
//     }
//   });

//   if (flatpickrInstance.altInput) {
//     flatpickrInstance.altInput.value = defaultValue;
//   }

//   // Cleanup on page unload
//   window.addEventListener('unload', () => {
//     if (!Array.isArray(flatpickrInstance)) {
//       flatpickrInstance.destroy();
//     }
//   });
// });
document.querySelectorAll('.date-picker').forEach((picker, index) => {
  const input = picker.querySelector('.date-picker-input');
  const id = `date-picker-${index + 1}`;
  input.id = id;
  const defaultValue = input.dataset.default || '';

  const flatpickrInstance = flatpickr(input, {
    mode: 'single',
    static: true,
    monthSelectorType: 'static',
    dateFormat: 'd.m.Y',
    defaultDate: '2025-03-15',
    altInput: true,
    altFormat: 'd.m.Y',
    locale: {
      rangeSeparator: ' — '
    },
    defaultHour: 0,
    defaultMinute: 0,
    onChange: (selectedDates, dateStr) => {
      console.log(`Date Picker ${index + 1} selected: `, dateStr);
      console.log('Start date:', selectedDates[0]);
      console.log('End date:', selectedDates[1]);
    }
  });

  if (flatpickrInstance.altInput) {
    flatpickrInstance.altInput.value = defaultValue;
  }

  window.addEventListener('unload', () => {
    if (!Array.isArray(flatpickrInstance)) {
      flatpickrInstance.destroy();
    }
  });
});

// document.querySelectorAll('.date-picker-2').forEach((picker, index) => {
//   const input = picker.querySelector('.date-picker-input');
//   const id = `date-picker-${index + 1}`;
//   input.id = id;

//   const defaultValue = input.dataset.default || '15.03.2025';

//   const flatpickrInstance = flatpickr(input, {
//     mode: 'single',
//     static: true,
//     monthSelectorType: 'static',
//     dateFormat: 'd.m.Y',
//     defaultDate: '2025-03-15',
//     altInput: true,
//     altFormat: 'd.m.Y',
//     locale: flatpickr.l10ns.ru,
//     defaultHour: 0,
//     defaultMinute: 0,

//     onChange: (selectedDates, dateStr) => {
//       console.log(`Date Picker ${index + 1} selected: `, dateStr);
//       console.log('Selected date:', selectedDates[0]);
//     }
//   });

//   if (flatpickrInstance.altInput) {
//     flatpickrInstance.altInput.value = defaultValue;
//   }

//   window.addEventListener('unload', () => {
//     if (!Array.isArray(flatpickrInstance)) {
//       flatpickrInstance.destroy();
//     }
//   });
// });



// custom checkbox
// Initialize all checkboxes
document.querySelectorAll('.checkbox-container').forEach(checkbox => {
  const input = checkbox.querySelector('.checkbox-input');
  const checkIcon = checkbox.querySelector('.checkbox-check');
  const disabledIcon = checkbox.querySelector('.checkbox-disabled');
  const isDisabled = checkbox.dataset.disabled === 'true';

  // Update visual state
  function updateCheckbox() {
    const isChecked = input.checked;
    // checkIcon.classList.toggle('hidden', !isChecked || isDisabled);
    // disabledIcon.classList.toggle('hidden', !isDisabled || isChecked);
    // checkbox.dataset.checked = isChecked.toString();
    // Simulate onChange
  }

  // Event listener
  input.addEventListener('change', updateCheckbox);

  // Initial state
  updateCheckbox();
});


// Table data and configuration
const tableData = [
  {
    id: "2224",
    createdAt: "14.02.2024 20:15 (+3)",
    region: "Самарская область",
    city: "Самара",
    name: "Максим",
    phone: "+7 (925) ххх-хх-хх",
    birthDate: "12.03.1980 (44)",
    loanAmount: "580 000",
    loanType: "Потребительский",
    price: "120",
  },
  {
    id: "2221",
    createdAt: "14.02.2024 20:15 (+3)",
    region: "Самарская область",
    city: "Самара",
    name: "Максим",
    phone: "+7 (925) ххх-хх-хх",
    birthDate: "12.03.1980 (44)",
    loanAmount: "580 000",
    loanType: "Потребительский",
    price: "120",
  },
]

const columns = [
  { key: "id", label: "ID" },
  { key: "createdAt", label: "Дата создания", sortable: true },
  { key: "region", label: "Регион" },
  { key: "city", label: "Город" },
  { key: "name", label: "Имя" },
  { key: "phone", label: "Телефон" },
  { key: "birthDate", label: "Дата рождения", sortable: true },
  { key: "loanAmount", label: "Сумма кредита" },
  { key: "loanType", label: "Вид кредита" },
  { key: "price", label: "Цена" },
]


// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.appTable = new ApplicationTableState()
})


const tabs = document.querySelectorAll('.tab-list');

if (tabs) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Avval hamma tugmalardan 'active' class-ni olib tashlaymiz
      tabs.forEach(t => t.classList.remove('active'));

      // Faol tugmaga 'active' class qo‘shamiz
      tab.classList.add('active');
    });
  });
}


const input = document.getElementById('moneyInput');
if (input) {


  input.addEventListener('input', () => {
    // Cursor position
    const selectionStart = input.selectionStart;

    // Remove all non-digit characters
    let raw = input.value.replace(/[^\d]/g, '');

    if (raw === '') {
      input.value = '';
      return;
    }

    // Format with spaces
    let formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    input.value = formatted + ' ₽';

    // Move cursor to before the ₽
    setTimeout(() => {
      const pos = input.value.length - 2; // Before ₽
      input.setSelectionRange(pos, pos);
    }, 0);
  });
}



