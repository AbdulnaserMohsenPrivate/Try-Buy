$(function(){
  
  function toggleView(){
    $('.login').toggleClass('is-active');
    $('.register').toggleClass('is-active');
    $('.sign-up-toggle').toggleClass('is-active');
    $('.login-toggle').toggleClass('is-active');
  }
  
  function slideElements(prop){
    $(prop.showEle).removeClass(prop.removeShowClass);
    $(prop.showEle).addClass(prop.addShowClass);
    $(prop.hideEle).removeClass(prop.removeHideClass);
    $(prop.hideEle).addClass(prop.addHideClass);
  }
  
  $('.sign-up-toggle a').on('click',function(){
    toggleView();
	$('.registerArea').addClass('forregister'); //me
    $('.login-view-toggle').addClass('move-top');
    $('.login-view-toggle').removeClass('move-bottom');
    slideElements({
      showEle: '.register',
      removeShowClass: 'down',
      addShowClass: 'pull-up',
      hideEle: '.login',
      addHideClass: 'up',
      removeHideClass: 'push-down'
    });
  });
  
  $('.login-toggle a').on('click',function(){
    toggleView();
	$('.registerArea').removeClass('forregister'); //me
    $('.login-view-toggle').addClass('move-bottom');
    $('.login-view-toggle').removeClass('move-top');
    slideElements({
      showEle: '.login',
      removeShowClass: 'up',
      addShowClass: 'push-down',
      hideEle: '.register',
      addHideClass: 'down',
      removeHideClass: 'pull-up'
    });
  });
  
});



(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    
	/* on blur required*/
	$(document).on( "blur",".validate-input input", function()
	{
		if(validate(this) == false)
		{
			$(this).parent().parent().removeClass('has-valid').addClass('has-invalid');
		}
		else 
		{
			$(this).parent().parent().removeClass('has-invalid').addClass('has-valid');
		}
	}); 
	
	/*on blur not required*/
	$(document).on( "blur",".input-not-required", function()
	{
		if(not_required(this) == false) {
			$(this).removeClass('has-valid').addClass('has-invalid');
		}
		else if(not_required(this) == 'empty') {
			$(this).removeClass('has-invalid').removeClass('has-valid');
		}
		else{
			$(this).removeClass('has-invalid').addClass('has-valid');
		}
	});
	
	


    /*==================================================================
    [ Validate after type ]*/
    
	/*on blur show required validate or show that true for required input*/
	$(document).on( "blur",".validate-input input", function()
	{
		if(validate(this) == false)
		{
		   showValidate(this);
		}
		else 
		{
			$(this).parent().addClass('true-validate');
		}
	});
	
	/*not true show required validate or show that true for   not required input */
	$(document).on( "blur",".validate-input .input-not-required", function()
	{
		if(not_required(this) == false){
			showValidate(this);
		}
		else if(not_required(this) != 'empty'){
			//hideValidate(this);
			$(this).parent().addClass('true-validate');
		}
	});


	/*for select */
	$(document).on( "change",".select select", function()
	{
		//console.log($(this).val());
		//console.log($(this).children("option:selected").text());
		if($(this).val() == 0)
		{
			$(this).parent().parent().removeClass('true-validate');
			showValidate($(this).parent());
		}
		else
		{
			hideValidate($(this).parent());
			$(this).parent().parent().addClass('true-validate');	
		}
	});
	
    /*==================================================================
    [ Validate ]*/
    
	/*on sumbmit*/
	$(document).on( "submit",".validate-form", function(event)
    {
		var input = $(this).find('.validate-input input');
		var input2 = $(this).find('.validate-input .input-not-required');
		var selects = $(this).find('.select select');
	
        var check = true;
		

        for(var i=0; i<input.length; i++) 
		{
            if(validate(input[i]) == false)
			{
			    showValidate(input[i]);
                check=false;
			}
        }
		for(var i=0; i<input2.length; i++) 
		{
            if(not_required(input2[i]) == false)
			{
                showValidate(input2[i]);
                check=false;
            }
        }
		
		$(selects).each(function(i, item) 
		{
			if($(item).val() == 0)
			{
				$(this).parent().parent().removeClass('true-validate');
				showValidate($(item).parent());
				check=false;
			}
			else
			{
				hideValidate($(item).parent());
				$(item).parent().parent().addClass('true-validate');	
			}
			//console.log($(item).val());
		});

		if(!check)
			event.stopImmediatePropagation(); //to stop other functions have the same defination as i have function with the same defination in the blade that send the form via ajax this code to stop this function
        
		return check;
    });


    /*focus required*/
	$(document).on( "focus",".validate-input input", function()
	{
		hideValidate(this);
        $(this).parent().removeClass('true-validate');
	}); 
	
	/*focus not required*/
	$(document).on( "focus",".validate-form .input-not-required", function()
	{
		hideValidate(this);
		$(this).parent().removeClass('true-validate');
	});


    function validate (input) 
	{
		
		if($(input).attr('name') == 'email') 
		{
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) 
			{
                return false;
            }
        }
		else if($(input).attr('name') == 'email_register') 
		{
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) 
			{
                return false;
            }
        }
        
		else if($(input).attr('name') == 'phone') 
		{
			if($(input).val().trim().length < 10)//must be at least 10 digits lenght
			{	
				return false;
			}
			if($(input).val().trim().match(/^\+?\d{10,}$/) == null) 
			{
                return false;
            }
        }
		else if($(input).attr('name') == 'mobile') 
		{
			if($(input).val().trim().match(/^\+?\d{11,}$/) == null) 
			{
                return false;
            }
        }
		
		else if($(input).attr('name') == 'price') 
		{
			
			if($(input).val().trim().match(/^\d+(\.{1}\d{1,2})?$/) == null) 
			{
                return false;
            }
            
        }
		
		else if($(input).attr('name') == 'name' || $(input).attr('name') == 'faculty' || $(input).attr('name') == 'department') 
		{
			if($(input).val().trim().length < 3)//must be at least 3 characters lenght
			{	
				return false;
			}
			
			var flag1 = true; var flag2 = true;
			
			if($(input).val().trim().match(/^[\u0621-\u064A ]+$/) == null)//only arabic letters
			{
				flag1=false;
				
			}
				
			if($(input).val().trim().match(/^[a-zA-Z ]+$/)== null)//only English letters
            {
				flag2=false;
			}    
			if(flag1 == false && flag2 == false)
				return false;
				
        }
		else if($(input).attr('name') == 'address') 
		{
			if($(input).val().trim().length < 3)//must be at least 3 characters lenght
			{	
				return false;
			}
			var flag1 = true; var flag2 = true;
			
			if($(input).val().trim().match(/^[\u0621-\u064A0-9\-\, ]+$/) == null)//only arabic letters
				flag1=false;
			if($(input).val().trim().match(/^[a-zA-Z0-9\-\, ]+$/)== null)//only English letters
                flag2=false;
			if(flag1 == false && flag2 == false)
				return false;
				
        }
		else if($(input).attr('name') == 'ARadmin') 
		{
			if($(input).val().trim().match(/^[\u0621-\u064A0-9 ]+$/) == null)//only arabic letters
				return false;	
        }
		else if($(input).attr('name') == 'ENadmin') 
		{
			if($(input).val().trim().match(/^[a-zA-Z,0-9 ]+$/)== null)//only English letters
				return false;	
        }
		else if($(input).attr('name') == 'password') 
		{
			if($(input).val().trim().length < 8)//password must be at least 8 characters lenght
				return false;	
        }
		else if($(input).attr('name') == 'password_confirmation') 
		{
			if($(input).val().trim() == '')
                return false;
			
			if($(input).val().trim().length < 8)//password must be at least 8 characters lenght
				return false;
			
			if($(input).val().trim() != $("#password").val())
				return false;	
        }
        else 
		{
            if($(input).val().trim() == '')
			{
				return false;
            }
        }
    }
	
	function not_required (input)
	{
		if($(input).attr('name') == 'nationalID') 
		{
			if($(input).val().trim()==''){return 'empty';}
			else if($(input).val().trim().match(/[0-9]/) == null)
			{
				if($('html').attr('dir')=='rtl')
				{
					$(input).parent().attr("data-validate","يرجى إدخال الرقم القومي المكون من 14 رقم فقط");
				}
				else
				{
					$(input).parent().attr("data-validate","National ID consists of 14 digits");
				}
				return false;
			}
			else if($(input).val().trim().match(/[2-3]{1}/) == null)
			{
				if($('html').attr('dir')=='rtl')
				{
					$(input).parent().attr("data-validate","الرقم القومي يبدء ب 2 او 3 فقط");
				}
				else
				{
					$(input).parent().attr("data-validate","National ID begin with 2 or 3");
				}
				return false;
			}
			else if($(input).val().trim().length != 14)
			{
				if($('html').attr('dir')=='rtl')
				{
					$(input).parent().attr("data-validate","الرقم القومي مكون من 14 رقم");
				}
				else
				{
					$(input).parent().attr("data-validate","National ID consists of 14 digits");
				}
				return false;
			}
			else if($(input).val().trim().match(/[2-3]{1}[0-9]{13}/) == null)
			{
				if($('html').attr('dir')=='rtl')
				{
					$(input).parent().attr("data-validate","الرقم القومي يبدء ب 2 او 3 فقط");
				}
				else
				{
					$(input).parent().attr("data-validate","National ID begin with 2 or 3");
				}
				return false;
			}
			else if($(input).val().trim().match(/[2-3]{1}[0-9]{2}[0-1]{1}/) == null)
			{
				if($('html').attr('dir')=='rtl')
				{
					$(input).parent().attr("data-validate","الرقم الرابع غير صحيح");
				}
				else
				{
					$(input).parent().attr("data-validate","The fourth digit is not correct");
				}
				return false;
			}
			else if($(input).val().trim().match(/[2-3]{1}[0-9]{2}[0-1]{1}[0-9]{1}[0-3]{1}/) == null)
			{
				if($('html').attr('dir')=='rtl')
				{
					$(input).parent().attr("data-validate","الرقم السادس غير صحيح");
				}
				else
				{
					$(input).parent().attr("data-validate","The the sixth digit is not correct");
				}
				return false;
			}
			else if($(input).val().trim().match(/[2-3]{1}[0-9]{2}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{8}$/) == null) 
			{
				if($('html').attr('dir')=='rtl')
				{
					$(input).parent().attr("data-validate","يرجى إدخال الرقم القومي بطريقة صحيحة يبدء ب2 او 3 ولا يقل عن 14 رقم");
                }
				else
				{
					$(input).parent().attr("data-validate","National ID consists of 14 digits and begin with 2 or 3 ");
				}
				return false;
            }    
        }
		
	}


    function showValidate(input) {
        var thisAlert = $(input).parent().parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent().parent();

        $(thisAlert).removeClass('alert-validate');
    }
	
	//error messages
	function minCharacters(num)
	{
		if($('html').attr('dir')=='rtl')
		{
			return " على الاقل "+num +" احرف"
		}
		else
		{
			return "At least "+num +" characters"
		}
	}
	function minNumbers(num)
	{
		if($('html').attr('dir')=='rtl')
		{
			return " على الاقل "+num +" ارقام"
		}
		else
		{
			return "At least "+num +" digits"
		}
	}

})(jQuery);