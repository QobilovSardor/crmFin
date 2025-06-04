const tableData = [
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
];

const columns = [
  { key: 'id' },
  { key: 'createdAt' },
  { key: 'region' },
  { key: 'city' },
  { key: 'name' },
  { key: 'phone' },
  { key: 'birthDate' },
  { key: 'loanAmount' },
  { key: 'loanType' },
  { key: 'price' }
];

class ApplicationTableState {
  constructor(sidebarState) {
    this.sidebarState = sidebarState || { isExpanded: false, isHovered: false }; // Fallback to default state
    this.selectedRows = [];
    this.sortConfig = { key: "id", direction: "asc" };
    this.initElements();
    this.bindEvents();
    this.renderTable();
  }

  initElements() {
    this.elements = {
      tableBody: document.getElementById("table-body"),
      purchaseTableBody: document.getElementById("purchase-table-body"),
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
    this.elements.selectAll?.addEventListener("change", () => this.handleSelectAll());

    // Clear selection button
    this.elements.clearSelection?.addEventListener("click", () => this.clearSelection());

    // Sortable headers
    this.elements.sortableHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const key = header.dataset.sort;
        this.handleSort(key);
      });
    });

    // Row selection (delegated event)
    if (this.elements.tableBody) {
      this.elements.tableBody.addEventListener("change", (e) => {
        if (e.target.type === "checkbox" && e.target.dataset.rowId) {
          this.handleRowSelection(e.target.dataset.rowId);
        }
      });
    }
    if (this.elements.purchaseTableBody) {
      this.elements.purchaseTableBody.addEventListener("change", (e) => {
        if (e.target.type === "checkbox" && e.target.dataset.rowId) {
          this.handleRowSelection(e.target.dataset.rowId);
        }
      });
    }
  }

  handleSort(key) {
    this.sortConfig = {
      key,
      direction: this.sortConfig.key === key && this.sortConfig.direction === "asc" ? "desc" : "asc",
    };
    this.renderTable();
    this.renderTable2();
  }

  handleSelectAll() {
    if (this.selectedRows.length === tableData.length) {
      this.selectedRows = [];
    } else {
      this.selectedRows = tableData.map((row) => row.id);
    }
    this.renderTable();
    this.renderTable2();
    this.updateFixedBar();
  }

  handleRowSelection(rowId) {
    if (this.selectedRows.includes(rowId)) {
      this.selectedRows = this.selectedRows.filter((id) => id !== rowId);
    } else {
      this.selectedRows.push(rowId);
    }
    this.updateSelectAllCheckbox();
    this.updateFixedBar();
  }

  updateSelectAllCheckbox() {
    if (this.elements.selectAll) {
      this.elements.selectAll.checked = this.selectedRows.length === tableData.length && tableData.length > 0;
    }
  }

  clearSelection() {
    this.selectedRows = [];
    this.renderTable();
    this.renderTable2();
    this.updateFixedBar();
  }

  getSortedData() {
    return [...tableData].sort((a, b) => {
      const aValue = a[this.sortConfig.key];
      const bValue = b[this.sortConfig.key];
      if (aValue < bValue) return this.sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return this.sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  renderTable() {
    const sortedData = this.getSortedData();
    const tableBody = this.elements.tableBody;
    if (!tableBody) return;

    tableBody.innerHTML = "";
    sortedData.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="pl-6 w-14">
          <input
            type="checkbox"
            class="checkbox checkbox-input"
            data-row-id="${row.id}"
            ${this.selectedRows.includes(row.id) ? 'checked' : ''}
          />
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <div class="flex items-center gap-2">
            <span class="md:text-sm text-xs">${row.id}</span>
            <div class="w-[6px] h-[6px] rounded-full bg-[#039855] opacity-20"></div>
          </div>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.createdAt}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.region}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.city}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.name}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.phone}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.birthDate}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.loanAmount}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.loanType}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start w-[88px]">
          <span class="md:text-sm text-xs">${row.price}</span>
        </td>
      `;
      tableBody.appendChild(tr);
    });
    this.updateSortIndicators();
    this.updateSelectAllCheckbox();
  }

  renderTable2() {
    const sortedData = this.getSortedData();
    const tableBody = this.elements.purchaseTableBody;
    if (!tableBody) return;

    tableBody.innerHTML = "";
    sortedData.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="pl-6 w-14">
          <input
            type="checkbox"
            class="checkbox checkbox-input"
            data-row-id="${row.id}"
            ${this.selectedRows.includes(row.id) ? 'checked' : ''}
          />
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <div class="flex items-center gap-2">
            <span class="md:text-sm text-xs">${row.id}</span>
            <div class="w-[6px] h-[6px] rounded-full bg-[#039855] opacity-20"></div>
          </div>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.createdAt}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.region}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.city}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.name}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.phone}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.birthDate}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.loanAmount}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start">
          <span class="md:text-sm text-xs">${row.loanType}</span>
        </td>
        <td class="px-3 h-11 py-2 text-start w-[88px]">
          <span class="md:text-sm text-xs">${row.price}</span>
        </td>
      `;
      tableBody.appendChild(tr);
    });
    this.updateSortIndicators();
    this.updateSelectAllCheckbox();
  }

  updateSortIndicators() {
    this.elements.sortableHeaders.forEach((header) => {
      const key = header.dataset.sort;
      const arrow = header.querySelector("svg");
      if (arrow) {
        if (this.sortConfig.key === key) {
          arrow.classList.toggle("rotate-180", this.sortConfig.direction === "asc");
        } else {
          arrow.classList.remove("rotate-180");
        }
      }
    });
  }

  updateFixedBar() {
    const { fixedBar, selectedCount, totalPrice } = this.elements;
    if (this.selectedRows.length > 0 && fixedBar && selectedCount && totalPrice) {
      const total = this.selectedRows.reduce((sum, rowId) => {
        const row = tableData.find((r) => r.id === rowId);
        return row ? sum + Number.parseFloat(row.price) : sum;
      }, 0);
      selectedCount.textContent = this.selectedRows.length.toString();
      totalPrice.textContent = `${total.toFixed(2)} ₽`;
      fixedBar.classList.remove("hidden");
    } else {
      fixedBar?.classList.add("hidden");
    }
  }
}
