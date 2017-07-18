import faker from 'faker';
import url from './config';

const title = faker.lorem.words();

module.exports = {
  'Create document': (browser) => {
    browser
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
      .click('#newdocument')
      .pause(1000)
      .setValue('input[id="title"]', `${title}`)
      .execute('CKEDITOR.instances.content.setData("My Content")')
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
      .execute('CKEDITOR.instances.content.setData("My Content is updted")')
      .pause(1000)
      .click('select[id=access] option[value=private]')
      .pause(1000)
      .click('button')
      .pause(1000)
      .click('#delete-doc')
      .pause(1000)
      .click('.confirm')
      .pause(1000)
      .click('.confirm')
      .pause(1000)
      .click('#logout')
      .pause(3000)
      .assert.containsText('div', 'Welcome to Doc-mgt.')
      .pause(1000)
      .end();
  }
};
