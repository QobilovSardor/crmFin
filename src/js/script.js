
// class ApplicationState {
//   constructor() {
//     this.sidebar = {
//       isExpanded: true,
//       isMobileOpen: false,
//       isHovered: false
//     };
//     this.header = {
//       isMobileOpen: false,
//       isApplicationMenuOpen: false,
//       isNotificationOpen: false,
//       isUserDropdownOpen: false
//     };
//     this.overlay = {
//       isOpen: false
//     }
//     this.filters = {
//       isOpen: false,
//       ageRange: [20, 50],
//       creditRange: [10000, 3000000],
//       priceRange: [70, 200],
//       uniqueOnly: false
//     };
//     this.table = {
//       selectedRows: [],
//       sortConfig: { key: 'id', direction: 'asc' },
//       data: [
//         {
//           id: '2224',
//           createdAt: '14.02.2024 20:15 (+3)',
//           region: 'Самарская область',
//           city: 'Самара',
//           name: 'Максим',
//           phone: '+7 (925) ххх-хх-хх',
//           birthDate: '12.03.1980 (44)',
//           loanAmount: '580 000',
//           loanType: 'Потребительский',
//           price: '120'
//         },
//         {
//           id: '2221',
//           createdAt: '14.02.2024 20:15 (+3)',
//           region: 'Самарская область',
//           city: 'Самара',
//           name: 'Максим',
//           phone: '+7 (925) ххх-хх-хх',
//           birthDate: '12.03.1980 (44)',
//           loanAmount: '580 000',
//           loanType: 'Потребительский',
//           price: '120'
//         }
//       ]
//     };
//     this.currentPath = window.location.pathname;

//     this.initializeElements();
//     this.bindEvents();
//     this.initialize();
//   }

//   updateSidebarState() {
//     const shouldShowExpanded = this.sidebar.isExpanded || this.sidebar.isMobileOpen || this.sidebar.isHovered;
//     const { sidebar, logoSection, logoImg, mainContent, fixedBar } = this.elements;

//     // Update sidebar width and position
//     if (shouldShowExpanded) {
//       sidebar?.classList.remove('w-[90px]');
//       sidebar?.classList.add('sm:w-[292px]', 'w-[284px]');
//       mainContent?.classList.remove('lg:ml-[90px]');
//       mainContent?.classList.add('lg:ml-[292px]');
//       fixedBar?.classList.remove('lg:w-[calc(100%_-_234px)]');
//       fixedBar?.classList.add('lg:w-[calc(100%_-_120px_-_292px)]');
//     } else {
//       sidebar?.classList.remove('sm:w-[292px]', 'w-[284px]');
//       sidebar?.classList.add('w-[90px]');
//       mainContent?.classList.remove('lg:ml-[292px]');
//       mainContent?.classList.add('lg:ml-[90px]');
//       fixedBar?.classList.remove('lg:w-[calc(100%_-_120px_-_292px)]');
//       fixedBar?.classList.add('lg:w-[calc(100%_-_234px)]');
//     }

//     // Update mobile visibility
//     if (this.sidebar.isMobileOpen) {
//       sidebar?.classList.remove('-translate-x-full');
//       sidebar?.classList.add('translate-x-0');
//     } else {
//       sidebar?.classList.remove('translate-x-0');
//       sidebar?.classList.add('-translate-x-full');
//     }

//     // Update logo
//     if (shouldShowExpanded && logoImg) {
//       logoImg.width = 114;
//       logoImg.height = 32;
//       logoSection?.classList.remove('lg:justify-center');
//       logoSection?.classList.add('justify-start');
//     } else if (logoImg) {
//       logoImg.width = 32;
//       logoImg.height = 32;
//       logoSection?.classList.remove('justify-start');
//       logoSection?.classList.add('lg:justify-center');
//     }

//     this.updateMenuTitles(shouldShowExpanded);
//     this.renderMenuItems();
//   }

//   initializeElements() {
//     this.elements = {
//       // Sidebar elements
//       sidebar: document.getElementById('sidebar'),
//       logoSection: document.getElementById('logo-section'),
//       logoImg: document.getElementById('logo-img'),
//       mainMenuTitle: document.getElementById('main-menu-title'),
//       financeMenuTitle: document.getElementById('finance-menu-title'),
//       supportMenuTitle: document.getElementById('support-menu-title'),
//       mainMenu: document.getElementById('main-menu'),
//       financeMenu: document.getElementById('finance-menu'),
//       supportMenu: document.getElementById('support-menu'),
//       mainContent: document.querySelector('main'),

//       // Header elements
//       sidebarToggle: document.getElementById('sidebar-toggle'),
//       overlay: document.getElementById('overlay'),
//       hamburgerIcon: document.getElementById('hamburger-icon'),
//       crossIcon: document.getElementById('cross-icon'),
//       appMenuToggle: document.getElementById('app-menu-toggle'),
//       applicationMenu: document.getElementById('application-menu'),
//       notificationToggle: document.getElementById('notification-toggle'),
//       userDropdownToggle: document.getElementById('user-dropdown-toggle'),
//       userDropdownArrow: document.getElementById('user-dropdown-arrow'),
//       notificationDropdown: document.getElementById('notification-dropdown'),
//       notificationClose: document.getElementById('notification-close'),
//       notificationIcon: document.getElementById('notification-icon'),
//       userDropdown: document.getElementById('user-dropdown'),

//       // Filter elements
//       filterToggle: document.getElementById('filter-toggle'),
//       filterSection: document.getElementById('filter-section'),
//       datePicker: document.getElementById('date-picker'),
//       uniqueCheckbox: document.getElementById('unique-checkbox'),

//       // Table elements
//       selectAll: document.getElementById('select-all'),
//       tableBody: document.getElementById('table-body'),
//       fixedBar: document.getElementById('fixed-bar'),
//       selectedCount: document.getElementById('selected-count'),
//       totalPrice: document.getElementById('total-price'),
//       clearSelection: document.getElementById('clear-selection'),

//       // Range sliders
//       ageRangeDisplay: document.getElementById('age-range-display'),
//       creditRangeDisplay: document.getElementById('credit-range-display'),
//       priceRangeDisplay: document.getElementById('price-range-display'),

//       // Mobile menu dots
//       dot1: document.getElementById('dot-1'),
//       dot2: document.getElementById('dot-2'),
//       dot3: document.getElementById('dot-3')
//     };
//   }

//   // Navigation data
//   getNavItems() {
//     return [
//       {
//         icon: `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M6.57181 19C7.90661 18.3598 9.40997 18 11 18C12.59 18 14.0934 18.3598 15.4282 19M5.8 15H16.2C17.8802 15 18.7202 15 19.362 14.673C19.9265 14.3854 20.3854 13.9265 20.673 13.362C21 12.7202 21 11.8802 21 10.2V5.8C21 4.11984 21 3.27976 20.673 2.63803C20.3854 2.07354 19.9265 1.6146 19.362 1.32698C18.7202 1 17.8802 1 16.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V10.2C1 11.8802 1 12.7202 1.32698 13.362C1.6146 13.9265 2.07354 14.3854 2.63803 14.673C3.27976 15 4.11984 15 5.8 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>`,
//         name: 'Заявки',
//         path: '/'
//       },
//       {
//         icon: `<svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M4 7H16M1 1H19M7 13H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>`,
//         name: 'Купленные заявки',
//         path: '/purchased-orders'
//       },
//       {
//         icon: `<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M19 9H1M14 1V5M6 1V5M7 15L9 17L13.5 12.5M5.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7202 19 17.8802 19 16.2V7.8C19 6.11984 19 5.27976 18.673 4.63803C18.3854 4.07354 17.9265 3.6146 17.362 3.32698C16.7202 3 15.8802 3 14.2 3H5.8C4.11984 3 3.27976 3 2.63803 3.32698C2.07354 3.6146 1.6146 4.07354 1.32698 4.63803C1 5.27976 1 6.11984 1 7.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>`,
//         name: 'Планировщик',
//         path: '/scheduler',
//         notification: '2'
//       },
//       {
//         icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M1 9L1 19M13 9L13 19M7 1L7 19M19 1V19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>`,
//         name: 'Статистика',
//         path: '/statistics'
//       },
//       {
//         icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                     <path d="M17.7273 13.7273C17.6063 14.0015 17.5702 14.3056 17.6236 14.6005C17.6771 14.8954 17.8177 15.1676 18.0273 15.3818L18.0818 15.4364C18.2509 15.6052 18.385 15.8057 18.4765 16.0265C18.568 16.2472 18.6151 16.4838 18.6151 16.7227C18.6151 16.9617 18.568 17.1983 18.4765 17.419C18.385 17.6397 18.2509 17.8402 18.0818 18.0091C17.913 18.1781 17.7124 18.3122 17.4917 18.4037C17.271 18.4952 17.0344 18.5423 16.7955 18.5423C16.5565 18.5423 16.3199 18.4952 16.0992 18.4037C15.8785 18.3122 15.678 18.1781 15.5091 18.0091L15.4545 17.9545C15.2403 17.745 14.9682 17.6044 14.6733 17.5509C14.3784 17.4974 14.0742 17.5335 13.8 17.6545C13.5311 17.7698 13.3018 17.9611 13.1403 18.205C12.9788 18.4489 12.8921 18.7347 12.8909 19.0273V19.1818C12.8909 19.664 12.6994 20.1265 12.3584 20.4675C12.0174 20.8084 11.5549 21 11.0727 21C10.5905 21 10.1281 20.8084 9.78708 20.4675C9.4461 20.1265 9.25455 19.664 9.25455 19.1818V19.1C9.24751 18.7991 9.15011 18.5073 8.97501 18.2625C8.79991 18.0176 8.55521 17.8312 8.27273 17.7273C7.99853 17.6063 7.69437 17.5702 7.39947 17.6236C7.10456 17.6771 6.83244 17.8177 6.61818 18.0273L6.56364 18.0818C6.39478 18.2509 6.19425 18.385 5.97353 18.4765C5.7528 18.568 5.51621 18.6151 5.27727 18.6151C5.03834 18.6151 4.80174 18.568 4.58102 18.4765C4.36029 18.385 4.15977 18.2509 3.99091 18.0818C3.82186 17.913 3.68775 17.7124 3.59626 17.4917C3.50476 17.271 3.45766 17.0344 3.45766 16.7955C3.45766 16.5565 3.50476 16.3199 3.59626 16.0992C3.68775 15.8785 3.82186 15.678 3.99091 15.5091L4.04545 15.4545C4.25503 15.2403 4.39562 14.9682 4.4491 14.6733C4.50257 14.3784 4.46647 14.0742 4.34545 13.8C4.23022 13.5311 4.03887 13.3018 3.79497 13.1403C3.55107 12.9788 3.26526 12.8921 2.97273 12.8909H2.81818C2.33597 12.8909 1.87351 12.6994 1.53253 12.3584C1.19156 12.0174 1 11.5549 1 11.0727C1 10.5905 1.19156 10.1281 1.53253 9.78708C1.87351 9.4461 2.33597 9.25455 2.81818 9.25455H2.9C3.2009 9.24751 3.49273 9.15011 3.73754 8.97501C3.98236 8.79991 4.16883 8.55521 4.27273 8.27273C4.39374 7.99853 4.42984 7.69437 4.37637 7.39947C4.3229 7.10456 4.18231 6.83244 3.97273 6.61818L3.91818 6.56364C3.74913 6.39478 3.61503 6.19425 3.52353 5.97353C3.43203 5.7528 3.38493 5.51621 3.38493 5.27727C3.38493 5.03834 3.43203 4.80174 3.52353 4.58102C3.61503 4.36029 3.74913 4.15977 3.91818 3.99091C4.08704 3.82186 4.28757 3.68775 4.50829 3.59626C4.72901 3.50476 4.96561 3.45766 5.20455 3.45766C5.44348 3.45766 5.68008 3.50476 5.9008 3.59626C6.12152 3.68775 6.32205 3.82186 6.49091 3.99091L6.54545 4.04545C6.75971 4.25503 7.03183 4.39562 7.32674 4.4491C7.62164 4.50257 7.9258 4.46647 8.2 4.34545H8.27273C8.54161 4.23022 8.77093 4.03887 8.93245 3.79497C9.09397 3.55107 9.18065 3.26526 9.18182 2.97273V2.81818C9.18182 2.33597 9.37338 1.87351 9.71435 1.53253C10.0553 1.19156 10.5178 1 11 1C11.4822 1 11.9447 1.19156 12.2856 1.53253C12.6266 1.87351 12.8182 2.33597 12.8182 2.81818V2.9C12.8193 3.19253 12.906 3.47834 13.0676 3.72224C13.2291 3.96614 13.4584 4.15749 13.7273 4.27273C14.0015 4.39374 14.3056 4.42984 14.6005 4.37637C14.8954 4.3229 15.1676 4.18231 15.3818 3.97273L15.4364 3.91818C15.6052 3.74913 15.8057 3.61503 16.0265 3.52353C16.2472 3.43203 16.4838 3.38493 16.7227 3.38493C16.9617 3.38493 17.1983 3.43203 17.419 3.52353C17.6397 3.61503 17.8402 3.74913 18.0091 3.91818C18.1781 4.08704 18.3122 4.28757 18.4037 4.50829C18.4952 4.72901 18.5423 4.96561 18.5423 5.20455C18.5423 5.44348 18.4952 5.68008 18.4037 5.9008C18.3122 6.12152 18.1781 6.32205 18.0091 6.49091L17.9545 6.54545C17.745 6.75971 17.6044 7.03183 17.5509 7.32674C17.4974 7.62164 17.5335 7.9258 17.6545 8.2V8.27273C17.7698 8.54161 17.9611 8.77093 18.205 8.93245C18.4489 9.09397 18.7347 9.18065 19.0273 9.18182H19.1818C19.664 9.18182 20.1265 9.37338 20.4675 9.71435C20.8084 10.0553 21 10.5178 21 11C21 11.4822 20.8084 11.9447 20.4675 12.2856C20.1265 12.6266 19.664 12.8182 19.1818 12.8182H19.1C18.8075 12.8193 18.5217 12.906 18.2778 13.0676C18.0339 13.2291 17.8425 13.4584 17.7273 13.7273Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>`,
//         name: 'API',
//         path: '/api'
//       }
//     ];
//   }

//   getFinanceItems() {
//     return [
//       {
//         icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M14.5 12H14.51M1 3V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5L3 5C1.89543 5 1 4.10457 1 3ZM1 3C1 1.89543 1.89543 1 3 1H15M15 12C15 12.2761 14.7761 12.5 14.5 12.5C14.2239 12.5 14 12.2761 14 12C14 11.7239 14.2239 11.5 14.5 11.5C14.7761 11.5 15 11.7239 15 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>`,
//         name: 'Баланс',
//         path: '/balance'
//       },
//       {
//         icon: `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M6 8.5L8 10.5L12.5 6M17 19V5.8C17 4.11984 17 3.27976 16.673 2.63803C16.3854 2.07354 15.9265 1.6146 15.362 1.32698C14.7202 1 13.8802 1 12.2 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V19L3.75 17L6.25 19L9 17L11.75 19L14.25 17L17 19Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>`,
//         name: 'Архив платежей',
//         path: '/payments-archive'
//       }
//     ];
//   }

//   getSupportItems() {
//     return [
//       {
//         icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M5.5 10H5.51M10 10H10.01M14.5 10H14.51M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 11.1971 1.23374 12.3397 1.65806 13.3845C1.73927 13.5845 1.77988 13.6845 1.798 13.7653C1.81572 13.8443 1.8222 13.9028 1.82221 13.9839C1.82222 14.0667 1.80718 14.1569 1.77711 14.3374L1.18413 17.8952C1.12203 18.2678 1.09098 18.4541 1.14876 18.5888C1.19933 18.7067 1.29328 18.8007 1.41118 18.8512C1.54589 18.909 1.73218 18.878 2.10476 18.8159L5.66265 18.2229C5.84309 18.1928 5.9333 18.1778 6.01613 18.1778C6.09715 18.1778 6.15566 18.1843 6.23472 18.202C6.31554 18.2201 6.41552 18.2607 6.61549 18.3419C7.6603 18.7663 8.80286 19 10 19ZM6 10C6 10.2761 5.77614 10.5 5.5 10.5C5.22386 10.5 5 10.2761 5 10C5 9.72386 5.22386 9.5 5.5 9.5C5.77614 9.5 6 9.72386 6 10ZM10.5 10C10.5 10.2761 10.2761 10.5 10 10.5C9.72386 10.5 9.5 10.2761 9.5 10C9.5 9.72386 9.72386 9.5 10 9.5C10.2761 9.5 10.5 9.72386 10.5 10ZM15 10C15 10.2761 14.7761 10.5 14.5 10.5C14.2239 10.5 14 10.2761 14 10C14 9.72386 14.2239 9.5 14.5 9.5C14.7761 9.5 15 9.72386 15 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
//                 </svg>`,
//         name: 'Контакты',
//         path: '/account-details-individual'
//       }
//     ];
//   }

//   // Utility functions
//   isActive(path) {
//     return this.currentPath === path;
//   }

//   formatNumber(value) {
//     return value.toLocaleString('ru-RU');
//   }

//   // Sidebar functions
//   updateSidebarState() {
//     const shouldShowExpanded = this.sidebar.isExpanded || this.sidebar.isMobileOpen || this.sidebar.isHovered;
//     const { sidebar, logoSection, logoImg, mainContent } = this.elements;

//     // Update sidebar width and position
//     if (shouldShowExpanded) {
//       sidebar?.classList.remove('w-[90px]');
//       sidebar?.classList.add('sm:w-[292px]', 'w-[284px]');
//       mainContent?.classList.remove('lg:ml-[90px]');
//       mainContent?.classList.add('lg:ml-[292px]');
//     } else {
//       sidebar?.classList.remove('sm:w-[292px]', 'w-[284px]');
//       sidebar?.classList.add('w-[90px]');
//       mainContent?.classList.remove('lg:ml-[292px]');
//       mainContent?.classList.add('lg:ml-[90px]');
//     }

//     // Update mobile visibility
//     if (this.sidebar.isMobileOpen) {
//       sidebar?.classList.remove('-translate-x-full');
//       sidebar?.classList.add('translate-x-0');
//     } else {
//       sidebar?.classList.remove('translate-x-0');
//       sidebar?.classList.add('-translate-x-full');
//     }

//     // Update logo
//     if (shouldShowExpanded && logoImg) {
//       logoImg.width = 114;
//       logoImg.height = 32;
//       logoSection?.classList.remove('lg:justify-center');
//       logoSection?.classList.add('justify-start');
//     } else if (logoImg) {
//       logoImg.width = 32;
//       logoImg.height = 32;
//       logoSection?.classList.remove('justify-start');
//       logoSection?.classList.add('lg:justify-center');
//     }

//     this.updateMenuTitles(shouldShowExpanded);
//     this.renderMenuItems();
//   }

//   updateMenuTitles(shouldShowExpanded) {
//     const titles = [
//       { element: this.elements.mainMenuTitle, text: 'МЕНЮ' },
//       { element: this.elements.financeMenuTitle, text: 'Финансы' },
//       { element: this.elements.supportMenuTitle, text: 'Поддержка' }
//     ];

//     titles.forEach(({ element, text }) => {
//       if (!element) return;

//       if (shouldShowExpanded) {
//         element.innerHTML = text;
//         element.classList.remove('lg:justify-center');
//         element.classList.add('justify-start');
//       } else {
//         element.innerHTML = `<svg class="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <circle cx="5" cy="12" r="2" fill="currentColor"/>
//                     <circle cx="12" cy="12" r="2" fill="currentColor"/>
//                     <circle cx="19" cy="12" r="2" fill="currentColor"/>
//                 </svg>`;
//         element.classList.remove('justify-start');
//         element.classList.add('lg:justify-center');
//       }
//     });
//   }

//   createMenuItem(item, index, menuType) {
//     const li = document.createElement('li');
//     const shouldShowExpanded = this.sidebar.isExpanded || this.sidebar.isMobileOpen || this.sidebar.isHovered;
//     const itemIsActive = this.isActive(item.path);

//     if (item.subItems) {
//       // Submenu item
//       const button = document.createElement('button');
//       button.className = `menu-item group ${this.openSubmenu?.type === menuType && this.openSubmenu?.index === index
//         ? 'menu-item-active'
//         : 'menu-item-inactive'
//         } cursor-pointer ${!shouldShowExpanded ? 'lg:justify-center' : 'lg:justify-start'
//         }`;

//       // Update icon color based on active state
//       const iconColor = (this.openSubmenu?.type === menuType && this.openSubmenu?.index === index) ? '#3B82F6' : '#707D89';
//       const updatedIcon = item.icon.replace(/stroke="[^"]*"/g, `stroke="${iconColor}"`);

//       button.innerHTML = `
//         <span class="menu-item-icon-size ${this.openSubmenu?.type === menuType && this.openSubmenu?.index === index
//           ? 'menu-item-icon-active'
//           : 'menu-item-icon-inactive'
//         }">
//           ${updatedIcon}
//         </span>
//         ${shouldShowExpanded ? `
//           ${item.notification ? `<span class="menu-notification-badge">${item.notification}</span>` : ''}
//           <span class="menu-item-text">${item.name}</span>
//           <svg class="ml-auto w-5 h-5 transition-transform duration-200 ${this.openSubmenu?.type === menuType && this.openSubmenu?.index === index
//             ? 'rotate-180 text-blue-500'
//             : ''
//           }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
//           </svg>
//         ` : ''}
//       `;

//       button.addEventListener('click', () => this.handleSubmenuToggle(index, menuType));
//       li.appendChild(button);

//       // Submenu implementation would go here
//     } else {
//       // Regular menu item
//       const link = document.createElement('a');
//       link.href = item.path;
//       link.className = `menu-item group ${itemIsActive ? 'menu-item-active' : 'menu-item-inactive'
//         }`;

//       // Update icon color based on active state
//       const iconColor = itemIsActive ? '#3B82F6' : '#707D89';
//       const updatedIcon = item.icon.replace(/stroke="[^"]*"/g, `stroke="${iconColor}"`);

//       link.innerHTML = `
//         <span class="menu-item-icon-size ${itemIsActive ? 'menu-item-icon-active' : 'menu-item-icon-inactive'
//         }">
//           ${updatedIcon}
//         </span>
//         ${shouldShowExpanded ? `
//           ${item.notification ? `<span class="menu-notification-badge bg-blue-50 absolute right-3 top-1/2 -translate-y-1/2 w-[23px] h-[23px] flex items-center justify-center rounded-full text-xs text-blue-500 font-normal">${item.notification}</span>` : ''}
//           <span class="menu-item-text">${item.name}</span>
//         ` : ''}
//       `;

//       li.appendChild(link);
//     }

//     return li;
//   }

//   renderMenuItems() {
//     const { mainMenu, financeMenu, supportMenu } = this.elements;

//     // Clear existing items
//     if (mainMenu) mainMenu.innerHTML = '';
//     if (financeMenu) financeMenu.innerHTML = '';
//     if (supportMenu) supportMenu.innerHTML = '';

//     // Render main menu items
//     this.getNavItems().forEach((item, index) => {
//       mainMenu?.appendChild(this.createMenuItem(item, index, 'main'));
//     });

//     // Render finance menu items
//     this.getFinanceItems().forEach((item, index) => {
//       financeMenu?.appendChild(this.createMenuItem(item, index, 'finance'));
//     });

//     // Render support menu items
//     this.getSupportItems().forEach((item, index) => {
//       supportMenu?.appendChild(this.createMenuItem(item, index, 'support'));
//     });
//   }


//   // Header functions
//   handleToggle() {
//     if (window.innerWidth >= 1024) {
//       // Desktop sidebar toggle
//       this.sidebar.isExpanded = !this.sidebar.isExpanded;
//       this.updateSidebarState();
//     } else {
//       // Mobile sidebar toggle
//       this.header.isMobileOpen = !this.header.isMobileOpen;
//       this.sidebar.isMobileOpen = this.header.isMobileOpen;
//       this.overlay.isOpen = !this.overlay.isOpen;
//       const overlay = document.getElementById('overlay');
//       overlay.classList.toggle('show')


//       const { hamburgerIcon, crossIcon } = this.elements;
//       if (this.header.isMobileOpen) {
//         hamburgerIcon?.classList.add('hidden');
//         crossIcon?.classList.remove('hidden');
//       } else {
//         hamburgerIcon?.classList.remove('hidden');
//         crossIcon?.classList.add('hidden');
//       }
//       this.updateSidebarState();
//     }
//   }

//   toggleApplicationMenu() {
//     this.header.isApplicationMenuOpen = !this.header.isApplicationMenuOpen;
//     const { applicationMenu, dot1, dot2, dot3 } = this.elements;

//     if (this.header.isApplicationMenuOpen) {
//       applicationMenu?.classList.remove('hidden');
//       applicationMenu?.classList.add('flex');
//       // Change dots color to blue
//       dot1?.setAttribute('stroke', '#3B82F6');
//       dot2?.setAttribute('stroke', '#3B82F6');
//       dot3?.setAttribute('stroke', '#3B82F6');
//     } else {
//       applicationMenu?.classList.remove('flex');
//       applicationMenu?.classList.add('hidden');
//       // Reset dots color
//       dot1?.setAttribute('stroke', '#707D89');
//       dot2?.setAttribute('stroke', '#707D89');
//       dot3?.setAttribute('stroke', '#707D89');
//     }
//   }

//   // Filter functions
//   toggleFilterSection() {
//     this.filters.isOpen = !this.filters.isOpen;
//     const { filterSection, filterToggle } = this.elements;

//     if (this.filters.isOpen) {
//       filterSection?.classList.remove('hidden');
//       filterSection?.classList.add('block');
//       filterToggle?.classList.add('shadow-[0px_0px_0px_4px_#465FFF1F]');
//     } else {
//       filterSection?.classList.remove('block');
//       filterSection?.classList.add('hidden');
//       filterToggle?.classList.remove('shadow-[0px_0px_0px_4px_#465FFF1F]');
//     }
//   }

//   // Table functions
//   renderTable() {
//     const { tableBody } = this.elements;
//     if (!tableBody) return;

//     tableBody.innerHTML = '';

//     this.table.data.forEach((row) => {
//       const tr = document.createElement('tr');
//       tr.innerHTML = `
//                 <td class="pl-6 w-14">
//                     <input
//                         type="checkbox"
//                         class="checkbox checkbox-input"
//                         data-row-id="${row.id}"
//                         ${this.table.selectedRows.includes(row.id) ? 'checked' : ''}
//                     />
//                 </td>
//                 <td class="px-3 h-11 py-2 text-start">
//                     <div class="flex items-center gap-2">
//                         <span class="md:text-sm text-xs">${row.id}</span>
//                         <div class="w-[6px] h-[6px] rounded-full bg-green-600 opacity-20"></div>
//                     </div>
//                 </td>
//                 <td class="px-3 h-11 py-2 text-start">
//                     <span class="md:text-sm text-xs">${row.createdAt}</span>
//                 </td>
//                 <td class="px-3 h-11 py-2 text-start">
//                     <span class="md:text-sm text-xs">${row.region}</span>
//                 </td>
//                 <td class="px-3 h-11 py-2 text-start">
//                     <span class="md:text-sm text-xs">${row.city}</span>
//                 </td>
//                 <td class="px-3 h-11 py-2 text-start">
//                     <span class="md:text-sm text-xs">${row.name}</span>
//                 </td>
//                 <td class="px-3 h-11 py-2 text-start">
//                     <span class="md:text-sm text-xs">${row.phone}</span>
//                 </td>
//                 <td class="px-3 h-11 py-2 text-start">
//                     <span class="md:text-sm text-xs">${row.birthDate}</span>
//                 </td>
//                 <td class="px-3 h-11 py-2 text-start">
//                     <span class="md:text-sm text-xs">${row.loanAmount}</span>
//                 </td>
//                 <td class="px-3 h-11 py-2 text-start">
//                     <span class="md:text-sm text-xs">${row.loanType}</span>
//                 </td>
//                 <td class="px-3 h-11 py-2 text-start w-[88px]">
//                     <span class="md:text-sm text-xs">${row.price}</span>
//                 </td>
//             `;
//       tableBody.appendChild(tr);
//     });

//     this.updateFixedBar();
//   }

//   handleRowSelection(rowId) {
//     if (this.table.selectedRows.includes(rowId)) {
//       this.table.selectedRows = this.table.selectedRows.filter(id => id !== rowId);
//     } else {
//       this.table.selectedRows.push(rowId);
//     }
//     this.updateSelectAllCheckbox();
//     this.updateFixedBar();
//   }

//   handleSelectAll() {
//     const { selectAll } = this.elements;
//     if (this.table.selectedRows.length === this.table.data.length) {
//       this.table.selectedRows = [];
//       selectAll.checked = false;
//     } else {
//       this.table.selectedRows = this.table.data.map(row => row.id);
//       selectAll.checked = true;
//     }
//     this.renderTable();
//     this.updateFixedBar();
//   }

//   updateSelectAllCheckbox() {
//     const { selectAll } = this.elements;
//     if (selectAll) {
//       selectAll.checked = this.table.selectedRows.length === this.table.data.length && this.table.data.length > 0;
//     }
//   }

//   updateFixedBar() {
//     const { fixedBar, selectedCount, totalPrice } = this.elements;

//     if (this.table.selectedRows.length > 0) {
//       const total = this.table.selectedRows.reduce((sum, rowId) => {
//         const row = this.table.data.find(r => r.id === rowId);
//         return row ? sum + parseFloat(row.price) : sum;
//       }, 0);

//       selectedCount.textContent = this.table.selectedRows.length;
//       totalPrice.textContent = `${total.toFixed(2)} ₽`;
//       fixedBar?.classList.remove('hidden');
//     } else {
//       fixedBar?.classList.add('hidden');
//     }
//   }

//   clearSelection() {
//     this.table.selectedRows = [];
//     this.renderTable();
//     this.updateFixedBar();
//   }
//   toggleNotificationDropdown() {
//     this.header.isNotificationOpen = !this.header.isNotificationOpen;
//     const { notificationDropdown, notificationIcon } = this.elements;

//     if (this.header.isNotificationOpen) {
//       notificationDropdown?.classList.add('show');
//       notificationIcon?.classList.remove('stroke-neutral-muted');
//       notificationIcon?.classList.add('stroke-blue-500');
//     } else {
//       notificationDropdown?.classList.remove('show');
//       notificationIcon?.classList.remove('stroke-blue-500');
//       notificationIcon?.classList.add('stroke-neutral-muted');
//     }
//     this.header.notifying = false;
//   }

//   toggleUserDropdown() {
//     this.header.isUserDropdownOpen = !this.header.isUserDropdownOpen;
//     const { userDropdown, userDropdownArrow } = this.elements;

//     if (this.header.isUserDropdownOpen) {
//       userDropdown?.classList.add('show');
//       userDropdownArrow?.classList.add('rotate-180', 'stroke-blue-500');
//     } else {
//       userDropdown?.classList.remove('show');
//       userDropdownArrow?.classList.remove('rotate-180', 'stroke-blue-500');
//     }
//   }

//   closeAllDropdowns() {
//     // Close notification dropdown if open
//     if (this.header.isNotificationOpen) {
//       const { notificationDropdown, notificationIcon } = this.elements;
//       notificationDropdown?.classList.remove('show');
//       notificationIcon?.classList.remove('stroke-blue-500');
//       notificationIcon?.classList.add('stroke-neutral-muted');
//       this.header.isNotificationOpen = false;
//     }

//     // Close user dropdown if open
//     if (this.header.isUserDropdownOpen) {
//       const { userDropdown, userDropdownArrow } = this.elements;
//       userDropdown?.classList.remove('show');
//       userDropdownArrow?.classList.remove('rotate-180', 'stroke-blue-500');
//       this.header.isUserDropdownOpen = false;
//     }
//   }

//   bindEvents() {
//     const {
//       sidebar, sidebarToggle, appMenuToggle, notificationToggle,
//       notificationClose, userDropdownToggle, notificationDropdown, userDropdown, overlay
//     } = this.elements;

//     // Sidebar events
//     sidebar?.addEventListener('mouseenter', () => {
//       if (!this.sidebar.isExpanded) {
//         this.sidebar.isHovered = true;
//         this.updateSidebarState();
//       }
//     });

//     sidebar?.addEventListener('mouseleave', () => {
//       this.sidebar.isHovered = false;
//       this.updateSidebarState();
//     });

//     // Header events
//     sidebarToggle?.addEventListener('click', () => this.handleToggle());
//     overlay?.addEventListener('click', () => this.handleToggle());
//     appMenuToggle?.addEventListener('click', () => this.toggleApplicationMenu());

//     notificationToggle?.addEventListener('click', (e) => {
//       e.stopPropagation();
//       this.toggleNotificationDropdown();
//     });

//     notificationClose?.addEventListener('click', () => this.toggleNotificationDropdown());

//     userDropdownToggle?.addEventListener('click', (e) => {
//       e.stopPropagation();
//       this.toggleUserDropdown();
//     });

//     // Close dropdowns when clicking outside
//     document.addEventListener('click', (e) => {
//       if (!notificationDropdown?.contains(e.target) &&
//         !notificationToggle?.contains(e.target) &&
//         !userDropdown?.contains(e.target) &&
//         !userDropdownToggle?.contains(e.target)) {
//         this.closeAllDropdowns();
//       }
//     });

//     // Window resize handler
//     window.addEventListener('resize', () => {
//       if (window.innerWidth >= 1024) {
//         const { applicationMenu, hamburgerIcon, crossIcon } = this.elements;
//         applicationMenu?.classList.remove('hidden');
//         applicationMenu?.classList.add('flex');
//         // Reset mobile state
//         this.header.isMobileOpen = false;
//         this.sidebar.isMobileOpen = false;
//         hamburgerIcon?.classList.remove('hidden');
//         crossIcon?.classList.add('hidden');
//         this.updateSidebarState();
//       } else if (!this.header.isApplicationMenuOpen) {
//         this.elements.applicationMenu?.classList.remove('flex');
//         this.elements.applicationMenu?.classList.add('hidden');
//       }
//     });

//     // Browser navigation
//     window.addEventListener('popstate', () => {
//       this.currentPath = window.location.pathname;
//       this.updateSidebarState();
//     });

//     // Keyboard shortcuts
//     document.addEventListener('keydown', (event) => {
//       if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
//         event.preventDefault();
//         console.log('Search shortcut triggered');
//       }
//     });
//   }
//   // Initialize the application
//   initialize() {
//     // Initialize the application menu for desktop
//     if (window.innerWidth >= 1024) {
//       this.elements.applicationMenu?.classList.remove('hidden');
//       this.elements.applicationMenu?.classList.add('flex');
//     }

//     // Initialize date picker
//     if (this.elements.datePicker) {
//       flatpickr(this.elements.datePicker, {
//         mode: 'range',
//         dateFormat: 'd.m.Y',
//         defaultDate: ['2025-03-15', '2025-03-15'],
//         locale: {
//           rangeSeparator: ' — ',
//         },
//         altInput: true,
//         altFormat: 'd.m.Y'
//       });
//     }

//     this.updateSidebarState();
//     this.renderTable();
//   }
// }
// // Initialize the application when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//   window.app = new ApplicationState();
// });

// // intro code

// // Toggle filter section
// const filterToggle = document.getElementById('filter-toggle');
// if (filterToggle) {
//   const filterSection = document.getElementById('filter-section');
//   filterToggle.addEventListener('click', () => {
//     filterSection.classList.toggle('hidden');
//     filterToggle.classList.toggle('shadow-[0px_0px_0px_4px_#465FFF1F]');
//   });
// }

// // Checkbox state

// // select custom
// // Initialize all dropdowns
// document.querySelectorAll('.select').forEach((select, index) => {
//   const toggle = select.querySelector('.select-toggle');
//   const optionsList = select.querySelector('.select-options');
//   const display = select.querySelector('.select-display');
//   const arrow = select.querySelector('.select-arrow');
//   let isOpen = false;

//   // Toggle dropdown
//   function toggleDropdown() {
//     isOpen = !isOpen;
//     optionsList.classList.toggle('hidden', !isOpen);
//     arrow.classList.toggle('rotate-180', isOpen);
//   }

//   // Handle option selection
//   function handleSelect(value) {
//     display.textContent = value;
//     display.classList.add('font-medium', 'text-black');
//     select.querySelectorAll('.select-option').forEach(li => {
//       li.classList.toggle('select-option-selected', li.textContent === value);
//     });
//     toggleDropdown();
//     console.log(`Select ${index + 1} selected value: `, value);
//   }

//   // Handle click outside
//   function handleClickOutside(event) {
//     if (!select.contains(event.target)) {
//       isOpen = false;
//       optionsList.classList.add('hidden');
//       arrow.classList.remove('rotate-180');
//     }
//   }

//   // Event listeners
//   toggle.addEventListener('click', toggleDropdown);
//   document.addEventListener('mousedown', handleClickOutside);
//   select.querySelectorAll('.select-option').forEach(option => {
//     option.addEventListener('click', (e) => {
//       e.stopPropagation();
//       handleSelect(option.textContent);
//     });
//   });

//   // Cleanup
//   window.addEventListener('unload', () => {
//     document.removeEventListener('mousedown', handleClickOutside);
//   });
// });


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


// // custom checkbox
// // Initialize all checkboxes
// document.querySelectorAll('.checkbox-container').forEach(checkbox => {
//   const input = checkbox.querySelector('.checkbox-input');
//   const checkIcon = checkbox.querySelector('.checkbox-check');
//   const disabledIcon = checkbox.querySelector('.checkbox-disabled');
//   const isDisabled = checkbox.dataset.disabled === 'true';

//   // Update visual state
//   function updateCheckbox() {
//     const isChecked = input.checked;
//     // checkIcon.classList.toggle('hidden', !isChecked || isDisabled);
//     // disabledIcon.classList.toggle('hidden', !isDisabled || isChecked);
//     // checkbox.dataset.checked = isChecked.toString();
//     // Simulate onChange
//   }

//   // Event listener
//   input.addEventListener('change', updateCheckbox);

//   // Initial state
//   updateCheckbox();
// });


// // Table data and configuration
// const tableData = [
//   {
//     id: "2224",
//     createdAt: "14.02.2024 20:15 (+3)",
//     region: "Самарская область",
//     city: "Самара",
//     name: "Максим",
//     phone: "+7 (925) ххх-хх-хх",
//     birthDate: "12.03.1980 (44)",
//     loanAmount: "580 000",
//     loanType: "Потребительский",
//     price: "120",
//   },
//   {
//     id: "2221",
//     createdAt: "14.02.2024 20:15 (+3)",
//     region: "Самарская область",
//     city: "Самара",
//     name: "Максим",
//     phone: "+7 (925) ххх-хх-хх",
//     birthDate: "12.03.1980 (44)",
//     loanAmount: "580 000",
//     loanType: "Потребительский",
//     price: "120",
//   },
// ]

// const columns = [
//   { key: "id", label: "ID" },
//   { key: "createdAt", label: "Дата создания", sortable: true },
//   { key: "region", label: "Регион" },
//   { key: "city", label: "Город" },
//   { key: "name", label: "Имя" },
//   { key: "phone", label: "Телефон" },
//   { key: "birthDate", label: "Дата рождения", sortable: true },
//   { key: "loanAmount", label: "Сумма кредита" },
//   { key: "loanType", label: "Вид кредита" },
//   { key: "price", label: "Цена" },
// ]

// // Application state
// class ApplicationTableState {
//   constructor() {
//     this.selectedRows = []
//     this.sortConfig = { key: "id", direction: "asc" }
//     this.sidebarState = {
//       isExpanded: false,
//       isHovered: false,
//     }

//     this.initElements()
//     this.bindEvents()
//     this.renderTable()
//   }

//   initElements() {
//     this.elements = {
//       tableBody: document.getElementById("table-body"),
//       selectAll: document.getElementById("select-all"),
//       fixedBar: document.getElementById("fixed-bar"),
//       selectedCount: document.getElementById("selected-count"),
//       totalPrice: document.getElementById("total-price"),
//       clearSelection: document.getElementById("clear-selection"),
//       sortableHeaders: document.querySelectorAll("[data-sort]"),
//     }
//   }

//   bindEvents() {
//     // Select all checkbox
//     this.elements.selectAll.addEventListener("change", () => this.handleSelectAll())

//     // Clear selection button
//     this.elements.clearSelection.addEventListener("click", () => this.clearSelection())

//     // Sortable headers
//     this.elements.sortableHeaders.forEach((header) => {
//       header.addEventListener("click", () => {
//         const key = header.dataset.sort
//         this.handleSort(key)
//       })
//     })

//     // Row selection (delegated event)
//     this.elements.tableBody.addEventListener("change", (e) => {
//       if (e.target.type === "checkbox" && e.target.dataset.rowId) {
//         this.handleRowSelection(e.target.dataset.rowId)
//       }
//     })

//     // Update fixed bar position on window resize
//     window.addEventListener("resize", () => this.updateFixedBarWidth())
//   }

//   handleSort(key) {
//     this.sortConfig = {
//       key,
//       direction: this.sortConfig.key === key && this.sortConfig.direction === "asc" ? "desc" : "asc",
//     }

//     this.renderTable()
//   }

//   handleSelectAll() {
//     if (this.selectedRows.length === tableData.length) {
//       this.selectedRows = []
//     } else {
//       this.selectedRows = tableData.map((row) => row.id)
//     }

//     this.renderTable()
//     this.updateFixedBar()
//   }

//   handleRowSelection(rowId) {
//     if (this.selectedRows.includes(rowId)) {
//       this.selectedRows = this.selectedRows.filter((id) => id !== rowId)
//     } else {
//       this.selectedRows.push(rowId)
//     }

//     this.updateSelectAllCheckbox()
//     this.updateFixedBar()
//   }

//   updateSelectAllCheckbox() {
//     this.elements.selectAll.checked = this.selectedRows.length === tableData.length && tableData.length > 0
//   }

//   clearSelection() {
//     this.selectedRows = []
//     this.renderTable()
//     this.updateFixedBar()
//   }

//   getSortedData() {
//     return [...tableData].sort((a, b) => {
//       const aValue = a[this.sortConfig.key]
//       const bValue = b[this.sortConfig.key]

//       if (aValue < bValue) return this.sortConfig.direction === "asc" ? -1 : 1
//       if (aValue > bValue) return this.sortConfig.direction === "asc" ? 1 : -1
//       return 0
//     })
//   }

//   renderTable() {
//     const sortedData = this.getSortedData()
//     const tableBody = this.elements.tableBody

//     // Clear existing rows
//     tableBody.innerHTML = ""

//     // Create new rows
//     sortedData.forEach((row) => {
//       const tr = document.createElement("tr")

//       // Checkbox cell
//       const checkboxCell = document.createElement("td")
//       checkboxCell.className = "pl-6 w-14"

//       const checkbox = document.createElement("input")
//       checkbox.type = "checkbox"
//       checkbox.className = "checkbox checkbox-input"
//       checkbox.dataset.rowId = row.id
//       checkbox.checked = this.selectedRows.includes(row.id)

//       checkboxCell.appendChild(checkbox)
//       tr.appendChild(checkboxCell)

//       // Data cells
//       columns.forEach((column, index) => {
//         const td = document.createElement("td")
//         td.className = `px-3 h-11 py-2 text-start ${index === columns.length - 1 ? "w-[88px]" : ""} `

//         if (column.key === "id") {
//           // Special case for ID column with status indicator
//           td.innerHTML = `
//             <div class="flex items-center gap-2" >
//               <span class="md:text-sm text-xs">${row[column.key]}</span>
//               <div class="w-[6px] h-[6px] rounded-full bg-[#039855] opacity-20"></div>
//             </div>
//       `
//         } else {
//           td.innerHTML = `<span class="md:text-sm text-xs" > ${row[column.key]}</span> `
//         }

//         tr.appendChild(td)
//       })

//       tableBody.appendChild(tr)
//     })

//     // Update sort indicators
//     this.updateSortIndicators()

//     // Update select all checkbox
//     this.updateSelectAllCheckbox()
//   }

//   updateSortIndicators() {
//     this.elements.sortableHeaders.forEach((header) => {
//       const key = header.dataset.sort
//       const arrow = header.querySelector("svg")

//       if (this.sortConfig.key === key) {
//         arrow.classList.toggle("rotate-180", this.sortConfig.direction === "asc")
//       } else {
//         arrow.classList.remove("rotate-180")
//       }
//     })
//   }

//   updateFixedBar() {
//     const { fixedBar, selectedCount, totalPrice } = this.elements

//     if (this.selectedRows.length > 0) {
//       // Calculate total price
//       const total = this.selectedRows.reduce((sum, rowId) => {
//         const row = tableData.find((r) => r.id === rowId)
//         return row ? sum + Number.parseFloat(row.price) : sum
//       }, 0)

//       // Update UI
//       selectedCount.textContent = this.selectedRows.length
//       totalPrice.textContent = `${total.toFixed(2)} ₽`
//       fixedBar.classList.remove("hidden")

//       // Update width based on sidebar state
//       this.updateFixedBarWidth()
//     } else {
//       fixedBar.classList.add("hidden")
//     }
//   }

//   updateFixedBarWidth() {
//     const { fixedBar } = this.elements

//     // Determine width based on sidebar state
//     if (this.sidebarState.isExpanded || this.sidebarState.isHovered) {
//       fixedBar.classList.remove("lg:w-[calc(100%_-_234px)]")
//       fixedBar.classList.add("lg:w-[calc(100%_-_120px_-_292px)]")
//     } else {
//       fixedBar.classList.remove("lg:w-[calc(100%_-_120px_-_292px)]")
//       fixedBar.classList.add("lg:w-[calc(100%_-_234px)]")
//     }
//   }

//   // Method to update sidebar state from outside
//   updateSidebarState(isExpanded, isHovered) {
//     this.sidebarState = { isExpanded, isHovered }
//     if (this.selectedRows.length > 0) {
//       this.updateFixedBarWidth()
//     }
//   }
// }

// // Initialize the application when DOM is loaded
// document.addEventListener("DOMContentLoaded", () => {
//   window.appTable = new ApplicationTableState()
// })


// Initial form data
let formData = {
  firstName: 'Алексей',
  lastName: '',
  middleName: '',
  mobile: '+09 363 398 46',
  email: 'emirhanboruch55@gmail.com',
  region: 'Самарская область',
  city: '',
  companyName: 'Emirhan',
  website: 'emirhanboruch55@gmail.com',
  companyPhone: '+09 363 398 46',
  companyEmail: 'emirhanboruch55@gmail.com'
};
let originalData = { ...formData };
let isEditing = false;

// DOM elements
const editButtonContainer = document.getElementById('editButtonContainer');
const actionButtonsContainer = document.getElementById('actionButtonsContainer');
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');

// Field mappings
const fields = [
  { key: 'firstName', display: 'firstNameDisplay', input: 'firstNameInput' },
  { key: 'lastName', display: 'lastNameDisplay', input: 'lastNameInput' },
  { key: 'middleName', display: 'middleNameDisplay', input: 'middleNameInput' },
  { key: 'mobile', display: 'mobileDisplay', input: 'mobileInput' },
  { key: 'email', display: 'emailDisplay', input: 'emailInput' },
  { key: 'region', display: 'regionDisplay', input: 'regionInput' },
  { key: 'city', display: 'cityDisplay', input: 'cityInput' },
  { key: 'companyName', display: 'companyNameDisplay', input: 'companyNameInput' },
  { key: 'website', display: 'websiteDisplay', input: 'websiteInput' },
  { key: 'companyPhone', display: 'companyPhoneDisplay', input: 'companyPhoneInput' },
  { key: 'companyEmail', display: 'companyEmailDisplay', input: 'companyEmailInput' }
];

// Initialize display
function updateDisplay() {
  fields.forEach(field => {
    const displayEl = document.getElementById(field.display);
    const inputEl = document.getElementById(field.input);
    displayEl.textContent = formData[field.key] || '';
    inputEl.value = formData[field.key] || '';
  });
}

// Toggle edit mode
function toggleEditMode(enable) {
  isEditing = enable;
  editButtonContainer.classList.toggle('hidden', isEditing);
  actionButtonsContainer.classList.toggle('hidden', !isEditing);
  fields.forEach(field => {
    const displayEl = document.getElementById(field.display);
    const inputEl = document.getElementById(field.input);
    displayEl.classList.toggle('hidden', isEditing);
    inputEl.classList.toggle('hidden', !isEditing);
  });
}

// Handle input changes
fields.forEach(field => {
  const inputEl = document.getElementById(field.input);
  inputEl.addEventListener('input', (e) => {
    formData[field.key] = e.target.value;
  });
});

// Event listeners
editButton.addEventListener('click', () => toggleEditMode(true));
saveButton.addEventListener('click', () => {
  originalData = { ...formData };
  toggleEditMode(false);
});
cancelButton.addEventListener('click', () => {
  formData = { ...originalData };
  updateDisplay();
  toggleEditMode(false);
});

// Initial render
updateDisplay();
