class SimpleRangeSlider {
  constructor(container) {
    this.container = container;
    this.sliderElement = container.querySelector('.range-slider');
    this.inputElement = container.querySelector('.form-control');

    if (!this.sliderElement || !this.inputElement) return;

    this.isDragging = false;
    this.activeHandle = null;

    this.parseInitialValues();
    this.createSliderHTML();
    this.cacheElements();
    this.updateSlider();
    this.bindEvents();
  }

  parseInitialValues() {
    const inputValue = this.inputElement.value || this.inputElement.placeholder;

    const cleanValue = inputValue.replace(/[^\d\-—]/g, '');
    const parts = cleanValue.split(/[-—]/).map(v => parseInt(v.trim())).filter(Boolean);

    if (parts.length >= 2) {
      this.min = Math.min(parts[0], parts[1]);
      this.max = Math.max(parts[0], parts[1]);
    } else {
      this.min = 0;
      this.max = 100;
    }

    this.currentMin = this.min;
    this.currentMax = this.max;
    this.minGap = Math.max(1, Math.round((this.max - this.min) * 0.01));
  }

  createSliderHTML() {
    this.sliderElement.innerHTML = `
      <div class="range-slider__track"></div>
      <div class="range-slider__range"></div>
      <div class="range-slider__handle range-slider__handle--min"></div>
      <div class="range-slider__handle range-slider__handle--max"></div>
    `;
  }

  cacheElements() {
    this.track = this.sliderElement.querySelector('.range-slider__track');
    this.range = this.sliderElement.querySelector('.range-slider__range');
    this.minHandle = this.sliderElement.querySelector('.range-slider__handle--min');
    this.maxHandle = this.sliderElement.querySelector('.range-slider__handle--max');
  }

  bindEvents() {
    this.minHandle.addEventListener('mousedown', (e) => this.startDrag(e, 'min'));
    this.maxHandle.addEventListener('mousedown', (e) => this.startDrag(e, 'max'));
    document.addEventListener('mousemove', (e) => this.drag(e));
    document.addEventListener('mouseup', () => this.stopDrag());

    this.minHandle.addEventListener('touchstart', (e) => this.startDrag(e, 'min'), { passive: false });
    this.maxHandle.addEventListener('touchstart', (e) => this.startDrag(e, 'max'), { passive: false });
    document.addEventListener('touchmove', (e) => this.drag(e), { passive: false });
    document.addEventListener('touchend', () => this.stopDrag());

    this.inputElement.addEventListener('change', () => this.handleInputChange());
    this.inputElement.addEventListener('blur', () => this.handleInputChange());

    document.addEventListener('selectstart', (e) => {
      if (this.isDragging) e.preventDefault();
    });
  }

  handleInputChange() {
    const oldMin = this.currentMin;
    const oldMax = this.currentMax;

    this.parseInitialValues();

    if (oldMin !== this.currentMin || oldMax !== this.currentMax) {
      this.updateSlider();
    }
  }

  startDrag(e, handleType) {
    e.preventDefault();
    this.isDragging = true;
    this.activeHandle = handleType;
    const handle = handleType === 'min' ? this.minHandle : this.maxHandle;
    handle.classList.add('dragging');
    document.body.style.userSelect = 'none';
  }

  drag(e) {
    if (!this.isDragging || !this.activeHandle) return;

    e.preventDefault();
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const rect = this.sliderElement.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    let value = Math.round(this.min + percent * (this.max - this.min));

    if (this.activeHandle === 'min') {
      value = Math.min(value, this.currentMax - this.minGap);
      this.currentMin = Math.max(this.min, value);
    } else {
      value = Math.max(value, this.currentMin + this.minGap);
      this.currentMax = Math.min(this.max, value);
    }

    this.updateSlider();
    this.updateInput();
  }

  stopDrag() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.minHandle.classList.remove('dragging');
    this.maxHandle.classList.remove('dragging');
    this.activeHandle = null;
    document.body.style.userSelect = '';
  }

  updateSlider() {
    const range = this.max - this.min;
    const minPercent = ((this.currentMin - this.min) / range) * 100;
    const maxPercent = ((this.currentMax - this.min) / range) * 100;

    this.minHandle.style.left = `${minPercent}%`;
    this.maxHandle.style.left = `${maxPercent}%`;
    this.range.style.left = `${minPercent}%`;
    this.range.style.width = `${maxPercent - minPercent}%`;
  }

  updateInput() {
    const formattedMin = this.formatValue(this.currentMin);
    const formattedMax = this.formatValue(this.currentMax);

    const placeholder = this.inputElement.placeholder;
    const separator = placeholder.includes(' — ') ? ' — ' : '-';
    this.inputElement.value = `${formattedMin}${separator}${formattedMax}`;
  }

  formatValue(value) {
    if (value >= 1000) {
      return value.toLocaleString('ru-RU');
    }
    return value.toString();
  }

  getValues() {
    return { min: this.currentMin, max: this.currentMax };
  }

  setValues(min, max) {
    this.currentMin = Math.max(this.min, Math.min(min, this.max));
    this.currentMax = Math.max(this.min, Math.min(max, this.max));

    if (this.currentMax - this.currentMin < this.minGap) {
      this.currentMax = this.currentMin + this.minGap;
    }

    this.updateSlider();
    this.updateInput();
  }
}

class RangeSliderManager {
  constructor() {
    this.sliders = [];
    this.init();
  }

  init() {
    const containers = document.querySelectorAll('.range-slider-container');
    containers.forEach(container => {
      const slider = new SimpleRangeSlider(container);
      if (slider.sliderElement) {
        this.sliders.push(slider);
      }
    });
    this.observeNewSliders();
  }

  observeNewSliders() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.classList.contains('range-slider-container')) {
              const slider = new SimpleRangeSlider(node);
              if (slider.sliderElement) this.sliders.push(slider);
            }
            const nested = node.querySelectorAll?.('.range-slider-container');
            nested?.forEach(container => {
              const slider = new SimpleRangeSlider(container);
              if (slider.sliderElement) this.sliders.push(slider);
            });
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  getAllValues() {
    return this.sliders.map((slider, i) => ({
      index: i,
      values: slider.getValues()
    }));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.rangeSliderManager = new RangeSliderManager();
});
