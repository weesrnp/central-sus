<?php declare(strict_types=1); ?>
<header class="app-topbar" id="appTopbar">
  <div class="topbar-left">
    <button type="button" class="icon-btn mobile-menu-btn" id="btnToggleSidebarMobile" aria-label="Abrir menu de sistemas" aria-controls="appSidebar" aria-expanded="false"><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
    <a href="#/inicio" class="brand-link" id="btnHomeLogo" aria-label="Central SUS — início">
      <img class="brand-symbol" src="<?= asset('img/central-sus-symbol.svg') ?>" width="42" height="42" alt="">
      <span class="brand-wordmark">Central <strong>SUS</strong><small>Por Wees Dev</small></span>
    </a>
    <span class="network-mode-badge" id="topbarModeBadge" style="display:none" aria-live="polite"></span>
  </div>
  <nav class="topbar-center workspace-nav" id="topWorkspaceNav" aria-label="Navegação principal">
    <div class="workspace-tabs-group">
      <button type="button" class="ws-tab active" id="tabHome" data-ws="home" aria-current="page" aria-controls="ws-home">Início</button>
      <button type="button" class="ws-tab" id="tabCatalog" data-ws="catalog" aria-controls="ws-catalog">Arquivos</button>
      <button type="button" class="ws-tab" id="tabSigtap" data-ws="sigtap" aria-controls="ws-sigtap">SIGTAP</button>
      <button type="button" class="ws-tab" id="tabRemessa" data-ws="remessa" aria-controls="ws-remessa">Remessas</button>
    </div>
  </nav>
  <div class="topbar-right">
    <button type="button" class="icon-btn desktop-collapse-btn" id="btnToggleSidebarDesktop" aria-label="Recolher ou expandir menu lateral" aria-controls="appSidebar" aria-expanded="true" title="Recolher menu (Ctrl+[)"><svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18"/></svg></button>
    <button type="button" class="command-search-btn" id="btnOpenCommandPalette" aria-label="Buscar sistemas (Ctrl+K)"><svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg><span class="search-label">Buscar</span><kbd class="kbd-shortcut">Ctrl K</kbd></button>
    <button type="button" class="icon-btn" id="btnForceRefresh" title="Atualizar dados desta consulta" aria-label="Atualizar dados desta consulta"><svg id="iconRefresh" class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5M5 8a8 8 0 0 1 14-2l1 2M4 16l1 2a8 8 0 0 0 14-2"/></svg></button>
    <button type="button" class="icon-btn" id="btnThemeToggle" title="Alternar tema" aria-label="Ativar modo escuro"><svg class="ui-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/></svg><svg class="ui-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></svg></button>
  </div>
</header>
