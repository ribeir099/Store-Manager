const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { products, product } = require('../mocks/products.mock');

describe('Testes de unidade do service de produtos', function () {
  describe('Testando a leitura de produtos', function () {
    it('Recuperando a lista de todos os produtos', async function () {
      // Arrange
      sinon.stub(productsModel, 'findAll').resolves(products);
      // Act
      const result = await productsService.findAll();
      // Assert
      expect(result.message).to.be.deep.equal(products);
      expect(result.type).to.be.null;
    });

    it('Recuperendo um produto a partir de um ID válido', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves(products[0]);
      // Act
      const result = await productsService.findById(products[0].id);
      // Assert
      expect(result.message).to.be.deep.equal(products[0]);
      expect(result.type).to.be.null;
    });

    it('Recuperendo um produto a partir de um ID inválido', async function () {
      // Arrange
      sinon.stub(productsModel, 'findById').resolves();
      // Act
      const result = await productsService.findById(10);
      // Assert
      expect(result.message).to.be.equal('Product not found');
      expect(result.type).to.be.equal('NOT_FOUND');
    });
  })
  
  describe('Testando a inserção de produtos', function () {
    it('Cadastrando um novo produto válido', async function () {
      sinon.stub(productsModel, 'insert').resolves(product.id);

      const result = await productsService.insert(product.name);

      expect(result.message).to.be.deep.equal(product);
      expect(result.type).to.be.null;
    });

    it('Cadastrando um novo produto sem nome', async function () {
      sinon.stub(productsModel, 'insert').resolves();

      const result = await productsService.insert();

      expect(result.message).to.be.equal('\"name\" is required');
      expect(result.type).to.be.equal('REQUIRED_FIELD');
    });

    it('Cadastrando um novo produto com nome inválido', async function () {
      sinon.stub(productsModel, 'insert').resolves();
      
      const result = await productsService.insert("abc");

      expect(result.message).to.be.equal('\"name\" length must be at least 5 characters long');
      expect(result.type).to.be.equal('INVALIDE_SIZE');
    });
  })
  

  afterEach(function () {
    sinon.restore();
  });
});