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
    };
    this.filters = {
      isOpen: false,
      ageRange: [20, 50],
      creditRange: [10000, 3000000],
      priceRange: [70, 200],
      uniqueOnly: false
    };
    this.currentPath = window.location.pathname;

    this.initializeElements();
    this.bindEvents();
    this.initialize();
  }

  updateSidebarState() {
    const shouldShowExpanded = this.sidebar.isExpanded || this.sidebar.isMobileOpen || this.sidebar.isHovered;
    const { sidebar, logoSection, logoImg, mainContent } = this.elements;

    // Update sidebar width and position
    if (shouldShowExpanded) {
      sidebar?.classList.remove('w-[90px]');
      sidebar?.classList.add('sm:w-[292px]', 'w-[284px]');
      mainContent?.classList.remove('lg:ml-[90px]');
      mainContent?.classList.add('lg:ml-[292px]');
    } else {
      sidebar?.classList.remove('sm:w-[292px]', 'w-[284px]');
      sidebar?.classList.add('w-[90px]');
      mainContent?.classList.remove('lg:ml-[292px]');
      mainContent?.classList.add('lg:ml-[90px]');
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
  }

  updateFixedBarWidth() {
    const { fixedBar } = this.elements;
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

  getNavItems() {
    return [
      {
        icon: `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.57181 19C7.90661 18.3598 9.40997 18 11 18C12.59 18 14.0934 18.3598 15.4282 19M5.8 15H16.2C17.8802 15 18.7202 15 19.362 14.673C19.9265 14.3854 20.3854 13.9265 20.673 13.362C21 12.7202 21 11.8802 21 10.2V5.8C21 4.11984 21 3.27976 20.673 2.63803C20.3854 2.07354 19.9265 1.6146 19.362 1.32698C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V10.2C1 11.8802 1 12.7202 1.32698 13.362C1.6146 13.9265 2.07354 14.3854 2.63803 14.673C3.27976 15 4.11984 15 5.8 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        name: 'Заявки',
        path: '/'
      },
      {
        icon: `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7H16M1 1H19M7 13H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        name: 'Купленные заявки',
        path: '/purchased-orders'
      },
      {
        icon: `<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 9H1M14 1V5M6 1V5M7 15L9 17L13.5 12.5M5.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H5.8C4.11984 3 3.27976 3 2.63803 3.32698C2.07354 3.6146 1.6146 4.07354 1.32698 4.63803C1 5.27976 1 6.11984 1 7.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        name: 'Планировщик',
        path: '/scheduler',
        notification: '2'
      },
      {
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 9L1 19M13 9L13 19M7 1L7 19M19 1V19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        name: 'Статистика',
        path: '/statistics'
      },
      {
        icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.7273 13.7273C17.6063 14.0015 17.5702 14.3056 17.6236 14.6005C17.6771 14.8954 17.8177 15.1676 18.0273 15.3818L18.0818 15.4364C18.2509 15.6052 18.385 15.8057 18.4765 16.0265C18.568 16.2472 18.6151 16.4838 18.6151 16.7227C18.6151 16.9617 18.568 17.1983 18.4765 17.419C18.385 17.6397 18.2509 17.8402 18.0818 18.0091C17.913 18.1781 17.7124 18.3122 17.4917 18.4037C17.271 18.4952 17.0344 18.5423 16.7955 18.5423C16.5565 18.5423 16.3199 18.4952 16.0992 18.4037C15.8785 18.3122 15.678 18.1781 15.5091 18.0091L15.4545 17.9545C15.2403 17.745 14.9682 17.6044 14.6733 17.5509C14.3784 17.4974 14.0742 17.5335 13.8 17.6545C13.5311 17.7698 13.3018 17.9611 13.1403 18.205C12.9788 18.4489 12.8921 18.7347 12.8909 19.0273V19.1818C12.8909 19.664 12.6994 20.1265 12.3584 20.4675C12.0174 20.8084 11.5549 21 11.0727 21C10.5905 21 10.1281 20.8084 9.78708 20.4675C9.4461 20.1265 9.25455 19.664 9.25455 19.1818V19.1C9.24751 18.7991 9.15011 18.5073 8.97501 18.2625C8.79991 18.0176 8.55521 17.8312 8.27273 17.7273C7.99853 17.6063 7.69437 17.5702 7.39947 17.6236C7.10456 17.6771 6.83244 17.8177 6.61818 18.0273L6.56364 18.0818C6.39478 18.2509 6.19425 18.385 5.97353 18.4765C5.7528 18.568 5.51621 18.6151 5.27727 18.6151C5.03834 18.6151 4.80174 18.568 4.58102 18.4765C4.36029 18.385 4.15977 18.2509 3.99091 18.0818C3.82186 17.913 3.68775 17.7124 3.59626 17.4917C3.50476 17.271 3.45766 17.0344 3.45766 16.7955C3.45766 16.5565 3.50476 16.3199 3.59626 16.0992C3.68775 15.8785 3.82186 15.678 3.99091 15.5091L4.04545 15.4545C4.25503 15.2403 4.39562 14.9682 4.4491 14.6733C4.50257 14.3784 4.46647 14.0742 4.34545 13.8C4.23022 13.5311 4.03887 13.3018 3.79497 13.1403C3.55107 12.9788 3.26526 12.8921 2.97273 12.8909H2.81818C2.33597 12.8909 1.87351 12.6994 1.53253 12.3584C1.19156 12.0174 1 11.5549 1 11.0727C1 10.5905 1.19156 10.1281 1.53253 9.78708C1.87351 9.4461 2.33597 9.25455 2.81818 9.25455H2.9C3.2009 9.24751 3.49273 9.15011 3.73754 8.97501C3.98236 8.79991 4.16883 8.55521 4.27273 8.27273C4.39374 7.99853 4.42984 7.69437 4.37637 7.39947C4.3229 7.10456 4.18231 6.83244 3.97273 6.61818L3.91818 6.56364C3.74913 6.39478 3.61503 6.19425 3.52353 5.97353C3.43203 5.7528 3.38493 5.51621 3.38493 5.27727C3.38493 5.03834 3.43203 4.80174 3.52353 4.58102C3.61503 4.36029 3.74913 4.15977 3.91818 3.99091C4.08704 3.82186 4.28757 3.68775 4.50829 3.59626C4.72901 3.50476 4.96561 3.45766 5.20455 3.45766C5.44348 3.45766 5.68008 3.50476 5.9008 3.59626C6.12152 3.68775 6.32205 3.82186 6.49091 3.99091L6.54545 4.04545C6.75971 4.25503 7.03183 4.39562 7.32674 4.4491C7.62164 4.50257 7.9258 4.46647 8.2 4.34545H8.27273C8.54161 4.23022 8.77093 4.03887 8.93245 3.79497C9.09397 3.55107 9.18065 3.26526 9.18182 2.97273V2.81818C9.18182 2.33597 9.37338 1.87351 9.71435 1.53253C10.0553 1.19156 10.5178 1 11 1C11.4822 1 11.9447 1.19156 12.2856 1.53253C12.6266 1.87351 12.8182 2.33597 12.8182 2.81818V2.9C12.8193 3.19253 12.906 3.47834 13.0676 3.72224C13.2291 3.96614 13.4584 4.15749 13.7273 4.27273C14.0015 4.39374 14.3056 4.42984 14.6005 4.37637C14.8954 4.3229 15.1676 4.18231 15.3818 3.97273L15.4364 3.91818C15.6052 3.74913 15.8057 3.61503 16.0265 3.52353C16.2472 3.43203 16.4838 3.38493 16.7227 3.38493C16.9617 3.38493 17.1983 3.43203 17.419 3.52353C17.6397 3.61503 17.8402 3.74913 18.0091 3.91818C18.1781 4.08704 18.3122 4.28757 18.4037 4.50829C18.4952 4.72901 18.5423 4.96561 18.5423 5.20455C18.5423 5.44348 18.4952 5.68008 18.4037 5.9008C18.3122 6.12152 18.1781 6.32205 18.0091 6.49091L17.9545 6.54545C17.745 6.75971 17.6044 7.03183 17.5509 7.32674C17.4974 7.62164 17.5335 7.9258 17.6545 8.2V8.27273C17.7698 8.54161 17.9611 8.77093 18.205 8.93245C18.4489 9.09397 18.7347 9.18065 19.0273 9.18182H19.1818C19.664 9.18182 20.1265 9.37338 20.4675 9.71435C20.8084 10.0553 21 10.5178 21 11C21 11.4822 20.8084 11.9447 20.4675 12.2856C20.1265 12.6266 19.664 12.8182 19.1818 12.8182H19.1C18.8075 12.8193 18.5217 12.906 18.2778 13.0676C18.0339 13.2291 17.8425 13.4584 17.7273 13.7273Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        name: 'API',
        path: '/api.html'
      }
    ];
  }

  getFinanceItems() {
    return [
      {
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 12H14.51M1 3V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5L3 5C1.89543 5 1 4.10457 1 3ZM1 3C1 1.89543 1.89543 1 3 1H15M15 12C15 12.2761 14.7761 12.5 14.5 12.5C14.2239 12.5 14 12.2761 14 12C14 11.7239 14.2239 11.5 14.5 11.5C14.7761 11.5 15 11.7239 15 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        name: 'Баланс',
        path: '/balance.html'
      },
      {
        icon: `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 8.5L8 10.5L12.5 6M17 19V5.8C17 4.11984 17 3.27976 16.673 2.63803C16.3854 2.07354 15.9265 1.6146 15.362 1.32698C14.7202 1 13.8802 1 12.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V19L3.75 17L6.25 19L9 17L11.75 19L14.25 17L17 19Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        name: 'Архив платежей',
        path: '/payments-archive'
      }
    ];
  }

  getSupportItems() {
    return [
      {
        icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 10H5.51M10 10H10.01M14.5 10H14.51M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 11.1971 1.23374 12.3397 1.65806 13.3845C1.73927 13.5845 1.77988 13.6845 1.798 13.7653C1.81572 13.8443 1.8222 13.9028 1.82221 13.9839C1.82222 14.0667 1.80718 14.1569 1.77711 14.3374L1.18413 17.8952C1.12203 18.2678 1.09098 18.4541 1.14876 18.5888C1.19933 18.7067 1.29328 18.8007 1.41118 18.8512C1.54589 18.909 1.73218 18.878 2.10476 18.8159L5.66265 18.2229C5.84309 18.1928 5.9333 18.1778 6.01613 18.1778C6.09715 18.1778 6.15566 18.1843 6.23472 18.202C6.31554 18.2201 6.41552 18.2607 6.61549 18.3419C7.6603 18.7663 8.80286 19 10 19ZM6 10C6 10.2761 5.77614 10.5 5.5 10.5C5.22386 10.5 5 10.2761 5 10C5 9.72386 5.22386 9.5 5.5 9.5C5.77614 9.5 6 9.72386 6 10ZM10.5 10C10.5 10.2761 10.2761 10.5 10 10.5C9.72386 10.5 9.5 10.2761 9.5 10C9.5 9.72386 9.72386 9.5 10 9.5C10.2761 9.5 10.5 9.72386 10.5 10ZM15 10C15 10.2761 14.7761 10.5 14.5 10.5C14.2239 10.5 14 10.2761 14 10C14 9.72386 14.2239 9.5 14.5 9.5C14.7761 9.5 15 9.72386 15 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
        name: 'Контакты',
        path: '/account-details-individual'
      }
    ];
  }

  isActive(path) {
    return this.currentPath === path;
  }

  formatNumber(value) {
    return value.toLocaleString('ru-RU');
  }

  updateMenuTitles(shouldShowExpanded) {
    const titles = [
      { element: this.elements.mainMenuTitle, text: 'МЕНЮ' },
      { element: this.elements.financeMenuTitle, text: 'Финансы' },
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
      const button = document.createElement('button');
      button.className = `menu-item group ${this.openSubmenu?.type === menuType && this.openSubmenu?.index === index
        ? 'menu-item-active'
        : 'menu-item-inactive'
        } cursor-pointer ${!shouldShowExpanded ? 'lg:justify-center' : 'lg:justify-start'}`;
      const iconColor = (this.openSubmenu?.type === menuType && this.openSubmenu?.index === index) ? '#3B82F6' : '#707D89';
      const updatedIcon = item.icon.replace(/stroke="[^"]*"/g, `stroke="${iconColor}"`);

      button.innerHTML = `
        <span class="menu-item-icon-size ${this.openSubmenu?.type === menuType && this.openSubmenu?.index === index
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
    } else {
      const link = document.createElement('a');
      link.href = item.path;
      link.className = `menu-item group ${itemIsActive ? 'menu-item-active' : 'menu-item-inactive'}`;
      const iconColor = itemIsActive ? '#3B82F6' : '#707D89';
      const updatedIcon = item.icon.replace(/stroke="[^"]*"/g, `stroke="${iconColor}"`);

      link.innerHTML = `
        <span class="menu-item-icon-size ${itemIsActive ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}">
          ${updatedIcon}
        </span>
        ${shouldShowExpanded ? `
          ${item.notification ? `<span class="menu-notification-badge bg-blue-50 absolute right-3 top-1/2 -translate-y-1/2 w-[23px] h-[23px] flex items-center justify-center rounded-full text-xs text-[#3F7FA] font-medium">${item.notification}</span>` : ''}
          <span class="menu-item-text">${item.name}</span>
        ` : ''}
      `;
      li.appendChild(link);
    }
    return li;
  }

  renderMenuItems() {
    const { mainMenu, financeMenu, supportMenu } = this.elements;
    if (mainMenu) mainMenu.innerHTML = '';
    if (financeMenu) financeMenu.innerHTML = '';
    if (supportMenu) supportMenu.innerHTML = '';

    this.getNavItems().forEach((item, index) => {
      mainMenu?.appendChild(this.createMenuItem(item, index, 'main'));
    });

    this.getFinanceItems().forEach((item, index) => {
      financeMenu?.appendChild(this.createMenuItem(item, index, 'finance'));
    });

    this.getSupportItems().forEach((item, index) => {
      supportMenu?.appendChild(this.createMenuItem(item, index, 'support'));
    });
  }

  handleToggle() {
    if (window.innerWidth >= 1024) {
      this.sidebar.isExpanded = !this.sidebar.isExpanded;
      this.updateSidebarState();
      this.updateFixedBarWidth();
    } else {
      this.header.isMobileOpen = !this.header.isMobileOpen;
      this.sidebar.isMobileOpen = this.header.isMobileOpen;
      this.overlay.isOpen = !this.overlay.isOpen;
      const overlay = document.getElementById('overlay');
      overlay.classList.toggle('show');

      const { hamburgerIcon, crossIcon } = this.elements;
      if (this.header.isMobileOpen
