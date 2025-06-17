describe('Weather Forecast Test for Kyiv', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Search Kyiv and verify weather for 7 and 10 days', () => {
    // Search city of Kyiv
    cy.searchCity('Київ');

    // 7-day verification
    cy.validateDateCards(7);

    // Switch to 10-day
    cy.switchTo10DayForecast();

    // 10-day verification
    cy.validateDateCards(10);
  });
});
