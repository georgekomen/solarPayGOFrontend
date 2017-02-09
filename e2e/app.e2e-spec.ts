import { SunamifrontPage } from './app.po';

describe('sunamifront App', function() {
  let page: SunamifrontPage;

  beforeEach(() => {
    page = new SunamifrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
