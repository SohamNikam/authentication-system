class LoginHandler {
  async login(ctx) {
    console.log("Inside login handler()", ctx.request.body);

    ctx.body = {
      message: "Login API working",
      data: ctx.request.body
    };
  }
}

module.exports = {
  login: (new LoginHandler()).login
};