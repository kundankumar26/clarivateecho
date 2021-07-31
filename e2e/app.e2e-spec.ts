import { voiceBotPage } from './app.po';

describe('voiceBot App', () => {
  let page: voiceBotPage;

  beforeEach(() => {
    page = new voiceBotPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
