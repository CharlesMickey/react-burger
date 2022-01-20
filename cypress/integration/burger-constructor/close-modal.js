export const closeModal = () =>
  it('close the modal window', function () {
    cy.get('[class^=modal_closeIcon__]').click();
    cy.get('[class^=modal]').should('not.exist');
  });
