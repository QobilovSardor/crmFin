document.addEventListener('DOMContentLoaded', () => {
  // Data structure for the transaction table (static and editable)
  const statisticsTableData = [
    {
      id: '1',
      transactionId: '15.03.2025',
      date: '5',
      type: '250 шт.',
      quantity: '7 500 ₽',
      isExpandable: true,
    },
    {
      id: '2',
      transactionId: '15.03.2025',
      date: '5',
      type: '250 шт.',
      quantity: '7 500 ₽',
      isExpandable: true,
      isExpanded: true,
      details: [
        { plannerId: 'Самарская область', region: '-', city: '50 шт.', age: '1 500 ₽' },
        { plannerId: 'Самарская область', region: '-', city: '100 шт.', age: '3 000 ₽' },
        { plannerId: 'Самарская область', region: '-', city: '150 шт.', age: '4 500 ₽' },
        { plannerId: 'Самарская область', region: '-', city: '200 шт.', age: '6 000 ₽' },
        { plannerId: 'Самарская область', region: '-', city: '250 шт.', age: '7 500 ₽' },
        { plannerId: 'Самарская область', region: '-', city: '300 шт.', age: '9 000 ₽' },
      ],
    },
    {
      id: '3',
      transactionId: '15.03.2025',
      date: '5',
      type: '250 шт.',
      quantity: '7 500 ₽',
      isExpandable: true,
    },
  ];

  // Column configuration
  const statistics = [
    { key: 'expand', label: '', type: 'expand', width: 'w-[42px] sm:pl-5 sm:pr-3 pr-0' },
    { key: 'transactionId', label: 'Транзакция' },
    { key: 'date', label: 'Дата' },
    { key: 'type', label: 'Тип' },
    { key: 'quantity', label: 'Количество' },
    { key: 'cost', label: 'Стоимость' },
    { key: 'total', label: 'Остаток' },
  ];

  // State management
  let expandedRows = ['2', '5']; // Initially expand rows with id '2' and '5'

  // DOM elements
  const tableBody = document.getElementById('statistics-table-body');

  // Initialize the table
  function initializeTable() {
    renderTable();
    setupEventListeners();
  }

  // Render the table with current data and state
  function renderTable() {
    tableBody.innerHTML = '';

    statisticsTableData.forEach(row => {
      // Create main row
      const tr = document.createElement('tr');
      tr.dataset.id = row.id;
      tr.className = 'border-b border-border-light'; // Add border by default

      // Expand cell
      const expandCell = document.createElement('td');
      expandCell.className = 'px-3 py-2 text-start h-11 w-[54px] sm:pl-5 sm:pr-3 pr-0 pl-6';

      if (row.isExpandable) {
        const expandButton = document.createElement('button');
        expandButton.className = 'flex h-[18px] !w-[18px] sm:h-auto w-auto items-center justify-center';
        expandButton.dataset.id = row.id;

        if (expandedRows.includes(row.id)) {
          expandButton.innerHTML = `
            <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg" class="rotate-180">
              <path d="M1.5 0.75L6 5.25L10.5 0.75" stroke="#407BFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
        } else {
          expandButton.innerHTML = `
            <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 0.75L6 5.25L10.5 0.75" stroke="#707D89" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `;
        }

        expandCell.appendChild(expandButton);
      } else {
        expandCell.innerHTML = '<div class="flex w-[42px] items-center justify-center sm:h-auto h-[18px] pl-5"></div>';
      }

      tr.appendChild(expandCell);

      // Transaction ID cell
      const transactionIdCell = document.createElement('td');
      transactionIdCell.className = 'px-3 py-2 text-start h-11';
      transactionIdCell.innerHTML = `<span class="md:text-sm text-xs text-gray-900">${row.transactionId}</span>`;
      tr.appendChild(transactionIdCell);

      // Date cell
      const dateCell = document.createElement('td');
      dateCell.className = 'px-3 py-2 text-start h-11';
      dateCell.innerHTML = `<span class="md:text-sm text-xs text-gray-900">${row.date}</span>`;
      tr.appendChild(dateCell);

      // Type cell
      const typeCell = document.createElement('td');
      typeCell.className = 'px-3 py-2 text-start h-11';
      typeCell.innerHTML = `<span class="md:text-sm text-xs text-gray-900">${row.type}</span>`;
      tr.appendChild(typeCell);

      // Quantity cell
      const quantityCell = document.createElement('td');
      quantityCell.className = 'px-3 py-2 text-start h-11';
      quantityCell.innerHTML = `<span class="md:text-sm text-xs text-gray-900">${row.quantity}</span>`;
      tr.appendChild(quantityCell);

      // Add the row to the table
      tableBody.appendChild(tr);

      // If row is expanded and has details, add a single expanded details row with all details
      if (expandedRows.includes(row.id) && row.details) {
        const detailsRow = document.createElement('tr');
        const detailsCell = document.createElement('td');
        detailsCell.colSpan = 7; // Span all columns
        detailsCell.className = 'px-3';

        const detailsContent = `
          <div class="rounded-md bg-[#F4F8FF] p-3 mb-3 collapse-child-items -mt-[2px]">
            <div class="grid grid-cols-4">
              <div class="mb-2 text-xs text-[#707D89]">Регион</div>
              <div class="mb-2 text-xs text-[#707D89]">Город</div>
              <div class="mb-2 text-xs text-[#707D89]">Количество</div>
              <div class="mb-2 text-xs text-[#707D89]">Сумма</div>
            </div>
            ${row.details.map(detail => `
              <div class="grid grid-cols-4 text-sm border-b border-border-light mb-2">
                <div class="font-semibold text-black md:text-sm text-xs mb-2">${detail.plannerId}</div>
                <div class="font-semibold text-black md:text-sm text-xs mb-2">${detail.region}</div>
                <div class="font-semibold text-black md:text-sm text-xs mb-2">${detail.city}</div>
                <div class="font-semibold text-black md:text-sm text-xs">${detail.age}</div>
              </div>
            `).join('')}
          </div>
        `;

        detailsCell.innerHTML = detailsContent;
        detailsRow.appendChild(detailsCell);
        tableBody.appendChild(detailsRow);

        // Remove border from the main row when expanded
        tr.classList.remove('border-b', 'border-border-light');
        detailsCell.classList.add('border-b', 'border-border-light');
      } else if (row.isExpandable) {
        tr.classList.add('border-b', 'border-border-light');
      }
    });
  }

  // Set up event listeners
  function setupEventListeners() {
    document.addEventListener('click', function (e) {
      const expandButton = e.target.closest('button');
      if (expandButton && expandButton.dataset.id) {
        const rowId = expandButton.dataset.id;
        toggleExpanded(rowId);
      }
    });
  }

  // Toggle expanded state
  function toggleExpanded(id) {
    if (expandedRows.includes(id)) {
      expandedRows = expandedRows.filter(rowId => rowId !== id);
    } else {
      expandedRows.push(id);
    }
    renderTable();
  }

  // Initialize when the DOM is fully loaded
  initializeTable();

  // Export functionality for potential external use with data modification
  window.transactionTable = {
    getExpandedRows: () => expandedRows,
    setExpandedRows: (rows) => {
      expandedRows = rows;
      renderTable();
    },
    getData: () => statisticsTableData,
    setData: (newData) => {
      statisticsTableData.length = 0; // Clear existing data
      newData.forEach(item => statisticsTableData.push(item));
      renderTable();
    },
    refresh: renderTable
  };

  // Tab switching functionality
  const tabLinks = document.querySelectorAll('.table-tab-wrapper .tab-list');
  const tabContents = document.querySelectorAll('.tab-content-wrapper .tab-content');

  function setDefaultTabState() {
    // Remove hidden attribute from the first tab-content and add it to others
    tabContents.forEach((content, index) => {
      if (index === 0) {
        content.removeAttribute('hidden');
      } else {
        content.setAttribute('hidden', '');
      }
    });

    // Add active class to the first tab-list and remove from others
    tabLinks.forEach((link, index) => {
      if (index === 0) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Remove active class from all tabs
      tabLinks.forEach(l => l.classList.remove('active'));
      // Add active class to the clicked tab
      link.classList.add('active');

      // Determine which tab was clicked
      const tabId = link.querySelector('span').textContent === 'Общая' ? 'tab-general' : 'tab-geo';

      // Hide all tab contents
      tabContents.forEach(content => content.setAttribute('hidden', ''));

      // Show the selected tab content
      const selectedTab = document.getElementById(tabId);
      if (selectedTab) {
        selectedTab.removeAttribute('hidden');
      }
    });
  });

  // Set the default tab state on load
  setDefaultTabState();
});
