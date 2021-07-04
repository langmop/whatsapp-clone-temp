const request = require("supertest");

const app = require("../server");

const User = require("../model/user");

const user = {
  username: "narrowstring@gmail.com",
  name: "Gaurav",
};

// beforeEach(async function () {
//   await User.deleteMany({});
// });

test("checking if user is created", async function () {
  await request(app).post("/api/user").type("form").send(user).expect(200);
});
// test("checking home page ", async function () {
//   await request(app).get("/").expect(200);
// });

// // test("checking if user get initial page but cookie is not set", async function () {
// //   await request(app).get("/api/user").expect(302);
// // });

// test("checking if user get initial page but cookie is set ", async function () {
//   await request(app).get("/api/user").expect(200);
// });

test("showing all contacts when the application start with email", async function () {
  await request(app)
    .post("/api/user/show")
    .send({
      username: "narrowstring@gmail.com",
    })
    .type("form")
    .expect(200);
});

test("showing all contacts when the application start with wrong or no email", async function () {
  await request(app)
    .post("/api/user/show")
    .type("form")
    .send({
      username: "narrowstring1@gmail.com",
    })
    .expect(404);
});

test("getting chat on req with valid sender and receiver", async function () {
  await request(app)
    .post("/api/user/showChat")
    .type("form")
    .send({
      sender: "mishragaurav656@gmail.com",
      receiver: "narrowstring@gmail.com",
    })
    .expect(200);
});

test("getting chat on req with valid wrong sender and wrong receiver", async function () {
  await request(app)
    .post("/api/user/showChat")
    .type("form")
    .send({
      sender: "mishragaura2v656@gmail.com",
      receiver: "narrowstring@gmail.com",
    })
    .expect(404);
});

test("add contact to chat when user is not there", async function () {
  await request(app)
    .post("/api/user/add")
    .type("form")
    .send({
      contact: "mishrag23aurav656@gmail.com",
    })
    .expect(404);
});
