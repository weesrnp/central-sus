/**
 * SUS-systems 3.0 — Aplicação Principal (Router & Estado Global).
 * Módulo ES nativo sem ferramentas de build.
 */

import { getCatalog, onNetworkModeChange } from './api.js';
import { closeAllPopovers } from './ui/table.js';
import { showToast } from './ui/toast.js';
import { initCommandPalette } from './ui/command-palette.js';
import { renderFilesView } from './views/files.js';
import { initSigtapView, bindSigtapEvents } from './views/sigtap.js';
import { initRemessaView, loadRemessas } from './views/remessa.js';

const DEFAULT_GROUP = 'SIA';
const DEFAULT_SUB = 'BPA';

const state = {
  catalogAreas: [],
  ufs: [],
  activeUf: 'PR',
  activeWorkspace: 'catalog',
  selectedGroup: DEFAULT_GROUP,
  selectedSub: DEFAULT_SUB
};

/**
 * Anuncia mensagem para tecnologias assistivas via live region.
 * @param {string} msg
 */
export function announce(msg) {
  const el = document.getElementById('liveStatus');
  if (!el) return;
  el.textContent = '';
  requestAnimationFrame(() => {
    el.textContent = msg;
  });
}

/**
 * Ponto de entrada do frontend.
 */
async function initApp() {
  // 1. Carrega o catálogo embutido no HTML ou busca da API
  loadEmbeddedCatalog();

  // 2. Configura ouvintes globais (fechamento de popover, tema, responsividade)
  setupGlobalListeners();

  // 3. Configura a busca global (Ctrl+K)
  initCommandPalette(state.catalogAreas, handleCommandAction);

  // 4. Configura eventos dos workspaces SIGTAP e Remessa
  bindSigtapEvents();
  initRemessaView(false, true);

  // 5. Configura a barra lateral e filtros
  setupSidebar();

  // 6. Lê a rota inicial por hash e renderiza
  handleRoute();
}

/**
 * Lê o JSON do catálogo injetado pelo PageController no HTML.
 */
function loadEmbeddedCatalog() {
  const scriptTag = document.getElementById('initial-catalog');
  if (scriptTag && scriptTag.textContent) {
    try {
      const data = JSON.parse(scriptTag.textContent.trim());
      if (data && Array.isArray(data.areas)) {
        state.catalogAreas = data.areas;
        state.ufs = data.ufs || [];
        return;
      }
    } catch (e) {
      console.warn('Erro ao decodificar catálogo embutido:', e);
    }
  }

  // Fallback caso o script tag não esteja disponível
  getCatalog()
    .then(data => {
      state.catalogAreas = data.areas || [];
      state.ufs = data.ufs || [];
    })
    .catch(err => {
      console.error('Falha ao carregar catálogo da API:', err);
    });
}

/**
 * Trata ações disparadas pela Command Palette (Ctrl+K).
 */
function handleCommandAction(action) {
  if (!action) return;

  if (action.type === 'nav') {
    if (action.special === 'home') {
      switchWorkspace('home');
      updateHash('#/inicio');
      updateSidebarActiveState();
    } else if (action.special === 'sigtap') {
      navigateToSpecial('sigtap');
    } else if (action.special === 'remessa') {
      navigateToSpecial('remessa');
    } else if (action.group && action.sub) {
      navigateToSubgroup(action.group, action.sub);
    }
  } else if (action.type === 'theme') {
    toggleTheme();
  } else if (action.type === 'refresh') {
    refreshActiveView();
  }
}

/**
 * Navegação por Hash Router.
 * Suporta formatos:
 * - #/SIA/BPA ou #SIA/BPA
 * - #/sigtap ou #sigtap
 * - #/remessa ou #remessa
 */
function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (!hash || hash === 'inicio') return { type: 'home' };

  if (hash === 'sigtap' || hash === 'workspace-sigtap') {
    return { type: 'special', special: 'sigtap' };
  }
  if (hash === 'remessa' || hash === 'workspace-remessa') {
    return { type: 'special', special: 'remessa' };
  }

  const parts = hash.split('/');
  if (parts.length >= 2) {
    const rawSub = parts.slice(1).join('/').replace(/\+/g, ' ');
    return {
      type: 'subgroup',
      group: safeDecode(parts[0].replace(/\+/g, ' ')),
      sub: safeDecode(rawSub)
    };
  }

  return null;
}

function safeDecode(value) {
  try { return decodeURIComponent(value); } catch (_) { return value; }
}

function updateHash(targetHash) {
  if (window.location.hash !== targetHash) {
    history.pushState(null, '', targetHash);
  }
}

function handleRoute() {
  const route = parseHash();

  if (route && route.type === 'home') {
    switchWorkspace('home');
  } else if (route && route.type === 'special') {
    switchWorkspace(route.special);
    updateHash(`#/${route.special}`);
  } else if (route && route.type === 'subgroup') {
    switchWorkspace('catalog');
    state.selectedGroup = route.group;
    state.selectedSub = route.sub;
    updateHash(`#/${route.group}/${encodeURIComponent(route.sub)}`);
    renderFilesView(route.group, route.sub, state.activeUf, false, navigateToSpecial);
  } else {
    // Rota padrão: SIA / BPA
    switchWorkspace('catalog');
    state.selectedGroup = DEFAULT_GROUP;
    state.selectedSub = DEFAULT_SUB;
    updateHash(`#/${DEFAULT_GROUP}/${encodeURIComponent(DEFAULT_SUB)}`);
    renderFilesView(DEFAULT_GROUP, DEFAULT_SUB, state.activeUf, false, navigateToSpecial);
  }

  updateSidebarActiveState();
  closeMobileSidebar();
}

/**
 * Alterna a visualização entre os workspaces principais.
 * @param {'catalog'|'sigtap'|'remessa'} wsName
 */
function switchWorkspace(wsName) {
  state.activeWorkspace = wsName;
  document.getElementById('btnForceRefresh').hidden = wsName === 'home';
  closeAllPopovers();

  // Atualiza painéis ativos
  document.querySelectorAll('.ws-panel').forEach(panel => {
    const isActive = panel.id === `ws-${wsName}`;
    panel.classList.toggle('active', isActive);
  });

  // Atualiza abas do topbar
  document.querySelectorAll('.ws-tab').forEach(tab => {
    const isTabActive = tab.dataset.ws === wsName;
    tab.classList.toggle('active', isTabActive);
    if (isTabActive) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  });

  // Inicializa a view do workspace quando selecionado
  if (wsName === 'sigtap') {
    initSigtapView(false);
    announce('SIGTAP Explorer aberto.');
  } else if (wsName === 'remessa') {
    loadRemessas(false);
    announce('Acompanhamento de Remessas SIA aberto.');
  } else if (wsName === 'home') {
    announce('Início do Central SUS.');
  } else {
    announce(`Catálogo aberto: ${state.selectedSub}.`);
  }
}

export function navigateToSubgroup(groupId, subName) {
  state.selectedGroup = groupId;
  state.selectedSub = subName;
  switchWorkspace('catalog');
  updateHash(`#/${groupId}/${encodeURIComponent(subName)}`);
  updateSidebarActiveState();
  closeMobileSidebar();
  renderFilesView(groupId, subName, state.activeUf, false, navigateToSpecial);
}

export function navigateToSpecial(special) {
  switchWorkspace(special);
  updateHash(`#/${special}`);
  updateSidebarActiveState();
  closeMobileSidebar();
}

/**
 * Atualiza o link ativo na árvore da barra lateral.
 */
function updateSidebarActiveState() {
  document.querySelectorAll('.subgroup-link').forEach(link => {
    const isSpecial = link.dataset.navSpecial;
    let isActive = false;

    if (state.activeWorkspace === 'sigtap') {
      isActive = isSpecial === 'sigtap';
    } else if (state.activeWorkspace === 'remessa') {
      isActive = isSpecial === 'remessa';
    } else if (state.activeWorkspace === 'catalog') {
      isActive = link.dataset.navGroup === state.selectedGroup &&
                 link.dataset.navSub === state.selectedSub;
    }

    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

/**
 * Recarrega a tela ativa ignorando o cache do servidor.
 */
function refreshActiveView() {
  if (state.activeWorkspace === 'home') {
    showToast('Escolha um sistema para atualizar seus arquivos.', 'info');
    return;
  }
  const icon = document.getElementById('iconRefresh');
  if (icon && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    icon.style.transform = 'rotate(360deg)';
    icon.style.transition = 'transform 500ms ease';
    setTimeout(() => {
      icon.style.transform = 'none';
      icon.style.transition = 'none';
    }, 550);
  }

  showToast('Atualizando dados do FTP...', 'info');

  if (state.activeWorkspace === 'catalog') {
    renderFilesView(state.selectedGroup, state.selectedSub, state.activeUf, true, navigateToSpecial);
  } else if (state.activeWorkspace === 'sigtap') {
    initSigtapView(true);
  } else if (state.activeWorkspace === 'remessa') {
    loadRemessas(true);
  }
}

/**
 * Configuração de alternância do tema (claro padrão, escuro opcional).
 */
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', next);
  try {
    localStorage.setItem('sus-systems-theme', next);
  } catch (_) {}

  const metaTheme = document.getElementById('metaThemeColor');
  if (metaTheme) {
    metaTheme.setAttribute('content', next === 'dark' ? '#182126' : '#F7F9FA');
  }

  const btn = document.getElementById('btnThemeToggle');
  if (btn) {
    const label = next === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro';
    btn.title = label;
    btn.setAttribute('aria-label', label);
  }

  showToast(`Modo ${next === 'dark' ? 'escuro' : 'claro'} ativado.`, 'info', 1800);
}

function loadSavedTheme() {
  try {
    const saved = localStorage.getItem('sus-systems-theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      const metaTheme = document.getElementById('metaThemeColor');
      if (metaTheme) metaTheme.setAttribute('content', '#182126');
      document.getElementById('btnThemeToggle')?.setAttribute('aria-label', 'Ativar modo claro');
    }
  } catch (_) {}
}

/**
 * Configurações da barra lateral e eventos mobile/desktop.
 */
function setupSidebar() {
  const layout = document.getElementById('appLayout');
  const btnToggleDesktop = document.getElementById('btnToggleSidebarDesktop');
  const btnToggleMobile = document.getElementById('btnToggleSidebarMobile');
  const btnCloseMobile = document.getElementById('btnCloseSidebarMobile');
  const backdrop = document.getElementById('sidebarBackdrop');
  const filterInput = document.getElementById('sidebarFilterInput');
  const mobileQuery = window.matchMedia('(max-width: 768px)');
  const syncSidebar = () => {
    if (mobileQuery.matches) layout.classList.remove('sidebar-collapsed');
    closeMobileSidebar();
  };
  mobileQuery.addEventListener('change', syncSidebar);
  syncSidebar();

  // Alternador Desktop (Recolhível 280px)
  if (btnToggleDesktop && layout) {
    btnToggleDesktop.addEventListener('click', () => {
      layout.classList.toggle('sidebar-collapsed');
      const collapsed = layout.classList.contains('sidebar-collapsed');
      document.getElementById('appSidebar').inert = collapsed;
      btnToggleDesktop.setAttribute('aria-expanded', String(!collapsed));
    });
  }

  // Drawer Mobile
  if (btnToggleMobile && layout) {
    btnToggleMobile.addEventListener('click', () => {
      layout.classList.add('sidebar-mobile-open');
      btnToggleMobile.setAttribute('aria-expanded', 'true');
      document.querySelector('.app-main-wrap').inert = true;
      document.getElementById('appTopbar').inert = true;
      document.getElementById('appSidebar').inert = false;
      document.getElementById('btnCloseSidebarMobile').focus();
    });
  }

  if (btnCloseMobile && layout) {
    btnCloseMobile.addEventListener('click', closeMobileSidebar);
  }

  if (backdrop && layout) {
    backdrop.addEventListener('click', closeMobileSidebar);
  }

  // Filtro de texto na barra lateral
  if (filterInput) {
    filterInput.addEventListener('input', () => {
      const q = filterInput.value.trim().toLowerCase();
      let totalVisible = 0;

      document.querySelectorAll('.macro-area-block').forEach(block => {
        let blockHasMatch = false;
        block.querySelectorAll('.subgroup-link').forEach(link => {
          const searchTxt = link.dataset.navSearch || '';
          const match = !q || searchTxt.includes(q);
          link.closest('li').style.display = match ? '' : 'none';
          if (match) {
            blockHasMatch = true;
            totalVisible++;
          }
        });

        block.style.display = blockHasMatch ? '' : 'none';
      });

      const emptyMsg = document.getElementById('sidebarEmptySearch');
      if (emptyMsg) {
        emptyMsg.hidden = totalVisible > 0;
      }
    });
  }

  // Delegação de cliques nos links da sidebar
  document.querySelectorAll('.subgroup-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const special = link.dataset.navSpecial;
      if (special) {
        navigateToSpecial(special);
      } else {
        const group = link.dataset.navGroup;
        const sub = link.dataset.navSub;
        if (group && sub) {
          navigateToSubgroup(group, sub);
        }
      }
    });
  });
}

function closeMobileSidebar() {
  const layout = document.getElementById('appLayout');
  const btnToggleMobile = document.getElementById('btnToggleSidebarMobile');
  if (layout) {
    const wasOpen = layout.classList.contains('sidebar-mobile-open');
    layout.classList.remove('sidebar-mobile-open');
    document.querySelector('.app-main-wrap').inert = false;
    document.getElementById('appTopbar').inert = false;
    document.getElementById('appSidebar').inert = window.matchMedia('(max-width: 768px)').matches || layout.classList.contains('sidebar-collapsed');
    if (wasOpen) btnToggleMobile?.focus();
  }
  if (btnToggleMobile) {
    btnToggleMobile.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Ouvintes globais e atalhos de teclado.
 */
function setupGlobalListeners() {
  loadSavedTheme();

  // Monitora telemetria do modo de conexão (ponte HTTPS / offline na Vercel)
  const topbarBadge = document.getElementById('topbarModeBadge');
  if (topbarBadge) {
    onNetworkModeChange((mode) => {
      if (mode === 'HTTPS_BRIDGE' || mode === 'HTTPS_STREAM_BRIDGE' || mode === 'HTTPS_MIRROR') {
        topbarBadge.className = 'network-mode-badge badge-bridge';
        topbarBadge.textContent = 'via ponte HTTPS';
        topbarBadge.title = 'Requisições FTP DataSUS operando através da ponte HTTPS';
        topbarBadge.style.display = 'inline-flex';
      } else if (mode === 'OFFLINE') {
        topbarBadge.className = 'network-mode-badge badge-offline';
        topbarBadge.textContent = 'offline — dados em cache';
        topbarBadge.title = 'Sem conexão com o FTP DataSUS; exibindo dados em cache local';
        topbarBadge.style.display = 'inline-flex';
      } else {
        topbarBadge.style.display = 'none';
      }
    });
  }

  // Fecha popovers ao clicar fora
  document.addEventListener('click', () => closeAllPopovers());

  // Fecha popovers com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && document.getElementById('appLayout').classList.contains('sidebar-mobile-open')) {
      const nodes = [...document.getElementById('appSidebar').querySelectorAll('a[href], button, input')].filter(el => el.getClientRects().length);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }
    if (e.key === 'Escape') {
      closeAllPopovers(true);
      closeMobileSidebar();
    }
    // Atalho Ctrl+[ para recolher sidebar no desktop
    if ((e.ctrlKey || e.metaKey) && e.key === '[') {
      e.preventDefault();
      document.getElementById('btnToggleSidebarDesktop')?.click();
    }
  });

  // Fechar popover ao rolar
  window.addEventListener('scroll', (e) => {
    const t = e.target;
    if (t instanceof Element && t.closest('.hist-popover')) return;
    closeAllPopovers();
  }, true);

  // Escuta alteração de rota externa por hash
  window.addEventListener('hashchange', () => {
    handleRoute();
  });

  // Botão Home no Logo
  const homeLogo = document.getElementById('btnHomeLogo');
  if (homeLogo) {
    homeLogo.addEventListener('click', (e) => {
      e.preventDefault();
      switchWorkspace('home');
      updateHash('#/inicio');
      updateSidebarActiveState();
      closeMobileSidebar();
    });
  }

  // Abas de workspace no topo
  document.querySelectorAll('.ws-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const ws = tab.dataset.ws;
      if (ws === 'home') {
        switchWorkspace('home');
        updateHash('#/inicio');
        updateSidebarActiveState();
        closeMobileSidebar();
      } else if (ws === 'sigtap' || ws === 'remessa') {
        navigateToSpecial(ws);
      } else {
        navigateToSubgroup(state.selectedGroup, state.selectedSub);
      }
    });
  });

  document.getElementById('btnHomeSearch')?.addEventListener('click', () => {
    document.getElementById('btnOpenCommandPalette').click();
  });

  // Botões de utilidades no topo
  const btnTheme = document.getElementById('btnThemeToggle');
  if (btnTheme) btnTheme.addEventListener('click', toggleTheme);

  const btnRefresh = document.getElementById('btnForceRefresh');
  if (btnRefresh) btnRefresh.addEventListener('click', refreshActiveView);
}

// Inicializa a aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
