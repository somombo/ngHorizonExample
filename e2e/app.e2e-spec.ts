import { NgHorizonPage } from './app.po';

describe('ng-horizon App', () => {
  let page: NgHorizonPage;

  beforeEach(() => {
    page = new NgHorizonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
