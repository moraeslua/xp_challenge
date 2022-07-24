import * as dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.API_URL;

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Desafio Técnico XP | Backend',
    description:
      'API desenvolvida para que um usuário consiga se registrar, comprar/vender ações e ter algumas funcionalidades de conta digital como saque e depósito. Além disso, o usuário consegue obter todo o seu histórico de movimentação na conta de forma geral e também detalhes sobre seu histórico em investimentos.',
    contact: {
      name: 'Luana de Moraes',
      email: 'moraeslua66@gmail.com',
    },
  },
  servers: [
    {
      url: API_URL,
      description: 'API de produção',
    },
  ],
  paths: {
    '/assets': {
      get: {
        summary: 'Lista de ativos disponíveis',
        description:
          'Essa rota é responsavel por retornar uma lista de ativos por paginação, você pode escolher os valores para "limit" e offset", por padrão eles são "10" e "0" respectivamente',
        tags: ['Assets'],
        requestBody: {},
        parameters: [
          {
            in: 'query',
            name: 'limit',
            required: false,
            description: 'limit',
          },
          {
            in: 'query',
            name: 'offset',
            required: false,
            description: 'offset',
          },
        ],
        responses: {
          400: {
            description: 'BAD REQUEST',
          },
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  $ref: '#components/schemas/Asset',
                },
                examples: {
                  assets: {
                    value: [
                      {
                        id: 1,
                        symbol: 'FB',
                        companyName: 'Meta Platforms, Inc.',
                        price: 196.64,
                        exchange: 'NASDAQ Global Select',
                        exchangeShortName: 'NASDAQ',
                        amount: 116,
                      },
                      {
                        id: 2,
                        symbol: 'META',
                        companyName: 'Meta Platforms, Inc.',
                        price: 164.7,
                        exchange: 'NASDAQ Global Market',
                        exchangeShortName: 'NASDAQ',
                        amount: 197,
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
    '/assets/{id}': {
      get: {
        summary: 'Busca informações de um ativo por "id"',
        description:
          'Essa rota é responsavel por retornar detalhes do ativo especificado por "id"',
        tags: ['Assets'],
        requestBody: {},
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'assetId',
          },
        ],
        responses: {
          400: {
            description: 'BAD REQUEST',
          },
          404: {
            description: 'NOT FOUND',
          },
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#components/schemas/Asset',
                },
                examples: {
                  assets: {
                    value: {
                      id: 2,
                      symbol: 'META',
                      companyName: 'Meta Platforms, Inc.',
                      price: 164.7,
                      exchange: 'NASDAQ Global Market',
                      exchangeShortName: 'NASDAQ',
                      amount: 197,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/signup': {
      post: {
        summary: 'Cadastro de um novo usuário',
        description: 'Essa rota é responsável por cadastrar usuário',
        tags: ['Auth'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/SignUpRequest',
              },
              examples: {
                createAccount: {
                  value: {
                    email: 'mary@email.com',
                    fullName: 'Mary Waters',
                    birthDate: '03/05/2000',
                    password: 'marypass',
                  },
                },
              },
            },
          },
        },
        responses: {
          409: {
            description: 'CONFLICT',
          },
          400: {
            description: 'BAD REQUEST',
          },
          201: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#components/schemas/Account',
                },
              },
            },
          },
        },
      },
    },
    '/auth/signin': {
      post: {
        summary: 'Login',
        description: 'Essa rota é responsável por realizar o login do cliente',
        tags: ['Auth'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/SignInRequest',
              },
              examples: {
                login: {
                  value: {
                    email: 'mary@email.com',
                    password: 'marypass',
                  },
                },
              },
            },
          },
        },
        responses: {
          409: {
            description: 'CONFLICT',
          },
          400: {
            description: 'BAD REQUEST',
          },
          201: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#components/schemas/Account',
                },
              },
            },
          },
        },
      },
    },
    '/accounts/{id}/deposit': {
      post: {
        summary: 'Realizar depósito',
        description:
          'Essa rota permite que o cliente realize um depósito em sua conta',
        tags: ['Account'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'account id',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/DepositRequest',
              },
              examples: {
                deposit: {
                  value: {
                    value: 3000.5,
                  },
                },
              },
            },
          },
        },
        responses: {
          401: {
            description: 'UNAUTHORIZED',
          },
          400: {
            description: 'BAD REQUEST',
          },
          201: {
            description: 'CREATED',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#components/schemas/DepositResponse',
                },
              },
            },
          },
        },
      },
    },
    '/accounts/{id}/withdraw': {
      post: {
        summary: 'Realizar saque',
        description:
          'Essa rota permite que o cliente saque dinheiro de sua conta',
        tags: ['Account'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'account id',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/WithdrawRequest',
              },
              examples: {
                withdraw: {
                  value: {
                    value: 100,
                  },
                },
              },
            },
          },
        },
        responses: {
          401: {
            description: 'UNAUTHORIZED',
          },
          400: {
            description: 'BAD REQUEST',
          },
          201: {
            description: 'CREATED',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#components/schemas/WithdrawResponse',
                },
              },
            },
          },
        },
      },
    },
    '/accounts/{id}/investments': {
      get: {
        summary: 'Obter lista de investimentos do cliente',
        description:
          'Essa rota permite que o cliente consulte seus investimentos e qual o valor das ações que ele possui',
        tags: ['Account'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'account id',
          },
        ],
        requestBody: {},
        responses: {
          401: {
            description: 'UNAUTHORIZED',
          },
          400: {
            description: 'BAD REQUEST',
          },
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#components/schemas/AccountInvestmentsResponse',
                },
                examples: {
                  value: {
                    accountInvestments: {
                      accountId: 5,
                      assetId: 12,
                      amount: 10,
                      price: 30.31,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/accounts/{id}/investments/events': {
      get: {
        summary: 'Obter histórico de investimentos que o cliente já realizou',
        description:
          'Essa rota permite que o cliente consulte os detalhes e histórico de seus investimentos',
        tags: ['Account'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            id: 'path',
            name: 'id',
            required: true,
            description: 'account id',
          },
        ],
        requestBody: {},
        responses: {
          401: {
            description: 'UNAUTHORIZED',
          },
          400: {
            description: 'BAD REQUEST',
          },
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#components/schemas/AccountInvestmentsEventsResponse',
                },
                examples: {
                  accountInvestmentEvents: {
                    value: {
                      id: 1,
                      accountId: 5,
                      assetId: 12,
                      symbol: 'PETR3.SA',
                      price: 30.31,
                      amount: 5,
                      type: 'BUY STOCK',
                      createdAt: '2022-07-21T12:40:48.511Z',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/accounts/{id}/events': {
      get: {
        summary:
          'Obter histórico de todas as movimentações do cliente em sua conta',
        description:
          'Essa rota permite que o cliente consulte o histórico geral de todas as suas movimentações na conta',
        tags: ['Account'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            id: 'path',
            name: 'id',
            required: true,
            description: 'account id',
          },
        ],
        requestBody: {},
        responses: {
          401: {
            description: 'UNAUTHORIZED',
          },
          400: {
            description: 'BAD REQUEST',
          },
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#components/schemas/AccountEvents',
                },
                examples: {
                  accountInvestmentEvents: {
                    value: {
                      accountId: 5,
                      value: 150,
                      type: 'SELL STOCK',
                      createdAt: '2022-07-21T12:40:48.511Z',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/investment/buy': {
      post: {
        summary: 'Realiza compra de um ativo',
        description:
          'Essa rota permite que o cliente realize a compra de um ativo',
        tags: ['Investment'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/BuyStockRequest',
              },
              examples: {
                buyStock: {
                  value: {
                    accountId: 5,
                    assetId: 10,
                    amount: 3,
                  },
                },
              },
            },
          },
        },
        responses: {
          401: {
            description: 'UNAUTHORIZED',
          },
          400: {
            description: 'BAD REQUEST',
          },
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#components/schemas/BuyStockResponse',
                },
                examples: {
                  buyStock: {
                    value: {
                      id: 5,
                      accountId: 1,
                      assetId: 10,
                      price: 157.62,
                      amount: 3,
                      type: 'BUY_STOCK',
                      createdAt: '2022-07-23T01:02:20.549Z',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/investment/sell': {
      post: {
        summary: 'Realiza venda de um ativo',
        description:
          'Essa rota permite que o cliente realize a venda de um ativo',
        tags: ['Investment'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/SellStockRequest',
              },
              examples: {
                sellStock: {
                  value: {
                    accountId: 5,
                    assetId: 10,
                    amount: 3,
                  },
                },
              },
            },
          },
        },
        responses: {
          401: {
            description: 'UNAUTHORIZED',
          },
          400: {
            description: 'BAD REQUEST',
          },
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: '#components/schemas/SellStockResponse',
                },
                examples: {
                  sellStock: {
                    value: {
                      id: 6,
                      accountId: 1,
                      assetId: 10,
                      price: 157.62,
                      amount: 3,
                      type: 'SELL_STOCK',
                      createdAt: '2022-07-23T01:02:20.549Z',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      GetAllAssetsRequest: {
        type: 'path',
        limit: {
          type: 'integer',
        },
        offset: {
          type: 'integer',
        },
      },
      Asset: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          symbol: {
            type: 'string',
          },
          companyName: {
            type: 'string',
          },
          exchange: {
            type: 'string',
          },
          exchangeShortName: {
            type: 'string',
          },
          amount: {
            type: 'integer',
          },
        },
      },
      Account: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          email: {
            type: 'string',
          },
          fullName: {
            type: 'string',
          },
          birthDate: {
            type: 'date',
            example: '03/05/2000',
          },
          password: {
            type: 'string',
          },
          balance: {
            type: 'number',
          },
          token: {
            type: 'string',
          },
        },
      },
      DepositRequest: {
        type: 'object',
        properties: {
          value: {
            type: 'number',
          },
        },
      },
      DepositResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          accountId: {
            type: 'number',
          },
          value: {
            type: 'number',
          },
          type: {
            type: 'string',
            enum: ['DEPOSIT'],
          },
          createdAt: {
            type: 'date',
            example: '03/05/2000',
          },
        },
      },
      WithdrawRequest: {
        type: 'object',
        properties: {
          value: {
            type: 'number',
          },
        },
      },
      WithdrawResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          accountId: {
            type: 'number',
          },
          value: {
            type: 'number',
          },
          type: {
            type: 'string',
            enum: ['WITHDRAW'],
          },
          createdAt: {
            type: 'date',
            example: '03/05/2000',
          },
        },
      },
      SignUpRequest: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
          fullName: {
            type: 'string',
          },
          birthDate: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      SignInRequest: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      AccountInvestmentsResponse: {
        type: 'object',
        properties: {
          accountId: {
            type: 'integer',
          },
          assetId: {
            type: 'integer',
          },
          amount: {
            type: 'integer',
          },
          price: {
            type: 'number',
          },
        },
      },
      AccountInvestmentsEventsResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          accountId: {
            type: 'integer',
          },
          symbol: {
            type: 'string',
          },
          assetId: {
            type: 'integer',
          },
          amount: {
            type: 'integer',
          },
          type: {
            type: 'string',
            enum: ['BUY STOCK', 'SELL STOCK'],
          },
          price: {
            type: 'number',
          },
          createdAt: {
            type: 'date-time',
            example: '2022-07-21T12:40:48.511Z',
          },
        },
      },
      AccountEvents: {
        type: 'object',
        properties: {
          accountId: {
            type: 'integer',
          },
          value: {
            type: 'numbers',
          },
          eventType: {
            type: 'string',
            enum: ['SELL STOCK', 'BUY STOCK', 'WITHDRAW', 'DEPOSIT'],
          },
        },
      },
      BuyStockRequest: {
        type: 'object',
        properties: {
          accountId: {
            type: 'integer',
          },
          assetId: {
            type: 'integer',
          },
          amount: {
            type: 'integer',
          },
        },
      },
      BuyStockResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          accountId: {
            type: 'integer',
          },
          assetId: {
            type: 'integer',
          },
          amount: {
            type: 'integer',
          },
          type: {
            type: 'string',
            enum: ['BUY STOCK'],
          },
          price: {
            type: 'number',
          },
          createdAt: {
            type: 'date-time',
            example: '2022-07-21T12:40:48.511Z',
          },
        },
      },
      SellStockRequest: {
        type: 'object',
        properties: {
          accountId: {
            type: 'integer',
          },
          assetId: {
            type: 'integer',
          },
          amount: {
            type: 'integer',
          },
        },
      },
      SellStockResponse: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          accountId: {
            type: 'integer',
          },
          assetId: {
            type: 'integer',
          },
          amount: {
            type: 'integer',
          },
          type: {
            type: 'string',
            enum: ['SELL STOCK'],
          },
          price: {
            type: 'number',
          },
          createdAt: {
            type: 'date-time',
            example: '2022-07-21T12:40:48.511Z',
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
