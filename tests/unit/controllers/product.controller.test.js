const chai = require("chai");
const sinon = require("sinon");
const { productService } = require("../../../src/services");
chai.use(require("sinon-chai"));
const { productController } = require("../../../src/controllers");
const { products, newProduct } = require("../mocks/productMock");

const { expect } = chai;

describe("Verificar o Controller", function () {
  afterEach(sinon.restore);

  it("Verifica se é retornado uma resposta de status 200 e todos os produtos", async function () {
    sinon
      .stub(productService, "getAllProduct")
      .resolves({ type: null, message: products });
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it("Verifica se é retornado uma resposta de status 200 e um produto através do ID", async function () {
    sinon
      .stub(productService, "getProductById")
      .resolves({ type: null, message: products[0] });
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
      .resolves({ type: "error", message: "Product not found" });
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

  it("Cadastrando um novo Produto", async function () {
    const res = {};
    const req = { body: newProduct };;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, "createProduct")
      .resolves({ type: null, message: newProduct });

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });
  
});
