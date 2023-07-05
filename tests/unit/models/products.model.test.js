const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');

const { productsModel } = require('../../../src/models');
const { products } = require('../mocks/products.mock');

describe('Testes de unidade do model de produtos', function () {
  it('Recuperando a lista de todos os produtos', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products]);
    // Act
    const result = await productsModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(products);
  });

  it('Recuperendo um produto a partir do ID', async function (){
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    // Act
    const result = await productsModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });

  it('Cadastrando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 4}]);

    const result = await productsModel.insert("ProdutoX");

    expect(result).to.be.equal(4);
  })

  afterEach(function () {
    sinon.restore();
  });
});