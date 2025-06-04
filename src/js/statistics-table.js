// Data structure for the transaction table
const statisticsTableData = [
  {
    id: '1',
    transactionId: '1199975',
    date: '15.03.2025 13:05:09',
    type: 'Покупка',
    quantity: '1 шт.',
    cost: '30 ₽',
    total: '210 ₽',
    isExpandable: true,
  },
  {
    id: '2',
    transactionId: '1199975',
    date: '15.03.2025 13:05:09',
    type: 'Автопокупка',
    quantity: '1 шт.',
    cost: '30 ₽',
    total: '240 ₽',
    isExpandable: true,
    isExpanded: true,
    details: {
      plannerId: '2224',
      region: 'Самарская область',
      city: '-',
      age: '20 — 50',
      amount: '10 000 — 3 000 000',
    },
  },
  {
    id: '3',
    transactionId: '1199975',
    date: '15.03.2025 13:05:09',
    type: 'Автопокупка',
    quantity: '2 шт.',
    cost: '60 ₽',
    total: '270 ₽',
    isExpandable: false,
  },
  {
    id: '4',
    transactionId: '1199975',
    date: '15.03.2025 13:05:09',
    type: 'Покупка',
    quantity: '1 шт.',
    cost: '30 ₽',
    total: '300 ₽',
    isExpandable: false,
  },
  {
    id: '5',
    transactionId: '1199975',
    date: '15.03.2025 13:05:09',
    type: 'Автопокупка',
    quantity: '3 шт.',
    cost: '90 ₽',
    total: '390 ₽',
    isExpandable: true,
    isExpanded: true,
    details: {
      plannerId: '2224',
      region: 'Самарская область',
      city: '-',
      age: '20 — 50',
      amount: '10 000 — 3 000 000',
    },
  },
  {
    id: '6',
    transactionId: '1199975',
    date: '15.03.2025 13:05:09',
    type: 'Автопокупка',
    quantity: '8 шт.',
    cost: '240 ₽',
    total: '630 ₽',
    isExpandable: false,
  },
  {
    id: '7',
    transactionId: '1199975',
    date: '15.03.2025 13:05:09',
    type: 'Автопокупка',
    quantity: '8 шт.',
    cost: '240 ₽',
    total: '870 ₽',
    isExpandable: false,
  },
];

// Column configuration
const statistics = [
  {
    key: 'expand',
    label: '',
    type: 'expand',
    width: 'w-[42px] sm:pl-5 sm:pr-3 pr-0',
  },
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

    // Expand cell
    const expandCell = document.createElement('td');
    expandCell.className = 'px-3 py-2 text-start h-11 w-[42px] sm:pl-5 sm:pr-3 pr-0';

    if (row.isExpandable) {
      const expandButton = document.createElement('button');
      expandButton.className = 'flex h-[18px] sm:h-auto w-[42px] items-center justify-center';
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

    // Cost cell
    const costCell = document.createElement('td');
    costCell.className = 'px-3 py-2 text-start h-11';
    costCell.innerHTML = `<span class="md:text-sm text-xs text-gray-900">${row.cost}</span>`;
    tr.appendChild(costCell);

    // Total cell
    const totalCell = document.createElement('td');
    totalCell.className = 'px-3 py-2 text-start h-11';
    totalCell.innerHTML = `<span class="md:text-sm text-xs text-gray-900">${row.total}</span>`;
    tr.appendChild(totalCell);

    // Add the row to the table
    tableBody.appendChild(tr);

    // If row is expanded and has details, add the expanded details row
    if (expandedRows.includes(row.id) && row.details) {
      const detailsRow = document.createElement('tr');
      const detailsCell = document.createElement('td');
      detailsCell.colSpan = 7;
      detailsCell.className = 'p-3';

      const detailsContent = `
        <div class="rounded-md bg-[#F4F8FF] p-3 h-[70px]">
          <div class="grid grid-cols-5 gap-4 text-sm">
            <div>
              <div class="mb-2 text-xs text-[#707D89]">Планировщик ID</div>
              <div class="font-semibold text-black md:text-sm text-xs">${row.details.plannerId}</div>
            </div>
            <div>
              <div class="mb-2 text-xs text-[#707D89]">Регион</div>
              <div class="font-semibold text-black md:text-sm text-xs">${row.details.region}</div>
            </div>
            <div>
              <div class="mb-2 text-xs text-[#707D89]">Город</div>
              <div class="font-semibold text-black md:text-sm text-xs">${row.details.city}</div>
            </div>
            <div>
              <div class="mb-2 text-xs text-[#707D89]">Возраст</div>
              <div class="font-semibold text-black md:text-sm text-xs">${row.details.age}</div>
            </div>
            <div>
              <div class="mb-2 text-xs text-[#707D89]">Сумма</div>
              <div class="font-semibold text-black md:text-sm text-xs">${row.details.amount}</div>
            </div>
          </div>
        </div>
      `;

      detailsCell.innerHTML = detailsContent;
      detailsRow.appendChild(detailsCell);
      tableBody.appendChild(detailsRow);
    }
  });
}

// Set up event listeners
function setupEventListeners() {
  // Expand/collapse buttons
  document.addEventListener('click', function(e) {
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
document.addEventListener('DOMContentLoaded', initializeTable);

// Export functionality for potential external use
window.transactionTable = {
  getExpandedRows: () => expandedRows,
  setExpandedRows: (rows) => {
    expandedRows = rows;
    renderTable();
  },
  getData: () => statisticsTableData,
  refresh: renderTable
};
