const { expect } = require("chai");
const sinon = require("sinon");
const { productModel } = require("../../../src/models");
const connection = require("../../../src/models/connection");
const { products, newProduct } = require("../mocks/productMock");

describe("Verificar o Model", function () {
  afterEach(sinon.restore);

  it("Verifica se é retornado uma lista com todos os produtos", async function () {
    sinon.stub(connection, "execute").resolves([products]);

    const result = await productModel.getAll();

    expect(result).to.be.deep.equal(products);
  });

  it("Verifica se é possivel buscar um produto através do ID", async function () {
    sinon.stub(connection, "execute").resolves([[products[0]]]);

    const result = await productModel.getById(1);

    expect(result).to.be.deep.equal(products[0]);
  });

  it("Verifica se é possivel cadastrar um produto", async function () {
    sinon.stub(connection, "execute").resolves([{ insertId: 4}]);
    const result = await productModel.newProduct(newProduct);
    expect(result).to.equal(4);
  });
  });