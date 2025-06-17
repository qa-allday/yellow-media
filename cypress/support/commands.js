import { assertDateMatches } from '../support/dateHelpers';

Cypress.Commands.add('validateDateCards', (count) => {
    cy.intercept('GET', '/stats/visit/pohoda/kyiv*').as('dayRequest');
    Cypress._.times(count, (i) => {
        const alias = `dayRequest${i}`;
        const expectedDate = new Date();
        expectedDate.setDate(expectedDate.getDate() + i);
    
        if (i > 0) {
            cy.wait(500);
            cy.get('main > div > a[href*="/pohoda"]').eq(i).find('div').first().should('be.visible').click();
            //cy.wait('@dayRequest').its('response.statusCode').should('eq', 200);
        }
        assertDateMatches(expectedDate, i);
    });
});


Cypress.Commands.add('switchTo10DayForecast', () => {
    cy.intercept('GET', '**/pohoda/kyiv/10-dniv**').as('tenDaysRequest');
    // Switching the amount of days to display weather
    cy.contains('10 днів').should('be.visible').click();

    // Verifying that response for sniffed request is 200
    console.log('Verifying intercept for GET /pohoda/kyiv/10-dniv...');
    cy.waitForRequest('tenDaysRequest').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('searchCity', (cityName) => {
    cy.intercept('POST', '/api/weather/location/forecast/by_id').as('forecastByIdRequest');
    // Search the city to display weather for
    cy.get("input[type='search']").should('be.visible').type(cityName);
    //cy.wait(1000)
    cy.get('.root-app header menu a:first-of-type > span').click();

    // Verifying that response for sniffed request is 200
    cy.waitForRequest('forecastByIdRequest').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add('waitForRequest', (alias, retries = 3, timeout = 10000) => {
  const tryWait = (attempt = 1) => {
    cy.log(`Attempt ${attempt} to wait for @${alias}`);
    
    return cy.wait(`@${alias}`, { timeout }).then(
      (interception) => interception, // success: return interception
      (err) => {
        if (attempt < retries) {
          cy.log(`Retrying...`);
          return tryWait(attempt + 1);
        } else {
          throw err;
        }
      }
    );
  };

  return tryWait();
});
