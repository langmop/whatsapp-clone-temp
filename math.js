const calcTotalTip = function (total, tipPercent = 10) {
  const tip = total * (tipPercent / 100);

  return tip + total;
};

module.exports = calcTotalTip;
