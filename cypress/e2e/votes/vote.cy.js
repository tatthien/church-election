describe('testing vote', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5555')
  })

  it('can add new candidates', () => {
    const newCandidate = 'John Doe'
    cy.get('[data-test=new-candidate]').type(`${newCandidate}{enter}`)

    cy.get('[data-test=candidate-list] [data-test=candidate-item]')
      .should('have.length', 1)
      .last()
      .should('have.text', newCandidate)

    cy.get('table tbody tr')
      .should('have.length', 1)
      .last()
      .find('td:nth-child(2)')
      .should('have.text', newCandidate)
  })

  it('can upvote and downvote', () => {
    const newCandidate = 'John Doe'
    cy.get('[data-test=new-candidate]').type(`${newCandidate}{enter}`)

    cy.get('[data-test=candidate-list] [data-test=candidate-item]')
      .as('item')
      .find('input').should('have.value', 0)

    cy.get('[aria-label="Downvote by one"]').as('downvote').should('have.attr', 'disabled')

    cy.get('[aria-label="Upvote by one"]').as('upvote').click()

    cy.get('@item').find('input').should('have.value', '1')

    cy.get('@downvote').click()

    cy.get('@item').find('input').should('have.value', '0')
  })

  it('can populate example data', () => {
    cy.contains('Nạp dữ liệu mẫu').click()
    cy.get('[data-test=candidate-list] [data-test=candidate-item]')
      .should('have.length', 4)
  })

  it('can delete all candidates', () => {
    cy.contains('Nạp dữ liệu mẫu').click()
    cy.contains('Xóa dữ liệu').click()
    cy.get('.mantine-Modal-body p').should('have.text', 'Bạn có chắc muốn xóa hết dữ liệu? Hành động này không thể khôi phục.')
    cy.get('.mantine-Modal-body button:last').click()
    cy.get('[data-test=candidate-list] [data-test=candidate-item]')
      .should('have.length', 0)
  })

  // it('can delete a candidate', () => {
  //   const newCandidate = 'John Doe'
  //   cy.get('[data-test=new-candidate]').type(`${newCandidate}{enter}`)
  //   cy.get('[data-test=candidate-item]')
  //     .first()
  //     .find('[aria-haspopup=menu]')
  //     .click()
  // })
})
