Cypress.Commands.add('createUniqueCode', (uniqueCode) => {
  createUniqueCode(uniqueCode)
})

function createUniqueCode(uniqueCode) {
  return cy.task('query', {
    sql: `
        INSERT INTO unique_code(code, status, app_type, create_time) VALUES(?, ?, ?, ?);
    `,
    values: [uniqueCode, 'NEW', 'IOS', new Date().toISOString().slice(0, 19).replace('T', ' ')]
  })
}

Cypress.Commands.add('cleanUniqueCode', (uniqueCode) => {
  cleanUniqueCode(uniqueCode)
})

Cypress.Commands.add('cleanUser', (userName)=>{
  cy.task('query', {
    sql: `delete from jhi_user_authority where user_id = 
    (select id from jhi_user where login = ?)`,
    values: [userName]
  })
  cy.task('query', {
    sql: `delete from jhi_user where login = ?`,
    values: [userName]
  })
})

Cypress.Commands.add('updateParticipantStatus', (participantId, status)=>{
  updateParticipantStatus(participantId, status)
})

function cleanUser(userName){

}

function updateParticipantStatus(participantId, status){
  cy.task('query', {
    sql: `update participant set status=? where participant_id=?`,
    values: [participantId, status]
  })
}

function cleanUniqueCode(uniqueCode) {
  cy.task('query', {
    sql: `delete from participant_submodule where participant_id = 
    (select id from participant where unique_code_id = (select id from unique_code where code = ?))`,
    values: [uniqueCode]
  })
  cy.task('query', {
    sql: `delete from participant_module where participant_id = 
    (select id from participant where unique_code_id = (select id from unique_code where code = ?))`,
    values: [uniqueCode]
  })
  cy.task('query', {
    sql: `delete from participant where unique_code_id = (select id from unique_code where code = ?)`,
    values: [uniqueCode]
  })
  cy.task('query', {
    sql: `delete from unique_code where code = ?`,
    values: [uniqueCode]
  })
}

Cypress.Commands.add('updateAccountResetKey', (email, key) =>{
  return cy.task('query', {
    sql: `
            UPDATE jhi_user
            SET reset_key = ?, reset_date = ?
            WHERE email = ?
        `,
    values: [key, new Date().toISOString().slice(0, 19).replace('T', ' '), email]
  })
})