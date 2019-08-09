import http from '../utils/http.js'
// 1、分类页http://search.m.dangdang.com/ddcategory.php?t=1564880607
export const ctgPage_api = (title, pageid) => http(
    'get', '/ddcategory.php', { action: 'get_content', title: title, pageid: pageid }
)
// 2、点击社会 进入列表页+下拉加载更多
export const ctgDetail_api = (cid = '01.03.45.00.00.00',
    sort_type,
    have_ad = 1,
    act = 'get_product_flow_category',
    result_set_all_count = 0,
    has_used_recommend = 0,
    cities,
    page
) => http('get', '/search_ajax.php',
    {
        cid: cid,
        sort_type: sort_type,
        have_ad: have_ad,
        act: act,
        result_set_all_count: result_set_all_count,
        has_used_recommend: has_used_recommend,
        cities,
        page
    })

//3、搜索框
export const search_api = (keyword, act = 'suggest') => http(
    'get', '/search_ajax.php', { keyword: keyword, act: act }
)

// 4、筛选
// http://search.m.dangdang.com/search_ajax.php
// ?cid=01.03.45.00.00.00&act=get_filter_info_category
// &result_set_all_count=0&has_used_recommend=0&needcities=1&template=PUB_TEMPLATE

export const filter_api = (
    cid = '01.03.45.00.00.00',
    act = 'get_filter_info_category',
    result_set_all_count = 0,
    has_used_recommend = 0,
    needcities = 1,
    template = 'PUB_TEMPLATE',

) => http('get', '/search_ajax.php',
    {
        cid: cid,
        act: act,
        result_set_all_count: result_set_all_count,
        has_used_recommend: has_used_recommend,
        needcities: needcities,
        template: template,

    })
// http://search.m.dangdang.com/search_ajax.php?cid=01.03.45.00.00.00&have_ad=1&act=get_product_flow_category
// &result_set_all_count=0&has_used_recommend=0 



// http://search.m.dangdang.com/search_ajax.php?cid=01.03.45.00.00.00&act=get_product_flow_category
// &result_set_all_count=0&has_used_recommend=0&sort_type=sales_1
//http://search.m.dangdang.com/search_ajax.php?cid=01.03.45.00.00.00&act=get_product_flow_category
// &result_set_all_count=0&has_used_recommend=0
// &filter_from=filter%2Ccategory&is_special_sale=1&is_presale=1&lowp=0&highp=19&city=112&att=sss8589934592%3Asss8589934766-sss8589934592%3Asss8589934719-sss4294967296%3Asss4294971251&from=filter