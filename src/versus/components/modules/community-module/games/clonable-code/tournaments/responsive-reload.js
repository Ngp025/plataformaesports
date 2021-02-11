var initialWidth = window.innerWidth;

function responsiveReload() {
  console.log(initialWidth);
  console.log(window.innerWidth);
  if (initialWidth > 1025) {
    var actualResponsive = 'large';
  } else {
    var actualResponsive = 'small';
  }
  actualResponsive === 'large'
    ? window.innerWidth <= 1024
      ? location.reload()
      : ''
    : window.innerWidth > 1025
    ? location.reload()
    : '';
}

module.exports = responsiveReload;
