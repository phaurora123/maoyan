const path=require('path')
module.exports={
    devServer:{
        proxy:{
            '/ddcategory.php':{
                target:'http://search.m.dangdang.com',
                changeOrigin:true
            },
            '/search_ajax.php':{
                target:'http://search.m.dangdang.com',
                changeOrigin:true
            }
        },
    },
    configureWebpack:{
        resolve:{
            alias:{
                '@':path.join(__dirname,'./src'),
                'api':path.join(__dirname,'./src/api'),
                'components':path.join(__dirname,'./src/components'),
                'views':path.join(__dirname,'./src/views'),
                'utils':path.join(__dirname,'./src/utils'),
                'common':path.join(__dirname,'./src/common'),
                'router':path.join(__dirname,'./src/router'),
                'store':path.join(__dirname,'./src/store'),
                'lib':path.join(__dirname,'./src/lib'),
            }
        }
    }
}

// http://search.m.dangdang.com/ddcategory.php?action=get_content&title=%E5%9B%BE%E4%B9%A6&pageid=712231
// http://search.m.dangdang.com/ddcategory.php?action=get_content&title=%E7%AB%A5%E4%B9%A6&pageid=712675
//http://search.m.dangdang.com/ddcategory.php?action=get_content&title=%E7%94%B5%E5%AD%90%E4%B9%A6&pageid=712239
//http://search.m.dangdang.com/ddcategory.php?action=get_content&title=%E5%90%AC%E4%B9%A6&pageid=712636
// 网络文学
//http://search.m.dangdang.com/ddcategory.php?action=get_content&title=%E7%BD%91%E7%BB%9C%E6%96%87%E5%AD%A6&pageid=712648
