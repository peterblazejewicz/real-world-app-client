import { Ang2ConduitPage } from './app.po';

describe('ang2-conduit App', function() {
  let page: Ang2ConduitPage;

  beforeEach(() => {
    page = new Ang2ConduitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
