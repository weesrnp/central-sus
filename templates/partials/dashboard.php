<?php
declare(strict_types=1);
$descriptions = [
 'SIA' => ['Faturamento ambulatorial', 'BPA, SIA, FPO e RAAS. Instaladores, bases mensais e acompanhamento da produção.'],
 'SIGTAP' => ['Tabela de procedimentos', 'Competências, aplicativo, notas técnicas e consulta de procedimentos.'],
 'CNES' => ['Cadastros de saúde', 'SCNES, arquivos nacionais e estaduais, bases e materiais de apoio.'],
 'ESUS_APS' => ['Atenção primária', 'Equipes e profissionais para importação. Acesso aos portais e-SUS APS e SISAB.'],
 'VIG_IMUNIZACAO_AMBIENTAL' => ['PNI e SISVAN', 'Materiais históricos de imunização e referências para vigilância nutricional.'],
 'TABWIN_DISSEMIN' => ['TabWin e microdados', 'Tabulador, manual, utilitários e acesso aos arquivos de disseminação.'],
];
$arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
?>
<section class="ws-panel active" id="ws-home" aria-labelledby="homeTitle">
  <div class="home-intro">
    <div class="home-intro-copy">
      <h1 id="homeTitle">O essencial do SUS,<br><span>em um só lugar.</span></h1>
      <p>Arquivos, tabelas e consultas para simplificar<br class="desktop-break"> sua rotina na saúde pública.</p>
      <button type="button" class="home-search" id="btnHomeSearch"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg><span>Qual sistema você procura?</span><kbd>Ctrl K</kbd></button>
    </div>
    <div class="home-art" aria-hidden="true">
      <svg viewBox="0 0 390 240" fill="none">
        <path d="M35 120H355M195 22V218" stroke="var(--art-line)" stroke-dasharray="3 7"/>
        <circle cx="195" cy="120" r="91" stroke="var(--art-line)"/>
        <g class="art-sheet art-sheet-back"><rect x="234" y="45" width="102" height="128" rx="14" fill="var(--art-mint)" stroke="var(--art-line)"/><path d="M254 76h44m-44 13h61m-61 13h34" stroke="var(--art-ink)" stroke-width="3" stroke-linecap="round"/><path d="m261 137 9 9 18-20" stroke="var(--art-ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>
        <g class="art-sheet art-sheet-front"><rect x="72" y="64" width="110" height="138" rx="14" fill="var(--bg-surface)" stroke="var(--art-line)"/><path d="M94 92h37m-37 14h64m-64 14h47" stroke="var(--art-line)" stroke-width="4" stroke-linecap="round"/><rect x="94" y="143" width="66" height="36" rx="9" fill="var(--accent-tint)"/><path d="M127 150v19m-6-6 6 6 6-6" stroke="var(--accent-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g>
        <g class="art-hub"><rect x="154" y="74" width="82" height="82" rx="25" fill="var(--bg-surface)" stroke="var(--art-line)"/><g transform="translate(163 83)"><path d="M44 17a20 20 0 1 0 0 30" stroke="var(--accent-primary)" stroke-width="7" stroke-linecap="round"/><rect x="29" y="26" width="12" height="12" rx="4" fill="var(--brand-mint)"/></g></g>
        <circle class="art-point" cx="195" cy="29" r="5" fill="var(--brand-mint)"/><circle cx="286" cy="120" r="4" fill="var(--accent-primary)"/>
      </svg>
    </div>
  </div>
  <div class="quick-tools" aria-label="Consultas rápidas">
    <a class="tool-link tool-sigtap" href="#/sigtap"><span class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18M9 10v10m6-10v10"/></svg></span><span><strong>Consultar SIGTAP</strong><small>Procedimentos, valores e competências</small></span><?= $arrow ?></a>
    <a class="tool-link tool-remessa" href="#/remessa"><span class="tool-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3"/><rect x="8" y="2" width="8" height="6" rx="2"/><path d="m8 14 3 3 5-6"/></svg></span><span><strong>Acompanhar remessas</strong><small>Consulte o processamento no SIA</small></span><?= $arrow ?></a>
  </div>
  <section class="systems-directory" aria-labelledby="systemsTitle">
    <div class="directory-heading"><div><h2 id="systemsTitle">Sistemas e materiais</h2><p>Escolha uma área para encontrar o que precisa.</p></div><span class="directory-caption">Fontes DATASUS</span></div>
    <div class="systems-grid">
    <?php foreach (($catalog['areas'] ?? []) as $area): ?>
      <?php foreach (($area['groups'] ?? []) as $group):
        $id = (string)$group['id'];
        [$heading, $description] = $descriptions[$id] ?? [$group['name'], 'Arquivos e materiais de apoio.'];
      ?>
      <article class="system-card" data-system-card>
        <div class="system-card-heading"><h3><?= e($heading) ?></h3><span class="system-code"><?= e($id === 'ESUS_APS' ? 'e-SUS APS' : ($id === 'VIG_IMUNIZACAO_AMBIENTAL' ? 'PNI' : ($id === 'TABWIN_DISSEMIN' ? 'TabWin' : $id))) ?></span></div>
        <p><?= e($description) ?></p>
        <div class="system-links">
        <?php foreach (($group['subGroups'] ?? []) as $sub):
          $href = !empty($sub['specialView']) ? '#/' . $sub['specialView'] : '#/' . rawurlencode($id) . '/' . rawurlencode($sub['name']); ?>
          <a href="<?= e($href) ?>"><?= e($sub['name']) ?><?= $arrow ?></a>
        <?php endforeach; ?>
        </div>
      </article>
      <?php endforeach; ?>
    <?php endforeach; ?>
    </div>
  </section>
  <div class="source-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/></svg><p><strong>Materiais nas fontes de origem.</strong> Os arquivos vêm dos servidores do DATASUS. O Central SUS é uma ferramenta independente, desenvolvida por Wees Dev.</p></div>
</section>
