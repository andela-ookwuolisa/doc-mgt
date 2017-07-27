import faker from 'faker';
import url from './config';

const title = faker.lorem.words();
const title2 = faker.lorem.words();
const existingTitle = 'vel est veniam';

module.exports = {
  'Create document': (browser) => {
    browser
      .resizeWindow(1200, 900)
      .url(url.login)
      .waitForElementVisible('body')
      .assert.containsText('div', 'Welcome to Doc-mgt.')
      .pause(1000)
      .assert.elementPresent('input[id=loginID]')
      .setValue('input[id=loginID]', 'obinna')
      .setValue('input[id=password]', 'obinna')
      .click('button')
      .pause(1000)
      .assert.urlContains('dashboard')
      .assert.elementPresent('.side-bar')
      .assert.elementPresent('.card-content')
      .pause(1000)
      .click('#newdocument')
      .pause(1000)
      .setValue('input[id="title"]', `${existingTitle}`)
      .pause(1000)
      .click('button')
      .pause(1000)
      .assert.elementPresent('.toast-error')
      .assert.containsText('.toast-error', 'Title already exist')
      .pause(1000)
      .clearValue('input[id=title]')
      .setValue('input[id="title"]', `${title}`)
      .click('button')
      .pause(1000)
      .assert.containsText('.toast-error', 'Content cannot be empty')
      .click('button')
      .pause(1000)
      .execute('CKEDITOR.instances.content.setData("My Content")')
      .click('button')
      .pause(1000)
      .assert.containsText('.toast-error', 'Access cannot be empty')
      .pause(1000)
      .click('select[id=access] option[value=public]')
      .pause(1000)
      .click('button')
      .pause(1000)
      .assert.urlContains('documents')
      .click('#mydocument')
      .pause(1000)
      .assert.urlContains('mydocument')
      .click('#viewdoc')
      .pause(1000)
      .assert.urlContains('document')
      .assert.elementPresent('#doc-title')
      .pause(1000)
      .click('#edit-doc')
      .pause(1000)
      .clearValue('input[id=title]')
      .setValue('input[id="title"]', `${existingTitle}`)
      .pause(1000)
      .click('button')
      .pause(1000)
      .assert.elementPresent('.toast-error')
      .assert.containsText('.toast-error', 'Title already exist')
      .pause(1000)
      .clearValue('input[id=title]')
      .setValue('input[id="title"]', `${title2}`)
      .pause(1000)
      .execute('CKEDITOR.instances.content.setData("My Content is updated")')
      .pause(1000)
      .click('select[id=access] option[value=private]')
      .pause(1000)
      .click('button')
      .pause(1000)
      .assert.elementPresent('.toast-success')
      .assert.containsText('.toast-success', 'successful')
      .pause(1000)
      .click('#delete-doc')
      .pause(1000)
      .click('.confirm')
      .pause(1000)
      .click('.confirm')
      .pause(1000)
      .click('#logout')
      .pause(1000)
      .assert.containsText('div', 'Welcome to Doc-mgt.')
      .pause(1000)
      .end();
  }
};
