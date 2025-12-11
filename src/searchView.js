export function searchView() {
  return `
    <div class="modal-overlay" id="searchModal">
      <div class="modal-content">
        <button class="modal-close" id="closeSearchModal">&times;</button>
        <div class="search-view">
          <h2 class="search-view__title">Stadt suchen</h2>
          <input 
            type="text" 
            class="search-view__input" 
            placeholder="Stadt eingeben..."
            id="searchInput"
          />
          <div class="search-view__results" id="searchResults">
          </div>
        </div>
      </div>
    </div>
  `;
}
