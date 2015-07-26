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
        	  //用堆栈来保存所有result
        	  var Result_arr = new Array();
        	  //标记上一层的位置
        	  var last = 1;
        	  //标记现在所在层的位置 
        	  var current = 0; 
        	  //每一层都存放在当前栈
        	  var Current_stack = new Array();
        	  //默认10层，深度从0开始，从1计数
        	  var Count = [0,0,0,0,0,0,0,0,0,0,0];
        	  
					//用来存放正在处理的单层数据
					var sole =	 new Array();						
					//用来存放最后的数据
					var end_Product = new  Array();
					var last_level = 0;
					var current_level = 0 ;
					var rank = new Array();
        	  	//定义一个过渡数组
	        var Temp_arr = new Array();
	        //定义一个层位置标记
	        var current_index = 1;
        	  
        	  //获取了类似 class="test" 中的class
        	  function getSimpleDataType(temp){
        	  		var regx = /(.*)\=\"((.*)\s*)*\"/ig;
						var data = regx.exec(temp);
				
//						alert(data);
						return data[1];
        	  }
        	  
        	  //获取了类似 class="test" 中的test
        	  function getSimpleData(temp){
        	  		var regx = /(.*)\=\"((.*)\s*)*\"/ig;
						var data = regx.exec(temp);
						return data[data.length -1];
        	  }
        	  function getzero(){
        	  		var content = "";
        	  		var result = "";
        	  		var c_temp = "";
        	  		(Content_stack.length != 0) ? content = ".text(\"" + Content_stack.pop() + "\")": content ="";
						result = "var $" + one + current_index +  " = " +"$(\"<" + one + ">\")" 
        	  		+content 
        	  		+ ";";
        	  		//Result_arr.push(result);
        	  		three = one;
        	  		return result;
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
        	  		
        	  		var attr_class ="";
        	  		(Class_stack.length != 0) ? attr_class = ".addClass(\"" + getSimpleData(Class_stack.pop()) + "\")": attr_class ="";
        	  		
        	  		result = "var $" + three  + current_index + " = " +"$(\"<" + three + ">\")" 
        	  		+ attr_class
        	  		+ content
        	  		+ attr
        	  		+ ";";
        	  		//Result_arr.push(result);
        	  		return result;
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
//						alert(data[1]);
						var redata = data[1].split("\" ");
						for (var i = 0; i < redata.length - 1; i++) {
							redata[i] = redata[i] + "\"";
						}
						for (var i = 0; i < redata.length; i++) {
							
							if(getSimpleDataType(redata[i]) == "class"){
								Class_stack.push(redata[i]);
							}else{
								Stack_one.push(redata[i]);
							}
							 
						}
        	  }
        	  function check_single(single){
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
						var select_Regx = /\<\//g;
						var regx;
						//准备处理的数据
						var pre_Data = single;
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
						  three = result[1].substring(0,result[1].search('\\s'));
						  	RegExp_One();
						  return getResult();
						}else{
							return getzero();
						}
//						alert(one);
//						alert(two);
//						alert(three);
        	  }
        	  function default_regexp () {

						getExpData();
						for (var i = 0; i<= RegExp_arr.length ; i++  ) {
							if(RegExp_arr[i]){
//								alert(RegExp_arr[i]);
								check_single(RegExp_arr[i]);
							}
							
							
						}
						var result="";
						for (var i = 0; i<  Result_arr.length; i++  ) {
							result = result + Result_arr[i] + "\n";
						}
						$('#Test_result').val(result);
        	  }
        	  function format_regexp() {
        	  	  //将Tab缩进改为空格缩进，之后就可以根据空格数量来判断包含条件
        	  	  var RegExp_Format_arr;
						var RegExp_Format_str=$(owner).val();//获取文本域内容 
						if(document.all){ 
						  RegExp_Format_arr=RegExp_Format_str.split("\r\n"); 
						}else{ 
						// firfox 
						  RegExp_Format_arr=RegExp_Format_str.split("\n"); 
						} 
						var temp = "";
        	  	  for (var i=0 ; i < RegExp_Format_arr.length ;i++) {
        	  	  		if(RegExp_Format_arr[i].search("\t") >0 ){
        	  	  			temp = temp + RegExp_Format_arr[i].replace(/\t/g,"  ") +"\n";
        	  	  		}else{
        	  	  			temp = temp + RegExp_Format_arr[i] +"\n";
        	  	  		}
        	  	  		
        	  	  }
        	  	  $(owner).val(temp);
        	  }
        	  function getLevel(Level_string){
        	    	var regx = /(\s)*/;
						var number = regx.exec(Level_string);
						if(number[0]){
							return number[0].length/2 + 1;
						}else{
							return 1;
						}
        	  }
        	  function getFulltype(Full_string){
        	  	//无法返回</...>的类型，不过也不需要=-=
        	  	  var regx = /(\<||\<\/)([a-z]*)(\s||\>)/;

						var type = regx.exec(Full_string.trim());
						return type[2];
        	  }
        	  //倒叙查找，找到最近的闭合
        	  function Search_Last_Level(type,Level){
        	  	  console.log("正在查找:" + type + "    " + Level +"\n");
        	  	  for(var i = 0; i<Temp_arr.length;i++){
        	  	  		if(getLevel(Temp_arr[i])==Level && Temp_arr[i].trim() == "<\/" + type + ">"){
        	  	  			return i;
        	  	  		}
        	  	  }
        	  }
        	  function check_append(a,b){
        	  	
        	  	 return "$" + a  + ".append($" + b   + ");";
        	  }
        	  function check_Type(type){
        	  	  if(type == "img" || type == "a" || type == "p" ){
        	  	  	  return true;
        	  	  }else{
        	  	  	  return false;
        	  	  }
        	  }
        	  //倒叙查找，找到最近的闭合
        	  function Search_Level(Level){
        	  	  for(var i = sole.length-2; i>0;i--){
        	  	  		if(getLevel(sole[i])==Level){
        	  	  			return i;
        	  	  		}
        	  	  }
        	  }

        	  function check_children(start,finish){
        	  	  //console.log("找到的子块为：\n");
        	  	  var children_arr = new Array();
        	  	  for (var i = start ;i <= finish ;i++ ) {
        	  	  	  //console.log(Temp_arr[i] + "\n");
        	  	  	 children_arr.push(Temp_arr[i]);
        	  	  }
        	  	  var s_final = "";
        	  	  var s_block = "";
        	  	  //判断内部有几个子块
        	  	  var block_level_n = 0;
        	  	  var block = new Array();
        	  	  for (var i = 0; i < children_arr.length ;i++) {
        	  	  	  console.log("此时处理："+children_arr[i]+"\n");
        	  	  	  console.log("此时T为:\n" );
        	  	  	  for (var m = 0 ;m <children_arr.length; m++) {
        	  	  	  	  console.log(children_arr[m] + "\n");
        	  	  	  }
        	  	  	  if(children_arr[i] != "skip"){
        	  	  	  	  
								if(check_Type(getFulltype((children_arr[i])))){
								  //console.log(getFulltype((Temp_arr[i])) + "是单行\n");	
								  end_Product.push(check_single(children_arr[i]));
								  end_Product.push(check_append(rank[getLevel(children_arr[i])-1],getFulltype(children_arr[i])+current_index));
								  
								  //单行就是img a p 这类一行内即可处理的数据，原本应该是分为双标签和单标签
								  //但是书写习惯表明。。。并没有把p这类分开两行写
								}else{
									//查到对应Level标签的位置，把它单独处理
									var s_n = 0;
									for(var n = 0; n < children_arr.length; n++){
			        	  	  	  if(getLevel(children_arr[n]) == getLevel(children_arr[i]) && children_arr[n].trim() == "<\/" + getFulltype(children_arr[i]) + ">"){
			        	  	  			s_n = n;
			        	  	  		}
			        	  	  }
									console.log("此时s_n 为" + s_n + "\n");
									end_Product.push(check_single(children_arr[i]));
									s_final = check_append(rank[getLevel(children_arr[i])-1],getFulltype(children_arr[i])+current_index);
									block_level_n++;
									//s_block = check_append(rank[getLevel(children_arr[i])-2],rank[getLevel(children_arr[i])-1]);
	                 
	                 rank[getLevel(children_arr[i])] = getFulltype(children_arr[i] + children_arr[s_n-1]) + current_index ;
	                 block.push(children_arr[i]);
	                 current_index++;
	                 console.log("遇到了闭合:"+ children_arr[i] + children_arr[s_n] +"\n");
	                 
	                 children_arr[s_n] = "skip";
	                 
								}
							}
        	  	  }
        	  	  end_Product.push(s_final);
        	  	  console.log("内部有:" + block_level_n + "个子块\n");
						if(block_level_n -1 >0){
							for (var l = block_level_n ; l >0  ; l --) {
								if( rank[l-1] != "(\".Container\")"){
									end_Product.push(check_append(rank[l-1],rank[l]));
								}
								
							}
							
						}
        	  	  //end_Product.push(s_block);
        	  	  //数据处理完后删掉
 						Temp_arr.splice(start,finish  - start + 1 );
 						console.log("数据处理完后删掉后：\n")
				    for (var z = 0 ; z < Temp_arr.length; z++) {
				    	    console.log(Temp_arr[z] + "\n");
				    }
 						console.log("数据处理完后RANK：\n")
				    for (var q = 0 ; q < rank.length; q++) {
				    	    console.log(rank[q] + "\n");
				    }
        	  	  
        	  }
        	  function loopsingle(temp){

		        //将首尾div给结合
		        var first = "";
			      first = Temp_arr.shift() + Temp_arr.pop();
			      
			      rank[0] = "(\"\.Container\")";
			      current_level ++;
			      rank[1] = getFulltype(first)+1;
			      end_Product.push(check_single(first));
			      var s_final = "";
			      s_final = check_append(rank[0],getFulltype(first)+1);

						for (var i = 0;i < Temp_arr.length; i++) {
				     // console.log("现在临时保存数据如下："+ "\n");
				      for (var s = 0; s<Temp_arr.length;s++) {
				      	 
				      	  //console.log(Temp_arr[s] +"\n");
				      }
							if(check_Type(getFulltype((Temp_arr[i])))){
							  console.log((Temp_arr[i]) + "rank为:" + rank[rank.length-1] + "是单行\n");	
							  end_Product.push(check_single(Temp_arr[i]));
							  //end_Product.push(check_append(rank[rank.length-1],getFulltype(Temp_arr[i])+current_index));
							  end_Product.push(check_append(rank[getLevel(Temp_arr[i])-1],getFulltype(Temp_arr[i])+current_index));
							  //单行就是img a p 这类一行内即可处理的数据，原本应该是分为双标签和单标签
							  //但是书写习惯表明。。。并没有把p这类分开两行写
							}else{
								//层级，用来标注变量名，是变量名不重复
								current_index++;
								//查到对应Level标签的位置，把它单独成块处理
								var s_n = Search_Last_Level(getFulltype(Temp_arr[i]),getLevel(Temp_arr[i]));
								//console.log("Find Index:" + i + " To" + s_n + "\n");
								
								check_children(i,s_n);
								//数组长度在变化，因此得往前重新计数
								i--;
								
							}
						}
					
						 end_Product.push(s_final);
						
        	  }
        	  
					function total_regexp(){
        	  	  var RegExp_Total_arr;
						var RegExp_Total_str=$(owner).val();//获取文本域内容 
						if(document.all){ 
						  RegExp_Total_arr=RegExp_Total_str.split("\r\n"); 
						}else{ 
						// firfox 
						  RegExp_Total_arr=RegExp_Total_str.split("\n"); 
						} 
        	  	  for (var i= 0 ; i < RegExp_Total_arr.length ;i++) {
        	  	  		  Temp_arr[i] = RegExp_Total_arr[i];
        	  	  }
        	  	  loopsingle();
        	  	  console.log("此时最后结果为：\n");
        	  	  var out = "";
						for (var i = 0;i <end_Product.length ;i++) {
							console.log(end_Product[i]);
							out = out+ end_Product[i] + "\n";
						}
						$('#Test_result').val(out);
					}
        		switch (this.options.type){
        			case 'default':
        			  default_regexp();
        			break;
        			case 'format':
        			  format_regexp();
        			break;
        			case 'total':
        			  total_regexp();
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
