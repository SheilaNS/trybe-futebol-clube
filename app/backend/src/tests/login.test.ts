import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import UserModel from "../database/models/user";
import TokenService from "../services/tokenService";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

const userInfo = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
};

const loginResult = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2MTk3MzIxOX0.WJwxnS6DTObh83H1ArdhAXGmL-_7taQILaeum06C7Qw",
};

const loginValidData = {
  email: "admin@admin.com",
  password: "secret_admin",
};

const loginInvalidData = [
  {
    email: "admin@admin.com",
    password: "secretAdmin",
  },
  {
    email: "",
    password: "secret_admin",
  },
  {
    email: "admin@admin.com",
    password: "",
  },
];

describe("Rota /login", () => {
  let chaiHttpResponse: Response;
  describe("POST /login feito com sucesso", () => {
    beforeEach(async () => {
      sinon.stub(UserModel, "findOne").resolves(userInfo as UserModel);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("retorna status 200", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post("/login")
        .send(loginValidData);

      expect(chaiHttpResponse.status).to.be.eq(200);
    });

    it("retorna um token", () => {
      expect(chaiHttpResponse.body).to.have.property("token");
    });
  });
});
