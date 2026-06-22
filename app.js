/**
 * ERchamp Historical Leaderboard Web App
 * Dynamic client-side TSV parser and rich aesthetics viewer.
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Configured TSV Data Files
  const tsvFiles = [
    { year: '2020', stage: 'Q', url: 'data/2020Q.tsv' },
    { year: '2020', stage: 'F', url: 'data/2020F.tsv' },
    { year: '2021', stage: 'Q', url: 'data/2021Q.tsv' },
    { year: '2021', stage: 'F', url: 'data/2021F.tsv' },
    { year: '2022', stage: 'Q', url: 'data/2022Q.tsv' },
    { year: '2022', stage: 'F', url: 'data/2022F.tsv' },
    { year: '2023', stage: 'Q', url: 'data/2023Q.tsv' },
    { year: '2023', stage: 'F', url: 'data/2023F.tsv' },
    { year: '2024', stage: 'Q', url: 'data/2024Q.tsv' },
    { year: '2024', stage: 'F', url: 'data/2024F.tsv' },
    { year: '2025', stage: 'Q', url: 'data/2025Q.tsv' },
    { year: '2025', stage: 'F', url: 'data/2025F.tsv' },
    { year: '2026', stage: 'Q', url: 'data/2026Q.tsv' }
  ];

  // Country Details Dictionary for Search & Normalization
  const countryDetails = {
    'AM': { name: 'Armenia', flag: '🇦🇲', aliases: ['am', 'armenia'] },
    'AR': { name: 'Argentina', flag: '🇦🇷', aliases: ['ar', 'argentina'] },
    'AT': { name: 'Austria', flag: '🇦🇹', aliases: ['at', 'austria'] },
    'AU': { name: 'Australia', flag: '🇦🇺', aliases: ['au', 'australia'] },
    'BD': { name: 'Bangladesh', flag: '🇧🇩', aliases: ['bd', 'bangladesh'] },
    'BE': { name: 'Belgium', flag: '🇧🇪', aliases: ['be', 'belgium'] },
    'BG': { name: 'Bulgaria', flag: '🇧🇬', aliases: ['bg', 'bulgaria'] },
    'BR': { name: 'Brazil', flag: '🇧🇷', aliases: ['br', 'brazil'] },
    'BY': { name: 'Belarus', flag: '🇧🇾', aliases: ['by', 'belarus'] },
    'CA': { name: 'Canada', flag: '🇨🇦', aliases: ['ca', 'can', 'canada'] },
    'CH': { name: 'Switzerland', flag: '🇨🇭', aliases: ['ch', 'switzerland', 'swiss'] },
    'CN': { name: 'China', flag: '🇨🇳', aliases: ['cn', 'china'] },
    'CX': { name: 'Christmas Island', flag: '🇨🇽', aliases: ['cx', 'christmas island'] },
    'CZ': { name: 'Czech Republic', flag: '🇨🇿', aliases: ['cz', 'czech republic', 'czechia'] },
    'DE': { name: 'Germany', flag: '🇩🇪', aliases: ['de', 'germany', 'deutschland'] },
    'DK': { name: 'Denmark', flag: '🇩🇰', aliases: ['dk', 'denmark'] },
    'ES': { name: 'Spain', flag: '🇪🇸', aliases: ['es', 'spain', 'espana'] },
    'FI': { name: 'Finland', flag: '🇫🇮', aliases: ['fi', 'finland'] },
    'FR': { name: 'France', flag: '🇫🇷', aliases: ['fr', 'france'] },
    'GB': { name: 'United Kingdom', flag: '🇬🇧', aliases: ['gb', 'uk', 'united kingdom', 'england', 'great britain'] },
    'GR': { name: 'Greece', flag: '🇬🇷', aliases: ['gr', 'greece'] },
    'HK': { name: 'Hong Kong', flag: '🇭🇰', aliases: ['hk', 'hong kong'] },
    'HR': { name: 'Croatia', flag: '🇭🇷', aliases: ['hr', 'croatia'] },
    'HU': { name: 'Hungary', flag: '🇭🇺', aliases: ['hu', 'hungary'] },
    'ID': { name: 'Indonesia', flag: '🇮🇩', aliases: ['id', 'indonesia'] },
    'IL': { name: 'Israel', flag: '🇮🇱', aliases: ['il', 'israel'] },
    'IN': { name: 'India', flag: '🇮🇳', aliases: ['in', 'india'] },
    'IT': { name: 'Italy', flag: '🇮🇹', aliases: ['it', 'italy'] },
    'JP': { name: 'Japan', flag: '🇯🇵', aliases: ['jp', 'japan'] },
    'KP': { name: 'North Korea', flag: '🇰🇵', aliases: ['kp', 'north korea'] },
    'KR': { name: 'South Korea', flag: '🇰🇷', aliases: ['kr', 'south korea', 'korea'] },
    'LT': { name: 'Lithuania', flag: '🇱🇹', aliases: ['lt', 'lithuania'] },
    'NL': { name: 'Netherlands', flag: '🇳🇱', aliases: ['nl', 'netherlands', 'holland'] },
    'NO': { name: 'Norway', flag: '🇳🇴', aliases: ['no', 'norway'] },
    'NZ': { name: 'New Zealand', flag: '🇳🇿', aliases: ['nz', 'new zealand'] },
    'PL': { name: 'Poland', flag: '🇵🇱', aliases: ['pl', 'poland', 'polska'] },
    'PM': { name: 'St. Pierre & Miquelon', flag: '🇵🇲', aliases: ['pm', 'saint pierre', 'miquelon'] },
    'PN': { name: 'Pitcairn Islands', flag: '🇵🇳', aliases: ['pn', 'pitcairn'] },
    'PT': { name: 'Portugal', flag: '🇵🇹', aliases: ['pt', 'portugal'] },
    'RO': { name: 'Romania', flag: '🇷🇴', aliases: ['ro', 'romania'] },
    'RU': { name: 'Russia', flag: '🇷🇺', aliases: ['ru', 'russia'] },
    'RS': { name: 'Serbia', flag: '🇷🇸', aliases: ['rs', 'serbia'] },
    'RW': { name: 'Rwanda', flag: '🇷🇼', aliases: ['rw', 'rwanda'] },
    'SE': { name: 'Sweden', flag: '🇸🇪', aliases: ['se', 'swe', 'sweden'] },
    'SG': { name: 'Singapore', flag: '🇸🇬', aliases: ['sg', 'singapore'] },
    'SK': { name: 'Slovakia', flag: '🇸🇰', aliases: ['sk', 'slovakia'] },
    'SI': { name: 'Slovenia', flag: '🇸🇮', aliases: ['si', 'slovenia'] },
    'SJ': { name: 'Svalbard & Jan Mayen', flag: '🇸🇯', aliases: ['sj', 'svalbard'] },
    'TH': { name: 'Thailand', flag: '🇹🇭', aliases: ['th', 'thailand'] },
    'TW': { name: 'Taiwan', flag: '🇹🇼', aliases: ['tw', 'taiwan', 'republic of china'] },
    'UA': { name: 'Ukraine', flag: '🇺🇦', aliases: ['ua', 'ukraine'] },
    'US': { name: 'United States', flag: '🇺🇸', aliases: ['us', 'usa', 'united states', 'america'] },
    'VN': { name: 'Vietnam', flag: '🇻🇳', aliases: ['vn', 'vietnam'] }
  };

  // State Management
  const state = {
    allYears: [],          // Unique years list: ['2020', '2021', ..., '2026']
    teams: {},             // Map of team data compiled from all TSVs
    allEvents: [],         // All events: ['2020Q', '2020F', ..., '2026Q']
    currentEvent: '',      // Current default selection
    selectedTeamName: null,// Highlighted team
    searchQuery: '',
    searchResults: [],
    activeCountryFilter: null, // Filter table by ISO country code: e.g. 'PL'
    activeSearchIndex: -1      // Selected dropdown index for keyboard navigation
  };

  // DOM Elements
  const loadingOverlay = document.getElementById('loading-overlay');
  const eventSelect = document.getElementById('event-select');
  const tableTitle = document.getElementById('table-title');
  const filterBadgeContainer = document.getElementById('filter-badge-container');
  const leaderboardBody = document.getElementById('leaderboard-body');
  const leaderboardTable = document.getElementById('leaderboard-table');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const searchDropdown = document.getElementById('search-dropdown');
  const searchResultsList = document.getElementById('search-results-list');
  
  const teamProfileSection = document.getElementById('team-profile-section');
  const profilePlaceholder = document.getElementById('profile-placeholder');
  const closeProfileBtn = document.getElementById('close-profile-btn');
  
  const profileFlag = document.getElementById('profile-flag');
  const profileTeamName = document.getElementById('profile-team-name');
  const profileNationalityText = document.getElementById('profile-nationality-text');
  const profileActiveYears = document.getElementById('profile-active-years');
  const profileBestF = document.getElementById('profile-best-f');
  const profileBestQ = document.getElementById('profile-best-q');
  const profileTotalEntries = document.getElementById('profile-total-entries');
  
  const rankChart = document.getElementById('rank-chart');
  const chartTooltip = document.getElementById('chart-tooltip');
  const profileTimeline = document.getElementById('profile-timeline');

  const statTotalTeams = document.getElementById('stat-total-teams');
  const statTotalYears = document.getElementById('stat-total-years');

  // Loading & Parsing Pipeline
  try {
    await loadAndCompileData();
    // Hide Loading Overlay
    loadingOverlay.style.opacity = '0';
    setTimeout(() => {
      loadingOverlay.style.display = 'none';
    }, 300);
    
    // Initialize UI Componentry
    initApp();
  } catch (error) {
    console.error("Data loading/parsing failed: ", error);
    const loadingTextEl = loadingOverlay.querySelector('.loading-text');
    loadingTextEl.style.color = '#ef4444';
    loadingTextEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> 載入賽事數據出錯，請確認是否有開啟 HTTP 伺服器並重試。`;
    const spinner = loadingOverlay.querySelector('.spinner');
    if (spinner) spinner.style.borderTopColor = '#ef4444';
  }

  // Fetch and compile raw data from TSV files
  async function loadAndCompileData() {
    const rawData = [];
    const teamNameCounts = {};     // lower_name -> { exact_name: count }
    const teamNationalities = {};   // lower_name -> { nationality: count }
    const yearSet = new Set();
    const eventSet = new Set();

    // Fetch all files in parallel
    const fetchPromises = tsvFiles.map(async (fileInfo) => {
      try {
        const response = await fetch(fileInfo.url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        parseTsvText(text, fileInfo.year, fileInfo.stage, rawData, teamNameCounts, teamNationalities, yearSet, eventSet);
      } catch (err) {
        console.warn(`Could not load TSV file: ${fileInfo.url}. Error:`, err);
        // Rethrow only if we load absolutely nothing
      }
    });

    await Promise.all(fetchPromises);

    if (rawData.length === 0) {
      throw new Error("No data was parsed from the TSV files.");
    }

    // Step 2: Determine canonical names and nationalities
    const canonicalNames = {};
    const canonicalNationalities = {};
    
    Object.keys(teamNameCounts).forEach(lowerName => {
      // Find exact name with highest count, tie breaker: longest name
      const nameCounts = teamNameCounts[lowerName];
      const sortedNames = Object.entries(nameCounts).sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return b[0].length - a[0].length;
      });
      canonicalNames[lowerName] = sortedNames[0][0];

      // Find nationality with highest count
      const natCounts = teamNationalities[lowerName] || {};
      const sortedNats = Object.entries(natCounts).sort((a, b) => b[1] - a[1]);
      canonicalNationalities[lowerName] = sortedNats.length > 0 ? sortedNats[0][0] : '';
    });

    // Step 3: Populate team records
    const compiledTeams = {};
    rawData.forEach(item => {
      const lowerName = item.team.toLowerCase();
      const canonName = canonicalNames[lowerName];
      
      if (!compiledTeams[canonName]) {
        compiledTeams[canonName] = {
          name: canonName,
          nationality: canonicalNationalities[lowerName],
          history: {}
        };
      }
      
      const key = `${item.year}${item.stage}`;
      compiledTeams[canonName].history[key] = {
        rank: item.rank,
        time: item.time
      };
    });

    // Save compiled objects to global state
    state.teams = compiledTeams;
    state.allYears = Array.from(yearSet).sort((a, b) => parseInt(b) - parseInt(a));
    state.allEvents = Array.from(eventSet).sort((a, b) => {
      const yearA = parseInt(a.slice(0, 4));
      const yearB = parseInt(b.slice(0, 4));
      if (yearA !== yearB) return yearA - yearB;
      return a.slice(4) === 'Q' ? -1 : 1; // Q first, then F
    });
    
    // Default current event to the latest available
    state.currentEvent = state.allEvents[state.allEvents.length - 1];
  }

  // Parse custom TSV Text line by line
  function parseTsvText(text, year, stage, rawData, nameCounts, nationalities, yearSet, eventSet) {
    const lines = text.split(/\r?\n/);
    if (lines.length === 0) return;

    // Parse header to find column indexes
    const firstLine = lines[0];
    const header = firstLine.split('\t').map(h => h.trim());
    
    const rankIdx = header.indexOf("Rank");
    const teamIdx = header.indexOf("Team") !== -1 ? header.indexOf("Team") : header.indexOf("Name");
    const timeIdx = header.indexOf("Time");
    const natIdx = header.indexOf("Nationality");

    if (rankIdx === -1 || teamIdx === -1) {
      console.warn(`Skipping invalid headers in year ${year}${stage}: ${firstLine}`);
      return;
    }

    // Add to unique years & events
    yearSet.add(year);
    eventSet.add(`${year}${stage}`);

    const minRequiredLength = Math.max(rankIdx, teamIdx) + 1;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const parts = line.split('\t').map(p => p.trim());
      if (parts.length < minRequiredLength) continue;

      const rank = parts[rankIdx];
      const team = parts[teamIdx];
      const time = (timeIdx !== -1 && parts.length > timeIdx) ? parts[timeIdx] : '';
      const rawNat = (natIdx !== -1 && parts.length > natIdx) ? parts[natIdx] : '';
      const nat = normalizeNationality(rawNat);

      if (!team) continue;

      rawData.push({ year, stage, rank, team, time, nat });

      // Gather capitalization and flag statistics
      const lowerTeam = team.toLowerCase();
      if (!nameCounts[lowerTeam]) {
        nameCounts[lowerTeam] = {};
      }
      nameCounts[lowerTeam][team] = (nameCounts[lowerTeam][team] || 0) + 1;

      if (nat) {
        if (!nationalities[lowerTeam]) {
          nationalities[lowerTeam] = {};
        }
        nationalities[lowerTeam][nat] = (nationalities[lowerTeam][nat] || 0) + 1;
      }
    }
  }

  // Initialize App UI Elements
  function initApp() {
    // Populate header stats
    statTotalTeams.textContent = Object.keys(state.teams).length.toLocaleString();
    statTotalYears.textContent = `${state.allYears[state.allYears.length - 1]} - ${state.allYears[0]}`;

    // Hook listeners
    eventSelect.addEventListener('change', (e) => {
      state.currentEvent = e.target.value;
      renderLeaderboard();
    });

    closeProfileBtn.addEventListener('click', closeProfile);

    searchInput.addEventListener('input', (e) => {
      handleSearch(e.target.value);
    });

    searchInput.addEventListener('keydown', (e) => {
      const items = Array.from(searchResultsList.querySelectorAll('li:not(.search-no-results)'));
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        state.activeSearchIndex = (state.activeSearchIndex + 1) % items.length;
        updateActiveDropdownItem(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        state.activeSearchIndex = (state.activeSearchIndex - 1 + items.length) % items.length;
        updateActiveDropdownItem(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (state.activeSearchIndex === -1) {
          state.activeSearchIndex = 0; // Default to first item
        }
        if (items[state.activeSearchIndex]) {
          items[state.activeSearchIndex].click();
        }
      } else if (e.key === 'Escape') {
        searchDropdown.style.display = 'none';
      }
    });

    function updateActiveDropdownItem(items) {
      items.forEach((item, index) => {
        if (index === state.activeSearchIndex) {
          item.classList.add('search-result-active');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('search-result-active');
        }
      });
    }

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      handleSearch('');
      searchInput.focus();
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.style.display = 'none';
      }
    });

    // Keyboard keydown shortcut removed

    // Populate elements & render
    buildTableHeader();
    populateEventSelector();
    renderLeaderboard();
  }

  // Normalize nationality representations to standard 2-letter ISO country codes
  function normalizeNationality(nat) {
    if (!nat) return '';
    nat = nat.trim();

    // Check if it is a regional indicator emoji flag
    const codePoints = Array.from(nat);
    if (codePoints.length === 2) {
      const charCode1 = codePoints[0].codePointAt(0);
      const charCode2 = codePoints[1].codePointAt(0);
      if (charCode1 >= 127462 && charCode1 <= 127487 && charCode2 >= 127462 && charCode2 <= 127487) {
        const iso1 = String.fromCharCode(charCode1 - 127397);
        const iso2 = String.fromCharCode(charCode2 - 127397);
        return (iso1 + iso2).toUpperCase();
      }
    }

    // Clean up string: uppercase and keep only alphabetical characters
    let clean = nat.toUpperCase().replace(/[^A-Z]/g, '');

    // Look up in countryDetails keys and aliases
    for (const [code, details] of Object.entries(countryDetails)) {
      if (code === clean || details.aliases.some(alias => alias.toUpperCase().replace(/[^A-Z]/g, '') === clean)) {
        return code;
      }
    }

    return clean;
  }

  // ISO country code flag converter
  function getFlagEmoji(countryCode) {
    if (!countryCode) return '🏳️';
    if (countryCode.length > 2) return countryCode; // Already emoji
    
    let code = countryCode.toUpperCase();
    if (code === 'UK') code = 'GB';
    if (code === 'USA') code = 'US';
    
    const codePoints = code
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    try {
      return String.fromCodePoint(...codePoints);
    } catch (e) {
      return '🏳️';
    }
  }

  // Create table header columns for years dynamically
  function buildTableHeader() {
    const headerRow = leaderboardTable.querySelector('thead tr');
    const existingCols = headerRow.querySelectorAll('.col-year');
    existingCols.forEach(col => col.remove());

    state.allYears.forEach(year => {
      const th = document.createElement('th');
      th.className = 'col-year';
      th.textContent = year;
      th.setAttribute('data-year', year);
      headerRow.appendChild(th);
    });
  }

  // Populate selector dropdown options
  function populateEventSelector() {
    eventSelect.innerHTML = '';
    state.allEvents.forEach(evt => {
      const opt = document.createElement('option');
      opt.value = evt;
      const year = evt.slice(0, 4);
      const stage = evt.slice(4) === 'Q' ? 'Qualifiers (Q)' : 'Finals (F)';
      opt.textContent = `${year} ${stage}`;
      eventSelect.appendChild(opt);
    });
    eventSelect.value = state.currentEvent;
  }

  // Render the Leaderboard Table based on selected event
  function renderLeaderboard() {
    const selectedEvent = state.currentEvent;
    const yearPart = selectedEvent.slice(0, 4);
    const stagePart = selectedEvent.slice(4) === 'Q' ? 'Qualifiers (Q)' : 'Finals (F)';
    
    const showAll = (selectedEvent === '2024F' || selectedEvent === '2025F');
    
    let titleText = showAll 
      ? `${yearPart} ${stagePart} Rankings` 
      : `${yearPart} ${stagePart} Top 10 Teams`;
      
    if (state.activeCountryFilter) {
      const countryInfo = countryDetails[state.activeCountryFilter];
      const countryLabel = countryInfo ? countryInfo.name : state.activeCountryFilter;
      const countryTeams = Object.values(state.teams).filter(t => t.nationality === state.activeCountryFilter);
      const totalCountryTeams = countryTeams.length;
      const currentEventTeams = countryTeams.filter(t => t.history[selectedEvent]).length;
      titleText = `${yearPart} ${stagePart} - Teams from ${countryLabel} (${currentEventTeams}/${totalCountryTeams})`;
    }
    tableTitle.textContent = titleText;

    // Render filter badge if active
    renderFilterBadge();

    const activeTeams = [];
    Object.values(state.teams).forEach(team => {
      if (state.activeCountryFilter) {
        // If filtering by country, list all teams from that country that ever participated
        if (team.nationality === state.activeCountryFilter) {
          const record = team.history[selectedEvent];
          const rankStr = record ? record.rank : '';
          const rankVal = parseInt(rankStr) || 999999;
          activeTeams.push({
            team,
            rankVal,
            record
          });
        }
      } else {
        // Normal mode: only show teams active in the selected reference event
        if (team.history[selectedEvent]) {
          const rankStr = team.history[selectedEvent].rank;
          const rankVal = parseInt(rankStr) || 999999;
          activeTeams.push({
            team,
            rankVal,
            record: team.history[selectedEvent]
          });
        }
      }
    });

    activeTeams.sort((a, b) => {
      if (a.rankVal !== b.rankVal) {
        return a.rankVal - b.rankVal;
      }
      return a.team.name.localeCompare(b.team.name);
    });
    const maxCount = (showAll || state.activeCountryFilter) ? activeTeams.length : 10;
    const topTeams = activeTeams.slice(0, maxCount);

    leaderboardBody.innerHTML = '';
    if (topTeams.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 2 + state.allYears.length;
      td.className = 'text-center';
      td.style.padding = '3rem';
      td.style.color = 'var(--text-muted)';
      td.textContent = 'No records found for this event';
      tr.appendChild(td);
      leaderboardBody.appendChild(tr);
      return;
    }

    topTeams.forEach((item) => {
      const team = item.team;
      const rank = item.rankVal;
      const record = item.record;

      const tr = document.createElement('tr');
      tr.setAttribute('data-team-name', team.name);
      if (state.selectedTeamName === team.name) {
        tr.className = 'active-row';
      }

      let rankClass = '';
      if (rank === 1) rankClass = 'rank-1';
      else if (rank === 2) rankClass = 'rank-2';
      else if (rank === 3) rankClass = 'rank-3';

      const tdRank = document.createElement('td');
      tdRank.className = 'col-rank';
      tdRank.innerHTML = `<span class="rank-badge ${rankClass}">${rank === 999999 ? '-' : rank}</span>`;
      tr.appendChild(tdRank);

      const tdTeam = document.createElement('td');
      tdTeam.className = 'col-team';
      const flagEmoji = getFlagEmoji(team.nationality);
      tdTeam.innerHTML = `
        <div class="flag-container">
          <span class="flag-emoji" title="${team.nationality || 'Unknown'}">${flagEmoji}</span>
          <span>${team.name}</span>
        </div>
      `;
      tr.appendChild(tdTeam);

      const getRankBadgeClass = (rStr) => {
        const r = parseInt(rStr);
        if (r === 1) return 'badge-gold';
        if (r === 2) return 'badge-silver';
        if (r === 3) return 'badge-bronze';
        return '';
      };

      state.allYears.forEach(year => {
        const tdYear = document.createElement('td');
        tdYear.className = 'col-year';
        tdYear.setAttribute('data-year', year);

        const qKey = `${year}Q`;
        const fKey = `${year}F`;
        const qRecord = team.history[qKey];
        const fRecord = team.history[fKey];

        const stack = document.createElement('div');
        stack.className = 'year-cell-stack';

        const selectedStage = selectedEvent.slice(4); // 'Q' or 'F'
        const isSelectedYear = (year === yearPart);
        const qBadgeHtml = qRecord 
          ? `<span class="stage-badge stage-q ${getRankBadgeClass(qRecord.rank)} ${(isSelectedYear && selectedStage === 'Q') ? 'selected-stage' : ''}" title="${year} Qualifiers Time: ${qRecord.time || 'N/A'}">Q: ${qRecord.rank}</span>` 
          : '';
        const fBadgeHtml = fRecord 
          ? `<span class="stage-badge stage-f ${getRankBadgeClass(fRecord.rank)} ${(isSelectedYear && selectedStage === 'F') ? 'selected-stage' : ''}" title="${year} Finals Time: ${fRecord.time || 'N/A'}">F: ${fRecord.rank}</span>` 
          : '';

        if (selectedStage === 'Q') {
          if (qBadgeHtml) stack.innerHTML += qBadgeHtml;
          if (fBadgeHtml) stack.innerHTML += fBadgeHtml;
        } else {
          if (fBadgeHtml) stack.innerHTML += fBadgeHtml;
          if (qBadgeHtml) stack.innerHTML += qBadgeHtml;
        }

        if (!qRecord && !fRecord) {
          stack.innerHTML = `<span class="stage-badge stage-none">-</span>`;
        }

        tdYear.appendChild(stack);
        tr.appendChild(tdYear);
      });

      tr.addEventListener('click', () => {
        selectTeam(team.name);
      });

      leaderboardBody.appendChild(tr);
    });

    // Highlight the column corresponding to the selected reference year
    const allYearElements = leaderboardTable.querySelectorAll('[data-year]');
    allYearElements.forEach(el => {
      if (el.getAttribute('data-year') === yearPart) {
        el.classList.add('highlighted-column');
      } else {
        el.classList.remove('highlighted-column');
      }
    });
  }

  // Render filter badge if active
  function renderFilterBadge() {
    if (!filterBadgeContainer) return;
    filterBadgeContainer.innerHTML = '';
    
    if (state.activeCountryFilter) {
      const countryInfo = countryDetails[state.activeCountryFilter];
      const flagEmoji = countryInfo ? countryInfo.flag : getFlagEmoji(state.activeCountryFilter);
      const name = countryInfo ? countryInfo.name : state.activeCountryFilter;
      
      const badge = document.createElement('div');
      badge.className = 'filter-badge';
      badge.innerHTML = `
        <span>${flagEmoji} ${name}</span>
        <span class="close-btn" title="Clear filter"><i class="fa-solid fa-xmark"></i></span>
      `;
      badge.querySelector('.close-btn').addEventListener('click', () => {
        clearCountryFilter();
      });
      filterBadgeContainer.appendChild(badge);
    }
  }

  // Clear country filter
  function clearCountryFilter() {
    state.activeCountryFilter = null;
    renderLeaderboard();
  }

  // Select a team and show their detailed profile
  function selectTeam(teamName) {
    state.selectedTeamName = teamName;
    const team = state.teams[teamName];
    if (!team) return;

    const rows = leaderboardBody.querySelectorAll('tr');
    rows.forEach(row => {
      if (row.getAttribute('data-team-name') === teamName) {
        row.classList.add('active-row');
      } else {
        row.classList.remove('active-row');
      }
    });

    profilePlaceholder.style.display = 'none';
    teamProfileSection.style.display = 'block';

    profileFlag.textContent = getFlagEmoji(team.nationality);
    profileFlag.title = team.nationality;
    profileTeamName.textContent = team.name;
    profileNationalityText.textContent = `Country: ${team.nationality || 'Unknown'}`;

    const yearsPlayed = Object.keys(team.history).map(key => parseInt(key.slice(0, 4)));
    const minYear = Math.min(...yearsPlayed);
    const maxYear = Math.max(...yearsPlayed);
    profileActiveYears.textContent = minYear === maxYear ? `Active Years: ${minYear}` : `Active Years: ${minYear} - ${maxYear}`;

    let bestQ = Infinity;
    let bestF = Infinity;
    let entriesCount = 0;

    Object.entries(team.history).forEach(([key, rec]) => {
      entriesCount++;
      const stage = key.slice(4);
      const r = parseInt(rec.rank);
      if (isNaN(r)) return;
      if (stage === 'Q' && r < bestQ) bestQ = r;
      if (stage === 'F' && r < bestF) bestF = r;
    });

    profileBestQ.textContent = bestQ === Infinity ? '-' : `#${bestQ}`;
    profileBestF.textContent = bestF === Infinity ? '-' : `#${bestF}`;
    profileTotalEntries.textContent = `${entriesCount} entries`;

    renderTimeline(team);
    drawChart(team);

    teamProfileSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Close profile view
  function closeProfile() {
    state.selectedTeamName = null;
    teamProfileSection.style.display = 'none';
    profilePlaceholder.style.display = 'flex';
    
    const rows = leaderboardBody.querySelectorAll('tr');
    rows.forEach(row => row.classList.remove('active-row'));
  }

  // Render Timeline of team records
  function renderTimeline(team) {
    profileTimeline.innerHTML = '';
    
    const sortedRecordKeys = Object.keys(team.history).sort((a, b) => {
      const yearA = parseInt(a.slice(0, 4));
      const yearB = parseInt(b.slice(0, 4));
      if (yearA !== yearB) return yearB - yearA; 
      const stageA = a.slice(4);
      const stageB = b.slice(4);
      return stageA === 'Q' ? 1 : -1; 
    });

    sortedRecordKeys.forEach(key => {
      const record = team.history[key];
      const year = key.slice(0, 4);
      const stage = key.slice(4);
      
      const item = document.createElement('div');
      item.className = 'timeline-item';

      const nodeClass = stage === 'Q' ? 'node-q' : 'node-f';
      const nodeLabel = stage === 'Q' ? 'Quals Q' : 'Finals F';

      item.innerHTML = `
        <div class="timeline-node ${nodeClass}">${nodeLabel}</div>
        <div class="timeline-content">
          <div>
            <span class="timeline-title">${year} Season</span>
            <span class="timeline-rank">Rank: <strong class="timeline-rank-highlight">#${record.rank}</strong></span>
          </div>
          <div class="timeline-time">
            <i class="fa-regular fa-clock"></i> ${record.time || 'No time recorded'}
          </div>
        </div>
      `;
      profileTimeline.appendChild(item);
    });
  }

  // Draw rank progression SVG line chart
  function drawChart(team) {
    rankChart.innerHTML = '';
    chartTooltip.style.display = 'none';

    const activeEvents = state.allEvents.filter(evt => team.history[evt]);
    if (activeEvents.length < 1) {
      rankChart.innerHTML = `<text x="300" y="120" fill="var(--text-muted)" text-anchor="middle" font-size="14">Insufficient data to draw progression chart</text>`;
      return;
    }

    let bestRank = Infinity;
    let worstRank = -Infinity;
    activeEvents.forEach(evt => {
      const r = parseInt(team.history[evt].rank);
      if (isNaN(r)) return;
      if (r < bestRank) bestRank = r;
      if (r > worstRank) worstRank = r;
    });

    if (bestRank === Infinity) {
      rankChart.innerHTML = `<text x="300" y="120" fill="var(--text-muted)" text-anchor="middle" font-size="14">Rank parsing error, cannot draw progression chart</text>`;
      return;
    }

    if (bestRank === worstRank) {
      worstRank = bestRank + 5;
      bestRank = Math.max(1, bestRank - 5);
    } else {
      const span = worstRank - bestRank;
      worstRank = worstRank + Math.ceil(span * 0.1);
      bestRank = Math.max(1, bestRank - Math.ceil(span * 0.1));
    }

    const svgWidth = 600;
    const svgHeight = 240;
    const paddingLeft = 55;
    const paddingRight = 30;
    const paddingTop = 30;
    const paddingBottom = 40;

    const chartWidth = svgWidth - paddingLeft - paddingRight;
    const chartHeight = svgHeight - paddingTop - paddingBottom;

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="chart-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="var(--accent-cyan)" />
        <stop offset="100%" stop-color="var(--accent-emerald)" />
      </linearGradient>
      <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="var(--accent-cyan)" stop-opacity="0.18" />
        <stop offset="100%" stop-color="var(--accent-cyan)" stop-opacity="0.0" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    `;
    rankChart.appendChild(defs);

    const points = [];
    activeEvents.forEach(evt => {
      const eventIndex = state.allEvents.indexOf(evt);
      const totalEvents = state.allEvents.length;

      const x = paddingLeft + (eventIndex / (totalEvents - 1)) * chartWidth;
      const rank = parseInt(team.history[evt].rank);
      const y = paddingTop + ((rank - bestRank) / (worstRank - bestRank)) * chartHeight;

      points.push({ x, y, event: evt, rank, time: team.history[evt].time });
    });

    const ticksCount = 4;
    for (let i = 0; i <= ticksCount; i++) {
      const ratio = i / ticksCount;
      const y = paddingTop + ratio * chartHeight;
      const rankVal = Math.round(bestRank + ratio * (worstRank - bestRank));

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', paddingLeft);
      line.setAttribute('y1', y);
      line.setAttribute('x2', svgWidth - paddingRight);
      line.setAttribute('y2', y);
      line.className.baseVal = 'chart-grid-line';
      rankChart.appendChild(line);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', paddingLeft - 10);
      text.setAttribute('y', y + 4);
      text.setAttribute('text-anchor', 'end');
      text.className.baseVal = 'chart-axis-text';
      text.textContent = `#${rankVal}`;
      rankChart.appendChild(text);
    }

    state.allYears.forEach((year) => {
      const qEvt = `${year}Q`;
      const eventIndex = state.allEvents.indexOf(qEvt);
      if (eventIndex === -1) return;

      const x = paddingLeft + (eventIndex / (state.allEvents.length - 1)) * chartWidth;

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', svgHeight - paddingBottom + 20);
      text.setAttribute('text-anchor', 'middle');
      text.className.baseVal = 'chart-axis-text';
      text.textContent = year;
      rankChart.appendChild(text);

      const tickLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tickLine.setAttribute('x1', x);
      tickLine.setAttribute('y1', paddingTop);
      tickLine.setAttribute('x2', x);
      tickLine.setAttribute('y2', svgHeight - paddingBottom);
      tickLine.setAttribute('stroke', 'rgba(255,255,255, 0.02)');
      tickLine.setAttribute('stroke-width', '1');
      rankChart.appendChild(tickLine);
    });

    if (points.length > 1) {
      const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let d = `M ${points[0].x} ${svgHeight - paddingBottom} `;
      points.forEach(pt => {
        d += `L ${pt.x} ${pt.y} `;
      });
      d += `L ${points[points.length - 1].x} ${svgHeight - paddingBottom} Z`;
      
      areaPath.setAttribute('d', d);
      areaPath.setAttribute('fill', 'url(#area-gradient)');
      rankChart.appendChild(areaPath);
    }

    if (points.length > 1) {
      const linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let d = `M ${points[0].x} ${points[0].y} `;
      
      points.forEach((pt, idx) => {
        if (idx === 0) return;
        d += `L ${pt.x} ${pt.y} `;
      });

      linePath.setAttribute('d', d);
      linePath.className.baseVal = 'chart-line';
      rankChart.appendChild(linePath);
    }

    points.forEach((pt) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pt.x);
      circle.setAttribute('cy', pt.y);
      circle.setAttribute('r', '5.5');
      circle.className.baseVal = 'chart-dot';
      
      const stage = pt.event.slice(4);
      circle.setAttribute('stroke', stage === 'Q' ? 'var(--accent-cyan)' : 'var(--accent-emerald)');

      circle.addEventListener('mouseenter', () => {
        const stageLabel = stage === 'Q' ? 'Qualifiers (Q)' : 'Finals (F)';
        const year = pt.event.slice(0, 4);

        chartTooltip.innerHTML = `
          <div class="chart-tooltip-title">${year} ${stageLabel}</div>
          <div class="chart-tooltip-body">Rank: <strong>#${pt.rank}</strong></div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">Time: ${pt.time || 'N/A'}</div>
        `;
        
        chartTooltip.style.display = 'block';
        
        const chartWrapperRect = rankChart.parentElement.getBoundingClientRect();
        const dotRect = circle.getBoundingClientRect();
        
        const left = (dotRect.left - chartWrapperRect.left) + (dotRect.width / 2) - (chartTooltip.offsetWidth / 2);
        const top = (dotRect.top - chartWrapperRect.top) - chartTooltip.offsetHeight - 8;
        
        chartTooltip.style.left = `${left}px`;
        chartTooltip.style.top = `${top}px`;
      });

      circle.addEventListener('mouseleave', () => {
        chartTooltip.style.display = 'none';
      });

      rankChart.appendChild(circle);

      if (points.length <= 15) {
        const textVal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textVal.setAttribute('x', pt.x);
        textVal.setAttribute('y', pt.y - 12);
        textVal.className.baseVal = 'chart-label-value';
        textVal.textContent = `#${pt.rank}`;
        rankChart.appendChild(textVal);
      }
    });
  }

  // Helper to find country by exact code, name, or alias match
  function findMatchedCountryCode(query) {
    if (!query) return null;
    const cleanQuery = query.trim().toLowerCase();
    for (const [code, details] of Object.entries(countryDetails)) {
      if (
        code.toLowerCase() === cleanQuery ||
        details.name.toLowerCase() === cleanQuery ||
        details.aliases.includes(cleanQuery)
      ) {
        return code;
      }
    }
    return null;
  }

  // Interactive Live Search & Autocomplete
  function handleSearch(query) {
    state.searchQuery = query.trim().toLowerCase();
    state.activeSearchIndex = -1;
    
    if (!state.searchQuery) {
      clearSearchBtn.style.display = 'none';
      searchDropdown.style.display = 'none';
      return;
    }

    clearSearchBtn.style.display = 'block';

    // Find if query matches a country code or name
    const matchedCountryCode = findMatchedCountryCode(state.searchQuery);

    const matches = [];
    Object.values(state.teams).forEach(team => {
      const matchesName = team.name.toLowerCase().includes(state.searchQuery);
      const matchesCountry = matchedCountryCode && (team.nationality === matchedCountryCode);
      if (matchesName || matchesCountry) {
        matches.push(team);
      }
    });

    matches.sort((a, b) => {
      const aStart = a.name.toLowerCase().startsWith(state.searchQuery);
      const bStart = b.name.toLowerCase().startsWith(state.searchQuery);
      if (aStart && !bStart) return -1;
      if (!aStart && bStart) return 1;
      return a.name.localeCompare(b.name);
    });

    state.searchResults = matches.slice(0, 12);
    renderSearchDropdown();
  }

  // Render Search Autocomplete Dropdown
  function renderSearchDropdown() {
    searchResultsList.innerHTML = '';
    
    // If the query matches a country, prepend a "Filter by Country" option
    if (state.searchQuery) {
      const matchedCountryCode = findMatchedCountryCode(state.searchQuery);

      if (matchedCountryCode) {
        const details = countryDetails[matchedCountryCode];
        const li = document.createElement('li');
        li.className = 'search-result-country-filter';
        li.style.borderBottom = '1px solid var(--border-light)';
        li.style.padding = '10px 15px';
        li.style.color = 'var(--accent-cyan)';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '8px';
        li.style.cursor = 'pointer';
        li.innerHTML = `
          <span style="font-size: 1.1rem;">🌍</span>
          <span style="font-weight: 600;">Filter table by Country: ${details.flag} ${details.name}</span>
        `;
        li.addEventListener('click', () => {
          state.activeCountryFilter = matchedCountryCode;
          searchInput.value = '';
          searchDropdown.style.display = 'none';
          clearSearchBtn.style.display = 'none';
          renderLeaderboard();
        });
        searchResultsList.appendChild(li);
      }
    }

    if (state.searchResults.length === 0) {
      // If there's no matching country filter option, show standard no-results
      if (searchResultsList.children.length === 0) {
        searchResultsList.innerHTML = `<li class="search-no-results">No matching teams found</li>`;
      }
      searchDropdown.style.display = 'block';
      return;
    }

    state.searchResults.forEach(team => {
      const li = document.createElement('li');
      const flagEmoji = getFlagEmoji(team.nationality);
      const activeEvents = Object.keys(team.history);
      const totalEntries = activeEvents.length;
      
      li.innerHTML = `
        <span class="search-result-name">
          <span style="margin-right: 0.5rem;">${flagEmoji}</span>${team.name}
        </span>
        <span class="search-result-meta">
          <span>${totalEntries} entries</span>
          <i class="fa-solid fa-chevron-right" style="font-size: 0.7rem; color: var(--text-dark);"></i>
        </span>
      `;

      li.addEventListener('click', () => {
        selectTeam(team.name);
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        searchDropdown.style.display = 'none';
      });

      searchResultsList.appendChild(li);
    });

    searchDropdown.style.display = 'block';
  }
});
