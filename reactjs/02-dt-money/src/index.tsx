/* eslint no-use-before-define: "off" */
import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'income',
          category: 'Desenvolvimento',
          amount: 6000,
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'outcome',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date(),
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => this.schema.all('transaction'));

    this.post('/transactions', (schema, request) => {
      const body = JSON.parse(request.requestBody);

      return schema.create('transaction', { ...body, createdAt: new Date() });
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
