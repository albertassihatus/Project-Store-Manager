const { expect } = require("chai");
const sinon = require("sinon");
const { productModel } = require("../../../src/models");
const chai = require("chai");
const { products } = require("../mocks/productMock");
const { productService } = require("../../../src/services");
const { nameValidate } = require("../../../src/middlewares/productsValidations");
const { createProduct } = require("../../../src/services/product.service");

describe("Verificar o Service", function () {
  afterEach(sinon.restore);

  describe("Verifica se é retornado uma lista com todos os produtos", function () {
    it("Listando os produtos", async function () {
      sinon.stub(productModel, "getAll").resolves(products);
      const result = await productService.getAllProduct();

      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(products);
    });

    it("Verifica se os produtos são listados pelo ID", async function () {
      sinon.stub(productModel, "getById").resolves(products[0]);
      const result = await productService.getProductById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(products[0]);
    });
  });
    describe("Cadastro de um produto com nome válido", function () {
      it("retorna o ID do produto cadastrado", async function () {
        sinon.stub(productModel, "newProduct").resolves([{ insertId: 1 }]);
        sinon.stub(productModel, "getById").resolves(products[0]);

        const result = await createProduct(nameValidate);

        expect(result.type).to.equal(null);
        expect(result.message).to.deep.equal(products[0]);
      });
    });
});
