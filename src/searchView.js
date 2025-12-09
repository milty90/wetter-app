export function searchView() {
  return `
    <div class="search-view">
    <div class="search-view__header">
    <img
        class="search-view__header-back-icon" style="cursor: pointer; width: 40px; height: 40px;"
      src="/arrow-left.svg"
      alt="Back Icon">
      <h2 class="search-view__title">Gib den Namen der Stadt ein:</h2>
    </div>
      <input
        type="text"
        class="search-view__input"
        placeholder="Gib den Namen der Stadt ein..."
      />
      <button class="search-view__button">Suchen</button>
</div>
  `;
}
