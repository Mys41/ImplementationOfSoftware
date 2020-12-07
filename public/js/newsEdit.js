
newsId=undefined;
newsTitle=undefined;
newsContent=undefined;

$(function (){
    $("#navigator").load("http://localhost:3000/template/navigator.html");
    $("#footer").load("http://localhost:3000/template/footer.html");
    tinymce.init({
        selector: '#tinymce', //容器，可使用css选择器
        language:'zh_CN', //调用放在langs文件夹内的语言包
        toolbar: true, //工具栏
        menubar: true, //菜单栏
        branding:false, //右下角技术支持
        inline: false, //开启内联模式
        elementpath: false,
        min_height:1200, //最小高度
        height: 800,  //高度
        skin: 'oxide',
        toolbar_sticky:true,
        visualchars_default_state:true, //显示不可见字符
        image_caption: true,
        paste_data_images: true,
        relative_urls : false,
        // remove_script_host : false,
        removed_menuitems: 'newdocument',  //清除“文件”菜单
        plugins: "lists,hr, advlist,anchor,autolink,autoresize,charmap,code,codesample,emoticons,fullscreen,image,media,insertdatetime,link,pagebreak,paste,preview,print,searchreplace,table,textcolor,toc,visualchars,wordcount", //依赖lists插件
        toolbar: 'bullist numlist anchor charmap emoticons fullscreen hr image insertdatetime link media pagebreak paste preview print searchreplace textcolor wordcount',
        //选中时出现的快捷工具，与插件有依赖关系
        images_upload_url:'a.php', /*后图片上传接口*/ /*返回值为json类型 {'location':'uploads/jpg'}*/
        setup: function(editor){
            editor.on('change',function(){ editor.save(); });
        }

    });
    // 获取最后参数
    getData();
    
    
    
    
    

});
/*填入初始数据*/
//tinyMCE.activeEditor.setContent("<h1>测试</h1><hr><h2>这是测试的数据<h2>");
/*
1、如果当前页面只有一个编辑器：
    获取内容：tinyMCE.activeEditor.getContent()
    设置内容：tinyMCE.activeEditor.setContent(“需要设置的编辑器内容”)
2、如果当前页面有多个编辑器（下面的“[0]”表示第一个编辑器，以此类推）：
    获取内容：tinyMCE.editors[0].getContent()
    设置内容：tinyMCE.editors[0].setContent(“需要设置的编辑器内容”)
*/
function setcontent(){
    tinyMCE.activeEditor.setContent("");
    //tinyMCE.editors[0].setContent("<h1>设置内容2</h1>");
}
function getcontent(){
    alert(tinyMCE.activeEditor.getContent());
    console.log(tinyMCE.activeEditor.getContent())
}
/*3、获取不带HTML标记的纯文本内容：
 var activeEditor = tinymce.activeEditor;
 var editBody = activeEditor.getBody();
 activeEditor.selection.select(editBody);
 var text = activeEditor.selection.getContent( {'format' : 'text' } );*/
function getbody(){
    var activeEditor = tinymce.activeEditor;
    var editBody = activeEditor.getBody();
    activeEditor.selection.select(editBody);
    var text = activeEditor.selection.getContent( {'format' : 'text' } );
    alert(text);
}

function getData(){
    var data = window.location.href.split('/').reverse();
    if(data[0]==0){
        return;
    }
    newsId=data[0];
    var xmlhttp;
    if (window.XMLHttpRequest)
    {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        // IE6, IE5 浏览器执行代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            res=xmlhttp.responseText;
            res=JSON.parse(res)[0];
            newsId=res['nid'];
            newsTitle=res['title'];
            newsContent=res['content'];
            setData(newsTitle,newsContent);
            
            


        }
    }
    xmlhttp.open("GET",'/'+['data','0',newsId].join('/'),true);
    xmlhttp.send();


}

function setData(){
    $("#newsTitle").val(newsTitle);
    console.log(newsTitle)
    $('#tinymce').html(newsContent);
}