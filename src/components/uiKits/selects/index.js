import request from 'utils/request';
import { tranverse, formatTree } from 'utils/treeTransform';
import createSelect from './createSelect';
import createCascader from './createCascader';
import createAutoEnums from './createAutoEnums';

const selectCategoryTreeFormat = {
  key: { from: 'categoryCode', to: 'value' },
  title: { from: 'categoryName', to: 'label' },
  children: { from: 'subCategoryList', to: 'children' },
};

export const GoodsCategoryCascader = createCascader(() =>
  request
    .post('/api/supplier/goods/selectCategoryTree')
    .then(({ data: { subCategoryList } }) => {
      const list = formatTree(subCategoryList, selectCategoryTreeFormat);
      return [{ label: '商品类目', value: '', isLeaf: true }, ...list];
    })
);

export const PureGoodsCategoryCascader = createCascader(() =>
  request
    .post('/api/supplier/goods/selectCategoryTree')
    .then(({ data: { subCategoryList } }) =>
      formatTree(subCategoryList, selectCategoryTreeFormat)
    )
);

export const ExpressCompanySelect = createSelect(() =>
  request.post('/api/supplier/order/query_express_companys').then(res => {
    if (res.code !== 0)
      return [{ deliveryCompanyName: 'tian', deliveryCompanyCode: 888 }];
    return res.data;
  })
);

export const AllFreightTemplatesSelect = createSelect(() =>
  request.post(`/api/supplier/freight/template/all`).then(res => res.data)
);

const ecGoodsCategoryItemHanler = item => {
  /* eslint-disable */
  item.label = item.title;
  item.value = item.id;
  item.isLeaf = false;
  /* eslint-disable */
};
export const EcGoodsCategoryCascader = createCascader(
  () =>
    request.post(`/api/supplier/goods/getEcCategories`).then(res => {
      const options = res.data.categoryInfoDtos;
      options.forEach(ecGoodsCategoryItemHanler);
      return [{ label: '商品类目', value: '', isLeaf: true }, ...options];
    }),
  categoryId =>
    request
      .post(
        `/api/supplier/goods/getEcCategoriesByParentId`,
        {
          body: { id: categoryId },
        },
        true
      )
      .then(res => {
        const options = res.data.categoryInfoDtos;
        if (!(Array.isArray(options) && options.length)) {
          return options;
        }
        options.forEach(ecGoodsCategoryItemHanler);
        return options;
      })
);

export const AreasCascader = createCascader(() =>
  request.post('/api/supplier/area/queryAllAreaInfo').then(res => {
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
  request
    .get('/api/supplier/aptitude/query_category_tree')
    .then(({ code, data }) => {
      if (code !== 0) {
        return [];
      }
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
