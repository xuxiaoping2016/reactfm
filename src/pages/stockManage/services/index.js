import request from 'utils/request';

export const fetchStockList = query =>
  request.post(`/api/supplier/stock/list`, {
    body: query,
  });

export const updateSkuStock = data =>
  request.post(`/api/supplier/stock/edit`, {
    body: data,
  });
