export const prefix = 'supplier#';
const permissions = [
  'app.stock',

  'app.goods.list',
  'app.goods.import',
  'app.goods.edit',
  'app.goods.detail',

  'app.distribution.list',
  'app.distribution.create',

  'app.freight.template.list',
  'app.freight.template.add',
  'app.freight.template.edit',

  'app.order.list',
  'app.order.deliver',
  'app.order.detail',

  'app.permission.list',
  'app.permission.detail',

  'app.qualification.edit',
  'app.qualification.mine',
  'app.qualification.apply',

  'app.finance.account',
  'app.finance.accountedit',
  'app.finance.refund',
  'app.finance.withdrawport',
  'app.finance.dealport',
];

export default permissions.map(i => prefix + i).join(';');
