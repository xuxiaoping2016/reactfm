import request from 'utils/request';
import { tranverse, toTree } from 'utils/treeTransform';
import createSelect from './createSelect';
import createCascader from './createCascader';
import createAutoEnums from './createAutoEnums';

export const GoodsCategoryCascader = createCascader(() =>
  request('/api/supplier/goods/selectCategoryTree', {
    method: 'POST',
  }).then(({ data: { subCategoryList: data } }) => {
    const format = {
      children: 'subCategoryList',
    };
    tranverse(data, format)(item => {
      item.label = item.categoryName;
      item.value = item.categoryCode;
      item.children = item.subCategoryList;
    });
    return [{ label: '商品类目', value: '', isLeaf: true }, ...data];
  })
);

export const PureGoodsCategoryCascader = createCascader(() =>
  request('/api/supplier/goods/selectCategoryTree', {
    method: 'POST',
  }).then(({ data: { subCategoryList: data } }) => {
    const format = {
      children: 'subCategoryList',
    };
    tranverse(data, format)(item => {
      item.label = item.categoryName;
      item.value = item.categoryCode;
      item.children = item.subCategoryList;
    });
    return data;
  })
);

export const ExpressCompanySelect = createSelect(() =>
  request(
    '/api/supplier/order/query_express_companys',
    {
      method: 'POST',
    },
    true
  ).then(({ data }) => data)
);

export const AllFreightTemplatesSelect = createSelect(() =>
  request(
    `/api/supplier/freight/template/all`,
    {
      method: 'POST',
    },
    true
  ).then(res => res.data)
);

const ecGoodsCategoryItemHanler = item => {
  item.label = item.title;
  item.value = item.id;
  item.isLeaf = false;
};
export const EcGoodsCategoryCascader = createCascader(
  () =>
    request(
      `/api/supplier/goods/getEcCategories`,
      {
        method: 'POST',
      },
      true
    ).then(res => {
      const options = res.data.categoryInfoDtos;
      options.forEach(ecGoodsCategoryItemHanler);
      return [{ label: '商品类目', value: '', isLeaf: true }, ...options];
    }),
  categoryId =>
    request(
      `/api/supplier/goods/getEcCategoriesByParentId`,
      {
        method: 'POST',
        data: { id: categoryId },
      },
      true
    ).then(res => {
      const options = res.data.categoryInfoDtos;
      if (!(Array.isArray(options) && options.length)) {
        return options;
      }
      options.forEach(ecGoodsCategoryItemHanler);
      return options;
    })
);

export const AreasCascader = createCascader(() =>
  request('/api/supplier/area/queryAllAreaInfo', {
    method: 'POST',
  }).then(res => {
    let data = res.data || {};
    data = data.firstAreaInfoVo || [];
    const format = { children: 'children' };
    tranverse(data, format)(item => {
      item.label = item.areaName;
      item.value = item.areaCode;
    });
    return data;
  })
);

export const IndustriesSelect = createSelect(() =>
  request('/api/supplier/aptitude/query_category_tree', {
    method: 'GET',
  }).then(({ code, data }) => {
    if (code != 0) {
      return [];
    }
    // console.log(JSON.parse(JSON.stringify(data)))
    const format = { children: 'subCategoryList' };
    const list = data.subCategoryList;
    tranverse(list, format)(item => {
      if (item.level < 3) {
        item.label = item.categoryName;
        item.value = item.categoryCode;
        item.children = item.subCategoryList;
      } else {
        delete item.subCategoryList;
      }
    });
    return list;
  })
);

export const enums = {
  goodsCategoryCascader: GoodsCategoryCascader.store,
  expressCompanySelect: ExpressCompanySelect.store,
  allFreightTemplatesSelect: AllFreightTemplatesSelect.store,
  areasCascader: AreasCascader.store,
  industriesSelect: IndustriesSelect.store,
};

export const AutoEnums = createAutoEnums(enums);
