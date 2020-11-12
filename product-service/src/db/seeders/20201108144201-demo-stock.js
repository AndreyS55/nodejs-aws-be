'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Stocks', [
       {
         id: '90bf4e94-c2e8-4860-b0df-cd62dbc1d2e6',
         count: 4,
         productId: '51e8d8bc-df5c-4dc7-a4e9-9d704dcf3934',
       },
       {
         id: '566ea66e-e5bf-4f12-a3d0-511bf53c3135',
         count: 6,
         productId: 'ce826919-bc60-4f5a-aa06-87b0fd3912b8',
       },
       {
         id: '1f55607d-2472-4087-b81c-d59d31b7a8d5',
         count: 7,
         productId: '7545e8e1-18fc-4f62-8500-1d714375e3d2',
       },
       {
         id: '94a931de-b648-4f95-aa82-e1d1460a078e',
         count: 12,
         productId: 'cc8c3759-3dd3-44c6-bb8a-d984c3276e0c',
       },
       {
         id: 'a891075a-798e-4246-9917-cced597b0009',
         count: 7,
         productId: '36910a68-5150-4b49-9215-40f40046f295',
       },
       {
         id: '3039d5e2-939b-4f70-8559-c739726739e3',
         count: 8,
         productId: 'deebe831-0396-4108-9e4d-b732e586ac9e',
       },
       {
         id: '6ff29d8a-97bc-46db-9270-6f31560adabe',
         count: 2,
         productId: '450f220a-b475-4bcf-8d58-58be97162283',
       },
       {
         id: '9453d013-2dc7-470f-a068-127d7dbfbf58',
         count: 3,
         productId: '1efabd17-97c1-485e-8ec8-fbfd1d05ee3c',
       },
       {
         id: '66a322cf-e5dd-4f66-92fc-aba6f0738efb',
         count: 7,
         productId: '6e04e880-bd3c-425d-8d89-9515d5073e22',
       }
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Stocks', null, {});
  }
};
