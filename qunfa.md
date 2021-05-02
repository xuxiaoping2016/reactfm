<!--
 * @Author: xiaoping.xu
 * @Date: 2021-04-21 13:43:15
 * @LastEditors: xiaoping.xu
 * @LastEditTime: 2021-04-21 16:02:36
 * @Desc: 
-->
``` mermaid
graph TD

END[结束初始化]
    LIST[欢迎语设置列表]
        CREATE_WELCOMESPEECH[添加欢迎语]
        SEARCH_WELCOMESPEECH[根据:<br>欢迎语内容搜索]
        FILTER_WELCOMESPEECH[根据:<br>类型/更新时间过滤]
        PAGE_WELCOMESPEECH[根据:<br>分页]
        GET_WELCOMESPEECH_LISTS[拉取活动列表数据<br>HTTP: /pricing/v1.0/activity/queryActivityPage]
            WELCOMESPEECH_LISTS_ITEM(欢迎语表单<br>欢迎语内容/类型/创建人/更新时间/操作)
    
LIST-->CREATE_WELCOMESPEECH
LIST-->SEARCH_WELCOMESPEECH -->GET_WELCOMESPEECH_LISTS
LIST-->FILTER_WELCOMESPEECH -->GET_WELCOMESPEECH_LISTS
LIST-->PAGE_WELCOMESPEECH-->GET_WELCOMESPEECH_LISTS-->WELCOMESPEECH_LISTS_ITEM-->END

```

query中id是否存在判断是
``` mermaid
graph TB


EDIT_PAGE[设置欢迎语]
    IS_UPDATE{根据:<br/>否是编辑}
    GET_WELCOMESPEECH_DETAIL[拉取活动列表数据<br>HTTP: /pricing/v1.0/activity/queryActivityPage]
    INIT_FORM[初始化表单]
    BASIC_SET[基础设置]
        WELCOME_CATE[欢迎语类型:<br/>单选,必选]
        FRIEND[好友欢迎语]
            SCOPE_OF_EXECUTION[执行范围]
                ALL_STAFF[全部员工]
                PART_STAFF[部分员工]
                    STAFFS[员工名称]
        CUSTOMER[客户欢迎语]
            SYNC[同步通知到员工:<br/>本期默认:是<br/>不支持编辑]
    CONTENT_SET[内容设置]
        TIME_SLOT[按时间段]
            TIME_ALL_DAY[全天]
                WELCOME_CONTENT[欢迎语内容]
                CHOOSE_TO_ADD{选择添加:可选}
                    CHOOSE_IMG[添加图片]
                        IMG[图片url,id]
                    CHOOSE_H5[添加网页]
                        H5_CONTENT[标题:必选,链接:必选<br/>描述:可选,图片:可选]
                    CHOOSE_MINI[添加小程序]
                        MINI_CONTENT[标题:必选,链接:必选<br/>描述:可选,图片:可选]

EDIT_PAGE --> IS_UPDATE--yes-->GET_WELCOMESPEECH_DETAIL-->INIT_FORM
IS_UPDATE--No-->INIT_FORM-->BASIC_SET
INIT_FORM-->CONTENT_SET

BASIC_SET-->WELCOME_CATE-.选择.->FRIEND
WELCOME_CATE-.选择.->CUSTOMER-->SYNC

FRIEND-->SCOPE_OF_EXECUTION-.选择.->ALL_STAFF
SCOPE_OF_EXECUTION-.选择.->PART_STAFF-.点击: 弹窗选择员工.->STAFFS

CONTENT_SET-->TIME_SLOT-->TIME_ALL_DAY-->WELCOME_CONTENT
TIME_ALL_DAY-->CHOOSE_TO_ADD-.点击:图片.->CHOOSE_IMG-.点击:弹框.->IMG
CHOOSE_TO_ADD-.点击:网页.->CHOOSE_H5-->H5_CONTENT
CHOOSE_TO_ADD-.点击:小程序.->CHOOSE_MINI-->MINI_CONTENT
```

### 欢迎语新增/编辑
``` mermaid
graph TB


EDIT_PAGE[设置欢迎语]
    BASIC_SET[基础设置]
        WELCOME_CATE[欢迎语类型:<br/>单选,必选]
        FRIEND[好友欢迎语]
            SCOPE_OF_EXECUTION[执行范围]
                ALL_STAFF[全部员工]
                PART_STAFF[部分员工]
                    STAFFS[员工名称]
        CUSTOMER[客户欢迎语]
            SYNC[同步通知到员工:<br/>本期默认:是<br/>不支持编辑]
    CONTENT_SET[内容设置]
        TIME_SLOT[按时间段]
            TIME_ALL_DAY[全天]
                WELCOME_CONTENT[欢迎语内容]
                CHOOSE_TO_ADD{选择添加:可选}
                    CHOOSE_IMG[添加图片]
                        IMG[图片url,id]
                    CHOOSE_H5[添加网页]
                        H5_CONTENT[标题:必选,链接:必选<br/>描述:可选,图片:可选]
                    CHOOSE_MINI[添加小程序]
                        MINI_CONTENT[标题:必选,链接:必选<br/>描述:可选,图片:可选]

EDIT_PAGE --> BASIC_SET
EDIT_PAGE-->CONTENT_SET

BASIC_SET-->WELCOME_CATE-.选择.->FRIEND
WELCOME_CATE-.选择.->CUSTOMER-->SYNC

FRIEND-->SCOPE_OF_EXECUTION-.选择.->ALL_STAFF
SCOPE_OF_EXECUTION-.选择.->PART_STAFF-.点击: 弹窗选择员工.->STAFFS

CONTENT_SET-->TIME_SLOT-->TIME_ALL_DAY-->WELCOME_CONTENT
TIME_ALL_DAY-->CHOOSE_TO_ADD-.点击:图片.->CHOOSE_IMG-.点击:弹框.->IMG
CHOOSE_TO_ADD-.点击:网页.->CHOOSE_H5-->H5_CONTENT
CHOOSE_TO_ADD-.点击:小程序.->CHOOSE_MINI-->MINI_CONTENT
```