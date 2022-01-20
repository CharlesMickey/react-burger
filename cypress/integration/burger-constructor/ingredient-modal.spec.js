import { closeModal } from './close-modal';
import { p } from './making an order + DnD.spec';

describe('the modal window of the ingredient with all the data opens/closes correctly', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('open the modal window of the ingredient', function () {
    cy.contains('Флюоресцентная булка').click();
    cy.get('[class^=modal]').as('modal');
    cy.get('@modal').contains('Детали ингредиента');
    cy.get('@modal').contains('Флюоресцентная булка R2-D3');
    cy.get('@modal').contains('Калории,ккал');
    cy.get('@modal').contains('643');
    cy.get('@modal').contains('44');
    cy.get('@modal').contains('85');
  });

  closeModal();
});
