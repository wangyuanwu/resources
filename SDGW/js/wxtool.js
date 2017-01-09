var cys = {
    jsonToString:function(d){return JSON.stringify(d);},
    stringToJson: function (d) { if (d) return eval("(" + d + ")"); return null; },
    getStorage: function (name) { return cys.stringToJson(top.window.localStorage[name]);},//获取本地数据缓存
    setStorage: function (name, data) {top.window.localStorage[name] = cys.jsonToString(data);},//插入本地数据缓存
    H:document.documentElement.clientHeight||document.body.clientHeight,
    W:document.documentElement.clientWidth||document.body.clientWidth,
    addCookie: function (name, value, expires, path, domain) {//添加cookie 
	    var str = name + "=" + escape(value);
	    if (expires != "") {
	        var date = new Date();
	        date.setTime(date.getTime() + expires * 24 * 3600 * 1000);//expires单位为天 
	        str += ";expires=" + date.toGMTString();
	    }
	    
	    if (typeof path !="undefined" && path !=null && path != "" ) {
	        str += ";path=" + path;//指定可访问cookie的目录 
	    }else {
	    	str += ";path=" +"/";   
	    }
	    
	    if (typeof domain !="undefined" && domain !=null && domain != "" ) {
	        str += ";domain=" + domain;//指定可访问cookie的域 
	    } 
	    document.cookie = str;
	 },

    getCookie: function (name) {//取得cookie
        if (document.cookie.length > 0) {//先查询cookie是否为空，为空就return ""
            c_start = document.cookie.indexOf(name + "=")//　　
            if (c_start != -1) {
                c_start = c_start + name.length + 1//
                c_end = document.cookie.indexOf(";", c_start)//
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))//
            }
        }
        return "";
     },
    delCookie: function (name) {//删除cookie
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = cys.getCookie(name);
        if (cval!= null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
     }
   };

//获取浏览器信息
$.q = function (n, u) {
    if (n == null) {
        n = self.location.search;
        if (n && n != "") { return n.replace("?", "") }
        else { return null } }
    var s = u;
    if (s == null) { s = self.location.href }
    if (n) { var g = new RegExp("(\\?|&)" + n + "=([^&|#]*)");
        var r = s.match(g);
        if (r) {
            try { return decodeURIComponent(r[2]) }
            catch (err) { return unescape(r[2]) }
        } else { return null } }
    else { var i = s.indexOf("?");
        if (i == -1) { return null }
        return s.substr(i + 1) }
};
function getUrlParam(key) {
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
}