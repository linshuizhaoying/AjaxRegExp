/*
 * Code by:Qian
 * Email:4799109@qq.com
 * 日期：2015-07-01  上午8:15
 * 功能:多功能验证
 * 调用方式:
 * $("#form_input").validate({
	    type: "default", //custom,email,id_card
	    length:"8",
	    notify:"false"
	    
	 });
 *  
 */

;(function($, window, document,undefined) {
    //定义validate的构造函数
  	  		
	  var options;
    var Validate = function(ele, opt) {
        this.$element = ele; 
        owner = this.$element.selector;
        
        this.defaults = {
            'type': 'default',
            'len': '18',
            'notify': 'false'
        },
        this.options = $.extend({}, this.defaults, opt);
        options = this.options;
        //defaults里面存的是函数里面自带的参数，opt是传过来的参数，最终结果用opt代替defaluts里面
    }
    //定义Validate的方法
    Validate.prototype = {

        valid: function() {
        	/* 函数名：default_valid ()
        	 * Code by:Qian
        	 * Email:4799109@qq.com
        	 * 日期：2015-07-01  下午7:55
        	 * 功能:
        	 * 		默认参数的调用方法
        	 *    检测字符长度
        	 *    支持notify调用
        	 * 
        	 */
        	  function default_valid () {
	        	  	var default_flag = false ; 
						$(owner).on("blur",function() {
							 if($(owner).val().length > options.len){
							 	 if(default_flag == false){
							 	 	$(owner).after("<span id='valid_string_error'>字符数已超！</span>");
							 	 	default_flag = true;
							 	 }
							 }else{
							 	 $('#valid_string_error').remove();
							 	 default_flag = false;
							 }
						});
        	  }
					function email_valid () {
						  var email_flag = false;
						  $(owner).on("blur",function() {
							  var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
							  if (!reg.test($(owner).val()))
							 	 {
								 	 if(email_flag == false){
								 	 	email_flag = true;
								 	 	$(owner).after("<span id='valid_email_error'>邮箱格式不正确！请重新输入！</span>");
								 	 }
							 	 }
							  else 
							  {
							 	  $('#valid_email_error').remove();
								 	email_flag = false;
								}
						 });
					}
					function id_card_valid () {
						  var email_flag = false;
						  $(owner).on("blur",function() {
							  var reg = /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i;
							  if (!reg.test($(owner).val()))
							 	 {
								 	 if(email_flag == false){
								 	 	email_flag = true;
								 	 	$(owner).after("<span id='valid_id_card_error'>身份证号格式不正确！请重新输入！</span>");
								 	 }
							 	 }
							  else 
							  {
							 	  $('#valid_id_card_error').remove();
								 	email_flag = false;
								}
						 });
					}
        		switch (this.options.type){
        			case 'default':
        			  default_valid();
        			break;
        			case 'email':
        			  email_valid();
        			break;
        			case 'id_card':
        			  id_card_valid();
        			break;        		
        		}
        }
    }
    //在插件中使用Validate对象
    $.fn.Qpl_validate = function(options) {
        //创建Validate的实体
        var validate = new Validate(this, options);
        //调用其方法
        return validate.valid();
    }
})(jQuery, window, document);
