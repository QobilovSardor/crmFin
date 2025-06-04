// Data structure for the table
const filterTableData = [
  {
    id: '1',
    name: 'Все',
    filterId: '2224',
    badge: { color: 'success badge-light', children: 'Работает' },
    remaining: 0,
    perDay: 2,
    dayOfWeek: 'Каждый день',
    isExpandable: true,
  },
  {
    id: '2',
    name: 'Татарстан',
    filterId: '2224',
    badge: { color: 'success badge-light', children: 'Работает' },
    remaining: 0,
    perDay: 1,
    dayOfWeek: 'Пн, Вт, Ср, Пт',
    isExpandable: true,
    isExpanded: true,
    details: {
      region: 'Самарская область',
      city: '-',
      age: '20 — 50',
      amount: '10 000 — 3 000 000',
      orderPrice: '10 000 — 3 000 000',
      totalOrders: '10 000',
      maxPerDay: '10 000',
    },
  },
  {
    id: '3',
    name: 'Калининградская область',
    filterId: '2224',
    badge: { color: 'light', children: 'Не работает' },
    remaining: 0,
    perDay: 0,
    dayOfWeek: 'Сб, Вс',
    isExpandable: true,
  },
];

// State management
let selectedRows = [];
let expandedRows = ['2']; // Initially expand row with id '2'

// DOM elements
const tableBody = document.getElementById('filter-table-body');
const selectAllCheckbox = document.getElementById('selectAll');
const fixedBar = document.getElementById('fixed-bar');
const selectedCountElement = document.getElementById('selectedCount');
const clearSelectionButton = document.getElementById('clearSelection');

// Initialize the table
function initializeTable() {
  renderTable();
  setupEventListeners();
}

// Render the table with current data and state
function renderTable() {
  tableBody.innerHTML = '';

  filterTableData.forEach(row => {
    // Create main row
    const tr = document.createElement('tr');
    tr.dataset.id = row.id;

    // Checkbox cell
    const checkboxCell = document.createElement('td');
    checkboxCell.className = 'px-3 py-2 text-start sm:h-11 h-[42px] pl-6';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox-input row-checkbox';
    checkbox.checked = selectedRows.includes(row.id);
    checkbox.dataset.id = row.id;
    checkboxCell.appendChild(checkbox);
    tr.appendChild(checkboxCell);

    // Expand cell
    const expandCell = document.createElement('td');
    expandCell.className = 'px-3 py-2 text-start sm:h-11 h-[42px]';
    if (row.isExpandable) {
      const expandButton = document.createElement('button');
      expandButton.className = `flex h-full w-full items-center justify-center overflow-visible ${expandedRows.includes(row.id) ? 'rotate-180' : ''
        }`;
      expandButton.dataset.id = row.id;
      expandButton.innerHTML = `
        <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-[10px]">
          <path d="M1.5 0.75L6 5.25L10.5 0.75" stroke="${expandedRows.includes(row.id) ? '#407BFF' : '#707D89'
        }" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      expandCell.appendChild(expandButton);
    }
    tr.appendChild(expandCell);

    // Name cell
    const nameCell = document.createElement('td');
    nameCell.className = 'px-3 py-2 text-start sm:h-11 h-[42px]';
    nameCell.innerHTML = `<span class="md:text-sm text-xs text-gray-900">${row.name}</span>`;
    tr.appendChild(nameCell);

    // Filter ID cell
    const filterIdCell = document.createElement('td');
    filterIdCell.className = 'px-3 py-2 text-start sm:h-11 h-[42px]';
    filterIdCell.innerHTML = `<span class="md:text-sm text-xs text-gray-900">${row.filterId}</span>`;
    tr.appendChild(filterIdCell);

    // Badge cell
    const badgeCell = document.createElement('td');
    badgeCell.className = 'px-3 py-2 text-start sm:h-11 h-[42px]';
    badgeCell.innerHTML = `<span class="badge badge-${row.badge.color}">${row.badge.children}</span>`;
    tr.appendChild(badgeCell);

    // Remaining cell
    const remainingCell = document.createElement('td');
    remainingCell.className = 'px-3 py-2 text-start sm:h-11 h-[42px]';
    remainingCell.innerHTML = `<span class="md:text-sm text-xs text-gray-900">${row.remaining}</span>`;
    tr.appendChild(remainingCell);

    // Per day cell
    const perDayCell = document.createElement('td');
    perDayCell.className = 'px-3 py-2 text-start sm:h-11 h-[42px]';
    perDayCell.innerHTML = `<span class="md:text-sm text-xs text-gray-900">${row.perDay}</span>`;
    tr.appendChild(perDayCell);

    // Day of week cell
    const dayOfWeekCell = document.createElement('td');
    dayOfWeekCell.className = 'px-3 py-2 text-start sm:h-11 h-[42px]';
    dayOfWeekCell.innerHTML = `<span class="md:text-sm text-xs text-gray-900">${row.dayOfWeek}</span>`;
    tr.appendChild(dayOfWeekCell);

    // Actions cell
    const actionsCell = document.createElement('td');
    actionsCell.className = 'px-3 py-2 text-start sm:h-11 h-[42px]';

    const isWorking = row.badge.children === 'Работает';
    actionsCell.innerHTML = `
      <div class="flex items-center gap-2 h-[18px]">
        <button class="flex h-fit w-[42px] items-center justify-center text-[#707D89] hover:text-blue-600 action-toggle">
          ${isWorking ? '<img src="src/images/icons/pause.svg" />' : '<img src="src/images/icons/play.svg" />'}
        </button >
        <button class="flex h-[42px] w-[42px] items-center justify-center text-[#707D89] hover:text-gray-600 action-edit">
          <img src="src/images/icons/pen.svg" />
        </button>
        <button class="flex h-[42px] items-center justify-center pr-6 pl-[14px] text-[#707D89] hover:text-red-600 action-delete" data-id="${row.id}">
            <img src="src/images/icons/trash.svg" />
        </button>
      </div >
    `;
    tr.appendChild(actionsCell);

    // Add the row to the table
    tableBody.appendChild(tr);

    // If row is expanded and has details, add the expanded details row
    if (expandedRows.includes(row.id) && row.details) {
      const detailsRow = document.createElement('tr');
      const detailsCell = document.createElement('td');
      detailsCell.colSpan = 9;
      detailsCell.className = 'p-3';

      const detailsContent = `
        <div class="rounded-md bg-[#F4F8FF] p-3">
          <div class="grid grid-cols-7 gap-4 text-sm">
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
            <div>
              <div class="mb-2 text-xs text-[#707D89]">Цена заявок</div>
              <div class="font-semibold text-black md:text-sm text-xs">${row.details.orderPrice}</div>
            </div>
            <div>
              <div class="mb-2 text-xs text-[#707D89]">Всего заявок</div>
              <div class="font-semibold text-black md:text-sm text-xs">${row.details.totalOrders}</div>
            </div>
            <div>
              <div class="mb-2 text-xs text-[#707D89]">Максимум в день</div>
              <div class="font-semibold text-black md:text-sm text-xs">${row.details.maxPerDay}</div>
            </div>
          </div>
        </div>
      `;

      detailsCell.innerHTML = detailsContent;
      detailsRow.appendChild(detailsCell);
      tableBody.appendChild(detailsRow);
    }
  });

  // Update the fixed bar visibility
  updateFixedBar();
}

// Set up event listeners
function setupEventListeners() {
  // Select all checkbox
  selectAllCheckbox.addEventListener('change', handleSelectAll);

  // Row checkboxes
  document.addEventListener('change', function (e) {
    if (e.target.classList.contains('row-checkbox')) {
      handleCheckboxChange(e.target.dataset.id);
    }
  });

  // Expand/collapse buttons
  document.addEventListener('click', function (e) {
    const expandButton = e.target.closest('button');
    if (expandButton && expandButton.parentElement.previousElementSibling &&
      expandButton.parentElement.previousElementSibling.querySelector('.row-checkbox')) {
      const rowId = expandButton.dataset.id;
      if (rowId) {
        toggleExpanded(rowId);
      }
    }
  });

  // Delete selected button

  // Clear selection button
  clearSelectionButton.addEventListener('click', handleClearSelection);

  // Individual delete buttons
  document.addEventListener('click', function (e) {
    if (e.target.closest('.action-delete')) {
      const rowId = e.target.closest('.action-delete').dataset.id;
      if (rowId) {
        handleDeleteRow(rowId);
      }
    }
  });

  // Toggle status buttons
  document.addEventListener('click', function (e) {
    if (e.target.closest('.action-toggle')) {
      const row = e.target.closest('tr');
      if (row) {
        const rowId = row.dataset.id;
        handleToggleStatus(rowId);
      }
    }
  });

  // Edit buttons
  document.addEventListener('click', function (e) {
    if (e.target.closest('.action-edit')) {
      const row = e.target.closest('tr');
      if (row) {
        const rowId = row.dataset.id;
        handleEditRow(rowId);
      }
    }
  });
}

// Handle select all checkbox
function handleSelectAll() {
  if (selectAllCheckbox.checked) {
    selectedRows = filterTableData.map(row => row.id);
  } else {
    selectedRows = [];
  }
  renderTable();
}

// Handle individual checkbox change
function handleCheckboxChange(id) {
  if (selectedRows.includes(id)) {
    selectedRows = selectedRows.filter(rowId => rowId !== id);
  } else {
    selectedRows.push(id);
  }
  renderTable();
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

// Handle clear selection
function handleClearSelection() {
  selectedRows = [];
  renderTable();
}

// Handle delete single row
function handleDeleteRow(id) {
  if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
    filterTableData = filterTableData.filter(row => row.id !== id);
    selectedRows = selectedRows.filter(rowId => rowId !== id);
    renderTable();
  }
}

// Handle toggle status
function handleToggleStatus(id) {
  const rowIndex = filterTableData.findIndex(row => row.id === id);
  if (rowIndex !== -1) {
    const isWorking = filterTableData[rowIndex].badge.children === 'Работает';
    filterTableData[rowIndex].badge = {
      color: isWorking ? 'light' : 'success',
      children: isWorking ? 'Не работает' : 'Работает'
    };
    renderTable();
  }
}

// Update fixed bar visibility and content
function updateFixedBar() {
  if (selectedRows.length > 0) {
    fixedBar.classList.remove('hidden');
    selectedCountElement.textContent = selectedRows.length;
  } else {
    fixedBar.classList.add('hidden');
  }

  // Update select all checkbox state
  selectAllCheckbox.checked = selectedRows.length === filterTableData.length && filterTableData.length > 0;
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeTable);
