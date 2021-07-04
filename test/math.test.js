const math = require("../math");

test("should calculate total bill", () => {
  const total = math(100, 40);
  expect(total).toBe(140);
});

const result = async function (a, b) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

test("check the default percent tip", function () {
  const total = math(100);

  expect(total).toBe(110);
});

test("check if sum is write", async () => {
  const ans = await result(1, 2);
  expect(ans).toBe(3);
});
