const chai = require("chai");
const sinon = require("sinon");
const { productService } = require("../../../src/services");
chai.use(require("sinon-chai"));
const { productController } = require("../../../src/controllers");
const { products } = require("../mocks/productMock");

const { expect } = chai;

describe("Verificar o Controller", function () {
  afterEach(sinon.restore);

  it("Verifica se é retornado uma resposta de status 200 e todos os produtos", async function () {
    sinon.stub(productService, "getAllProduct").resolves(products);
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getAllProduct(req, res);

    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it("Verifica se é retornado uma resposta de status 200 e um produto através do ID", async function () {
    sinon.stub(productService, "getProductById").resolves(products[0]);
    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it("Verifica se é retornado uma resposta de status 404 caso o ID seja inexistente", async function () {
    sinon
      .stub(productService, "getProductById")
      .resolves({ message: "Product not found" });
    const res = {};
    const req = {
      params: {
        id: 10000,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledOnceWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Product not found" });
  });
  
});
