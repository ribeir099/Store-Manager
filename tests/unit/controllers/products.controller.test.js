const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
chai.use(chaiHttp);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { products, product } = require('../mocks/products.mock');
const { mapError } = require('../../../src/utils/errorMap');


describe('Testes de unidade do controller de produtos', function () {
  describe('Testando a leitura de produtos', function () {
    it('Recuperando a lista de todos os produtos', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findAll')
        .resolves({ type: null, message: products });

      await productsController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });

    it('Recuperendo um produto a partir de um ID válido', async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById')
        .resolves({ type: null, message: products[0] });

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products[0]);
    });

    it('Recuperendo um produto a partir de um ID inválido', async function () {
      const req = {
        params: {
          id: 10,
        },
      };
      const res = {};
      const invalidIdResponse = {
        type: 'NOT_FOUND',
        message: 'Product not found',
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById')
        .resolves(invalidIdResponse);

      await productsController.getById(req, res);

      expect(res.status).to.have.been.calledWith(mapError(invalidIdResponse.type));
      expect(res.json).to.have.been.calledWith({ message: invalidIdResponse.message });
    });

    describe('Testando a inserção de produtos', function () {
      it('Cadastrando um novo produto válido', async function () {
        const req = {
          body: {
            name: "ProdutoX",
          },
        };
        const res = {};

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'insert')
          .resolves({ type: null, message: product });

        await productsController.create(req, res);

        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(product);
      });

      it('Cadastrando um novo produto sem nome', async function () {
        const req = {
          body: {},
        };
        const res = {};
        const invalidIdResponse = {
          type: 'REQUIRED_FIELD',
          message: '"name" is required',
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'insert')
          .resolves(invalidIdResponse);

        await productsController.create(req, res);

        expect(res.status).to.have.been.calledWith(mapError(invalidIdResponse.type));
        expect(res.json).to.have.been.calledWith({ message: invalidIdResponse.message });
      });

      it('Cadastrando um novo produto com nome inválido', async function () {
        const req = {
          body: {},
        };
        const res = {};
        const invalidIdResponse = {
          type: 'INVALIDE_SIZE',
          message: '"name" length must be at least 5 characters long',
        };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(productsService, 'insert')
          .resolves(invalidIdResponse);

        await productsController.create(req, res);

        expect(res.status).to.have.been.calledWith(mapError(invalidIdResponse.type));
        expect(res.json).to.have.been.calledWith({ message: invalidIdResponse.message });
      });
    });
  })
  

  afterEach(function () {
    sinon.restore();
  });
});