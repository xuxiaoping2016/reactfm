import qs from 'qs';
import pathToRegexp from 'path-to-regexp';
import history from './history';

const pathPrefix = '/app/:pid/:storeId';

export const ROOT = pathPrefix;
export const GOODS_LIST = `${pathPrefix}/goods/list`;
export const GOODS_EDIT = `${pathPrefix}/goods/edit/:id`;
export const GOODS_DETAIL = `${pathPrefix}/goods/detail/:id`;
export const GOODS_IMPORT = `${pathPrefix}/goods/import`;
export const DISTRIBUTION_LIST = `${pathPrefix}/distribution/list`;
export const DISTRIBUTION_CREATE = `${pathPrefix}/distribution/create/:id?`;
export const STOCK = `${pathPrefix}/stock`;
export const FREIGHT_TEMPLATE = `freight/template`;
export const FREIGHT_TEMPLATE_LIST = `${pathPrefix}/${FREIGHT_TEMPLATE}/list`;
export const FREIGHT_TEMPLATE_ADD = `${pathPrefix}/${FREIGHT_TEMPLATE}/add`;
export const FREIGHT_TEMPLATE_EDIT = `${pathPrefix}/${FREIGHT_TEMPLATE}/edit/:templateId?`;

export const ORDER_LIST = `${pathPrefix}/order/list`;
export const ORDER_DELIVER = `${pathPrefix}/order/deliver`;
export const ORDER_DETAIL = `${pathPrefix}/order/detail`;
// 维权列表
export const PERMISSION_LIST = `${pathPrefix}/permission/list`;
export const PERMISSION_DETAIL = `${pathPrefix}/permission/detail`;
// 资质审核
export const QUALIFICATION_APPLY = `${pathPrefix}/qualification/apply`;
export const QUALIFICATION_MINE = `${pathPrefix}/qualification/mine`;
export const QUALIFICATION_EDIT = `${pathPrefix}/qualification/edit`;

export const FINANCE_ACCOUNT = `${pathPrefix}/finance/account`;
export const FINANCE_REFUND = `${pathPrefix}/finance/refund`;
export const FINANCE_WITHDROWPORT = `${pathPrefix}/finance/withdrawport`;
export const FINANCE_DEALPORT = `${pathPrefix}/finance/dealport`;
export const FINANCE_ACCOUNT_EDIT = `${pathPrefix}/finance/accountedit`;

export const HOME = `${pathPrefix}/home`;

const {
  location: { pathname },
} = history;

const pid = pathname.split('/')[2];
const storeId = pathname.split('/')[3];

const fillPath = path => {
  const formatted = path.replace(/:pid/, pid).replace(/:storeId/, storeId);
  return pathToRegexp.compile(formatted);
};

const enhancedPath = func => (pathParam, queryParam = {}) =>
  `${func(pathParam)}${qs.stringify(queryParam, { addQueryPrefix: true })}`;

export const goodsListPath = enhancedPath(fillPath(GOODS_LIST));
export const goodsImportPath = enhancedPath(fillPath(GOODS_IMPORT));
export const goodsDetailPath = enhancedPath(fillPath(GOODS_DETAIL));
export const goodsEditPath = enhancedPath(fillPath(GOODS_EDIT));

// distribution
export const distributionListPath = enhancedPath(fillPath(DISTRIBUTION_LIST));
export const distributionCreatePath = enhancedPath(
  fillPath(DISTRIBUTION_CREATE)
);

//
export const freightTemplateEditPath = enhancedPath(
  fillPath(FREIGHT_TEMPLATE_EDIT)
);
export const freightTemplateAddPath = enhancedPath(
  fillPath(FREIGHT_TEMPLATE_ADD)
);

// 订单管理
export const orderListPath = enhancedPath(fillPath(ORDER_LIST));
export const orderDeliverPath = enhancedPath(fillPath(ORDER_DELIVER));
export const orderDetailPath = enhancedPath(fillPath(ORDER_DETAIL));
export const permissionListPath = enhancedPath(fillPath(PERMISSION_LIST));
export const permissionDetailtPath = enhancedPath(fillPath(PERMISSION_DETAIL));

// 资质审核
export const qualificationEditPath = enhancedPath(fillPath(QUALIFICATION_EDIT));
export const qualificationApplyPath = enhancedPath(
  fillPath(QUALIFICATION_APPLY)
);
export const qualificationMinePath = enhancedPath(fillPath(QUALIFICATION_MINE));

export const financeAcountPath = enhancedPath(fillPath(FINANCE_ACCOUNT));
export const financeAcountEditPath = enhancedPath(
  fillPath(FINANCE_ACCOUNT_EDIT)
);
export const financeRefundPath = enhancedPath(fillPath(FINANCE_REFUND));
export const financeDealportPath = enhancedPath(fillPath(FINANCE_DEALPORT));
export const financeWithdrawportPath = enhancedPath(
  fillPath(FINANCE_WITHDROWPORT)
);
