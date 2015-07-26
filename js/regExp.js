/*
 * 函数名：
 * Code by:Qian
 * Email:4799109@qq.com
 * 日期：2015-07-06  上午8:54
 * 功能:快速生成Ajax动态内容小工具
 * 1.根据标准缩进进行判断内容嵌套
 * 2.针对单<div>xxx</div>进行简单正则
 * 3.针对<div class="xxx" id="xxx" XXX="XXX"></div>
 * 4.子类的父类查找，用一个一维数组 Temp[children] = father;
 * 5.自定义参数命名
 */ 
;(function($, window, document,undefined) {
    //定义AjaxReg的构造函数
  	  		
	  var options;
    var AjaxReg = function(ele, opt) {
        this.$element = ele; 
        owner = this.$element.selector;
        
        this.defaults = {
            'type': 'default',
        },
        this.options = $.extend({}, this.defaults, opt);
        options = this.options;
        //defaults里面存的是函数里面自带的参数，opt是传过来的参数，最终结果用opt代替defaluts里面
    }
    //定义AjaxReg的方法
    AjaxReg.prototype = {

        regexp: function() {
        	/* 函数名：default_regexp ()
        	 * Code by:Qian
        	 * Email:4799109@qq.com
        	 * 日期：2015-07-06  下午7:55
        	 * 功能:
        	 * 		默认参数的调用方法
        	 * 
        	 */ 
        	  var RegExp_str;
        	  var RegExp_arr = [];
        	  //正则匹配第一次内容保存
        	  var one;
        	  var two;
        	  var three;
        	  //用堆栈来保存Attr属性
        	  var Stack_one = new Array();
        	  //正则第一块内容：attr的内容
        	  
        	  //用堆栈来保存Class
        	  var Class_stack = new Array();
        	  //用堆栈来保存Content
        	  var Content_stack = new Array();
        	  
        	  //获取了类似 class="test" 中的class
        	  function getSimpleDataType(temp){
        	  		var regx = /(.*)*\=\"(.*)*\"/ig;
						var data = regx.exec(temp);
						return data[1];
        	  }
        	  
        	  //获取了类似 class="test" 中的test
        	  function getSimpleData(temp){
        	  		var regx = /(.*)*\=\"(.*)*\"/ig;
						var data = regx.exec(temp);
						return data[2];
        	  }
        	  function getzero(){
        	  		var content = "";
        	  		var result = "";
        	  		(Content_stack.length != 0) ? content = ".text(\"" + Content_stack.pop() + "\")": content ="";
						result = "var $" + one + " = " +"$(\"<" + one + ">\")" 
        	  		+content 
        	  		+ ";";
        	  		$('#Test_result').val(result);
        	  }
        	  function getResult(){
        	  		var result;
        	  		var attr = "";
        	  		var attr_data = "";
 					  var n = Stack_one.length;
        	  		//将属性名与值修改为ajax格式
        	  		
        	  		for (; Stack_one.length != 0 ; ) {
        	  			var regx = /(.*)*\=\"(.*)*\"/ig;
        	  			var t = Stack_one.pop().toString();
							var temp = t.replace(regx,"\"$1\":\"$2\"");
							
							
							if(Stack_one.length != 0  ){
								attr_data = attr_data + temp +",";
							}else{
								attr_data = attr_data + temp ;
							}
        	  		}
        	  		
        	  		var content = "";
        	  		(Content_stack.length != 0) ? content = ".text(\"" + Content_stack.pop() + "\")": content ="";
        	  		attr = ".attr({" + attr_data +"})";
        	  		result = "var $" + three + " = " +"$(\"<" + three + ">\")" +".addClass(\""
        	  		+ getSimpleData(Class_stack.pop())+ "\")" 
        	  		+ content
        	  		+ attr
        	  		+ ";";
        	  		$('#Test_result').val(result);
        	  }
        	  
        	  //获取指定文本域的内容
        	  function getExpData() {
						RegExp_str=$(owner).val();//获取文本域内容 
						if(document.all){ 
						RegExp_arr=RegExp_str.split("\r\n"); 
						}else{ 
						// firfox 
						RegExp_arr=RegExp_str.split("\n"); 
						} 
						//alert(RegExp_arr);
        	  }
        	  //正则过滤第一道
        	  function RegExp_One(){
        	  		var temp;
        	  		temp = one;
        	  		//alert(temp);
        	  		var regx = /\s(.*)*/ig;
						var data = regx.exec(temp);
						var redata = data[1].split(" ");
		
						for (var i = 0; i < redata.length; i++) {
							
							if(getSimpleDataType(redata[i]) == "class"){
								Class_stack.push(redata[i]);
							}else{
								Stack_one.push(redata[i]);
							}
							 
						}
        	  }
        	  function default_regexp () {
						/*
						 * Code by:Qian
						 * 描述:
						 *  第一遍粗略正则
						 *  将<div id=xxx class="xxx" xxx="xxx">AAAAAA... </div>
						 *  匹配成
						 *  $1= div id=xxx class="xxx" xxx="xxx"
						 *  $2 = AAAAAA... 
						 *  $3 = div
						 */
						getExpData();
						
						var select_Regx = /\<\//g;
						var regx;
						//准备处理的数据
						var pre_Data = RegExp_arr[2];
						//判断是闭合标签还是单标签
						var n = pre_Data.match(select_Regx) || [];
						if(n.length == 1){
							//闭合
							regx=/\<(.*)*\>(.*)*(\<\/(.*)*\>)/i;
						}else{
							//单标签 img a这类
							regx=/\<(.*)*\>(.*)*(\<\/(.*)*\>)*/i;
						}
						var result=regx.exec(pre_Data);
						one = result[1];
						two = result[2];
						
						if(two){//如果有content这个值
						  Content_stack.push(two);
						}
						//从$1中提取标签，不取$1作为标签是因为img a 这些没有闭合标签
						var regy=/(\b(.)*\b)\s/i;
						var t = regy.exec(result[1]);

						if(t){
						  three = t[1];
						  	RegExp_One();
						  getResult();
						}else{
							getzero();
						}
//						alert(one);
//						alert(two);
//						alert(three);
        	  }
					
        		switch (this.options.type){
        			case 'default':
        			  default_regexp();
        			break;
        		}
        }
    }
    //在插件中使用AjaxReg对象
    $.fn.Qpl_AjaxReg = function(options) {
        //创建AjaxReg的实体
        var ajaxreg = new AjaxReg(this, options);
        //调用其方法
        return ajaxreg.regexp();
    }
})(jQuery, window, document);

//调用方式
//$('#test').Qpl_AjaxReg({
//	  type:"id_card"
//});
