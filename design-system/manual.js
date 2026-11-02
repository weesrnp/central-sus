/* Demonstração local, apenas com dados sintéticos. */
(() => {
  const root = document.documentElement;
  const product = document.getElementById('product');
  const theme = document.getElementById('theme');
  const density = document.getElementById('density');
  const names = {base:'TI Saúde · Exemplo de produto', 'hs-aps':'HS-APS', imuniza:'Imuniza HS', acompanha:'Acompanha HS'};
  const typeNames = {imuniza:'Outfit em títulos · Inter no corpo'};
  function update() {
    root.dataset.hsProduct = product.value;
    root.dataset.hsTheme = theme.value;
    root.dataset.hsDensity = density.value;
    document.getElementById('demo-product-name').textContent = names[product.value];
    const logo = document.getElementById('demo-product-logo');
    logo.hidden = product.value === 'base';
    if (!logo.hidden) logo.src = 'assets/marcas/' + product.value + '.svg';
    document.getElementById('type-profile').textContent = typeNames[product.value] || 'Plus Jakarta Sans em títulos e corpo';
    const computed = getComputedStyle(root);
    document.querySelectorAll('[data-token-color]').forEach(el => {
      const value = computed.getPropertyValue('--hs-' + el.dataset.tokenColor).trim();
      el.querySelector('.swatch-color').style.background = value;
      el.querySelector('code').textContent = value.toUpperCase();
    });
  }
  [product, theme, density].forEach(el => el.addEventListener('change', update));
  update();

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function activate(tab, focus = false) {
    for (const item of tabs) {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    }
    if (focus) tab.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
    });
  });
  document.getElementById('filters').addEventListener('submit', event => {
    event.preventDefault();
    const state = document.getElementById('state-filter').value;
    let count = 0;
    document.querySelectorAll('#demo-rows tr').forEach(row => {
      row.hidden = state !== 'all' && row.dataset.state !== state;
      if (!row.hidden) count++;
    });
    document.getElementById('filter-result').textContent = `${count} equipes de demonstração exibidas. Filtro aplicado neste exemplo local.`;
  });
  document.getElementById('clear-filters').addEventListener('click', () => {
    document.getElementById('state-filter').value = 'all';
    document.getElementById('filters').requestSubmit();
  });
  const press = document.getElementById('sample-pill');
  press.addEventListener('click', () => {
    const active = press.getAttribute('aria-pressed') !== 'true';
    press.setAttribute('aria-pressed', String(active));
    document.getElementById('pill-result').textContent = active ? 'Filtro de exemplo selecionado.' : 'Filtro de exemplo removido.';
  });
})();
