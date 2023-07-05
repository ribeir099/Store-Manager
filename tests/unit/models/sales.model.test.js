const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/db/connection');

const { salesModel } = require('../../../src/models');
//const { sale } = require('../mocks/sales.mock');

describe('Testes de unidade do model de sales', function () {
  it('Cadastrando uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await salesModel.insert();

    expect(result).to.be.equal(1);
  })

  afterEach(function () {
    sinon.restore();
  });
});