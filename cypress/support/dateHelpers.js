export function assertDateMatches(expectedDate, count) {
  const monthGenitiveMap = {
    січень: 'січня',
    лютий: 'лютого',
    березень: 'березня',
    квітень: 'квітня',
    травень: 'травня',
    червень: 'червня',
    липень: 'липня',
    серпень: 'серпня',
    вересень: 'вересня',
    жовтень: 'жовтня',
    листопад: 'листопада',
    грудень: 'грудня',
  };

  // Get Ukrainian weekday Ukrainian genitive month
  const day = expectedDate.getDate().toString();
  const monthNom = expectedDate.toLocaleString('uk-UA', { month: 'long' });
  const month = monthGenitiveMap[monthNom];
  const weekday = expectedDate.toLocaleString('uk-UA', { weekday: 'long' });

  // Verify date in card header
  cy.get('main > div > a[href*="/pohoda"]').eq(count).find('p').eq(1)
    .should('be.visible')
    .invoke('text')
    .should('contain', day);
  cy.get('main > div > a[href*="/pohoda"]').eq(count).find('p').eq(2)
    .should('exist')
    .invoke('text')
    .should('contain', month);
  cy.get('main > div > a[href*="/pohoda"]').eq(count).find('p').eq(0)
    .should('exist')
    .invoke('text')
    .should('contain', weekday);
  
  // verify date within the card itself
  cy.contains('p','за останні')
    .should('be.visible')
    .invoke('text')
    .should('contain', day)
    .should('contain', month);
}