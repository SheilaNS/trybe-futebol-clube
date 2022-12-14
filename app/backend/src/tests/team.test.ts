import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import TeamModel from "../database/models/team";

import { Response } from "superagent";

chai.use(chaiHttp);

const { expect } = chai;

const teamList = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
  {
    "id": 5,
    "teamName": "Cruzeiro"
  },
  {
    "id": 6,
    "teamName": "Ferroviária"
  },
  {
    "id": 7,
    "teamName": "Flamengo"
  },
  {
    "id": 8,
    "teamName": "Grêmio"
  },
  {
    "id": 9,
    "teamName": "Internacional"
  },
  {
    "id": 10,
    "teamName": "Minas Brasília"
  },
  {
    "id": 11,
    "teamName": "Napoli-SC"
  },
  {
    "id": 12,
    "teamName": "Palmeiras"
  },
  {
    "id": 13,
    "teamName": "Real Brasília"
  },
  {
    "id": 14,
    "teamName": "Santos"
  },
  {
    "id": 15,
    "teamName": "São José-SP"
  },
  {
    "id": 16,
    "teamName": "São Paulo"
  }
]

describe("Rota /teams", () => {
  let chaiHttpResponse: Response;
  describe("GET /teams feito com sucesso", () => {
    beforeEach(async () => {
      sinon.stub(TeamModel, "findAll").resolves(teamList as TeamModel[]);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("retorna status 200", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/teams");

      expect(chaiHttpResponse.status).to.be.eq(200);
    });

    it("retorna um array de objetos", async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get("/teams");

      expect(chaiHttpResponse.body).to.be.deep.eq(teamList);
    });
  });

  describe("GET /teams/:id feito com sucesso", () => {
    beforeEach(async () => {
      sinon.stub(TeamModel, "findByPk").resolves(teamList[0] as TeamModel);
    });

    afterEach(() => {
      sinon.restore();
    });

    it("retorna status 200", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/teams/1");

      expect(chaiHttpResponse.status).to.be.eq(200);
    });

    it("retorna um objeto do time de id 1", async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get("/teams/1");

      expect(chaiHttpResponse.body).to.be.deep.eq(teamList[0]);
    });
  });

  describe("GET /teams/:id feito sem sucesso", () => {
    beforeEach(async () => {
      sinon.stub(TeamModel, "findByPk").resolves();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("retorna status 404", async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get("/teams/99");

      expect(chaiHttpResponse.status).to.be.eq(404);
    });

    it("retorna uma mensagem de erro", async () => {
      chaiHttpResponse = await chai
      .request(app)
      .get("/teams/99");

      expect(chaiHttpResponse.body).to.have.property('message');
    });
  });
});
