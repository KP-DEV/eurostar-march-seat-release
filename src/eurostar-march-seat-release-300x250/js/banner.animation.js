'use strict';

/**
 * Run the animation functions.
 */
Banner.prototype.start = function () {
  this.banner = document.querySelector('.banner');

  this.bannerWidth = this.banner.offsetWidth;
  this.bannerHeight = this.banner.offsetHeight;

  // Image array for preloading
  this.images = [
    'images/logo.png',
    'images/bg.jpg',
    'images/copy.png',
    'images/cta.png',
    'images/e-cover.png',
    'images/image.jpg',
    'images/legal.png',
    'images/logo.png',
    'images/seats.png',
    'images/price.png',
    'images/title.png'
  ];

  var _this = this;
  this.preloadImages(this.images, function () {
    _this.createElements();
    _this.setup();
    _this.hidePreloader();
    _this.animate();
    _this.bindEvents();
  });
};

/**
 * Create dom elements.
 */
Banner.prototype.createElements = function () {

  this.img = this.smartObject({
    id: 'IMG',
    backgroundImage: 'images/image.jpg',
    parent: this.banner
  });

  this.copy = this.smartObject({
    id: 'COPY',
    top: 'none',
    left: 'none',
    backgroundImage: 'images/copy.png',
    parent: this.banner
  });

  this.bg = this.smartObject({
    id: 'BG',
    left: 'none',
    parent: this.banner
  });

    this.bg1 = this.smartObject({
      id: 'BG1',
      backgroundImage: 'images/bg.jpg',
      parent: this.bg
    });

    this.bg2 = this.smartObject({
      id: 'BG2',
      left: 'none',
      backgroundImage: 'images/bg.jpg',
      parent: this.bg
    });

  this.eCover = this.smartObject({
    id: 'E-COVER',
    left: 'none',
    backgroundImage: 'images/e-cover.png',
    parent: this.banner
  });

  this.title = this.smartObject({
    id: 'TITLE',
    backgroundImage: 'images/title.png',
    parent: this.banner
  });

  this.seats = this.smartObject({
    id: 'SEATS',
    backgroundImage: 'images/seats.png',
    parent: this.banner
  });

  this.price = this.smartObject({
    id: 'PRICE',
    backgroundImage: 'images/price.png',
    parent: this.banner
  });

  this.cta = this.smartObject({
    id: 'CTA',
    top: 'none',
    backgroundImage: 'images/cta.png',
    parent: this.banner
  });

  this.legal = this.smartObject({
    id: 'LEGAL',
    top: 'none',
    backgroundImage: 'images/legal.png',
    parent: this.banner
  });

  this.logo = this.smartObject({
    id: 'LOGO',
    top: 'none',
    backgroundImage: 'images/logo.png',
    parent: this.banner
  });
};

/**
 * Setup initial element states.
 */
Banner.prototype.setup = function () {
  this.eCover.center();
  this.bg.set({ right: -150});
  this.bg2.set({ right: '+=300'});
  this.copy.set({ bottom: 13, right: 17});
  this.title.centerHorizontal();
  this.title.set({ top: 24});
  this.price.centerHorizontal();
  this.price.set({ top: 85});
  this.seats.centerHorizontal();
  this.seats.set({ top: 86, autoAlpha: 0});
  this.cta.centerHorizontal();
  this.cta.set({ bottom: 73});
  this.legal.centerHorizontal();
  this.legal.set({ bottom: 54});
  this.logo.centerHorizontal();
  this.logo.set({ bottom: 12});

};

/**
 * Hide the preloader.
 */
Banner.prototype.hidePreloader = function () {
  TweenLite.to('.preloader', 1, { autoAlpha: 0 });
};

/**
 * Card flip setup.
 */
Banner.prototype.setupFlip = function (front, back) {
  let timeline = new TimelineMax({paused: true})
    .addLabel('start')
    .set(front, {autoAlpha:1})
    .set(back, {autoAlpha:1, rotationX:-90})
    .to(front, 0.3, {rotationX:90, ease:Linear.easeNone},'hide-front')
    .to(back, 0.3, {rotationX:0, ease:Linear.easeNone}, 'show-back');
    timeline.timeScale(1)
    return timeline;
};

/**
 * Animation timeline.
 */
Banner.prototype.animate = function () {
  var _this = this;

  this.timeline = new TimelineLite({paused: false})
    .to([this.eCover, this.bg], 1, {x: '+=300'}, '+=2')
    .from(this.copy, 1, {autoAlpha: 0}, '-=1')
    .to([this.bg, this.eCover], 1.5, {x: '-=600'}, 'yellow+=1')
    .from(this.logo, 1.5, {autoAlpha: 0, x: '+=600'}, 'yellow+=1')
    .from(this.title, 1, {autoAlpha: 0})
    .from(this.price, 1, {autoAlpha: 0})
    .from(this.cta, 1, {autoAlpha: 0}, 'cta-=0.5')
    .from(this.legal, 1, {autoAlpha: 0}, 'cta-=0.5')
    .add( this.setupFlip(this.price, this.seats).play(), '+=1')
    .add( this.setupFlip(this.seats, this.price).play(), '+=2')

};
