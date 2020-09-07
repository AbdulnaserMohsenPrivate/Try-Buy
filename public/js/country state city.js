  
  jQuery( document ).ready(function( $ ) 
{

	//countries
		
		try 
			{
				$("#countryId").msDropDown();
				$("#stateId").msDropDown();
				$("#cityId").msDropDown();
			} 
			catch(e) 
			{
				alert(e.message);
			}
      
	  //detect language
      //console.log($("html").attr("lang"));
      var language= $("html").attr("lang");
      //console.log(language);
      
      var url = 'http://api.geonames.org/countryInfoJSON?q=&country=&lang='+language+'&username=abdulnaser_mohsen'
      //console.log(url);
      

      $.ajax
      ({
        type: 'GET', 
        url: url,
        dataType: 'json',
        data: {},
        success: function (data) 
        {
          //console.log(data);
          //console.log(data.geonames);
          var results = [];
          
          $(data.geonames).each(function(i, item) 
          {
            //console.log(item.geonameId);
            //console.log(i);
            //console.log(data.geonames[i].countryName);
            results.push([data.geonames[i].countryName,item.geonameId,item.countryCode.toLowerCase()]);
            results.sort();
            //console.log(results);
          }); 

          $(results).each(function(i, item) 
          {
              //console.log(item[0]);
              //console.log(item[1]);
			  //console.log(item[2]);
			  $('#countryId').append
              ('<option value='+ item[1] +' data-imagecss="flag"  data-image="http://www.geonames.org/flags/x/'+item[2]+'.gif">'+ item[0] +'</option>');
          });
			try 
			{
				//$("#countryId").msDropDown();
				$("#countryId").msDropdown().data("dd").destroy();
				$("#countryId").msDropDown();

			} 
			catch(e) 
			{
				alert(e.message);
			}
          //console.log("done");
        
        },
        error:function(data)
        { 
          console.log(data);
        }
      });
	  
	  
	  
	  
  $(document).on( "change","#countryId", function()
  {
	
	$("input[name='country']").val($("#countryId").children("option:selected").text());
	
    $("#stateId").msDropdown().data("dd").destroy();
	$('#stateId').html('<option value=0>Select State</option>');
    $('#stateId').parent().removeClass('true-validate');
	$("#stateId").msDropDown();
	
	$("#cityId").msDropdown().data("dd").destroy();
	$('#cityId').html('<option value=0>Select City</option>');
    $('#cityId').parent().removeClass('true-validate');
	$("#cityId").msDropDown();
    
    var language= $("html").attr("lang");
    //console.log(language);
    
    var geonameid= $(this).val();
    //console.log(geonameid);
    if(geonameid == 0){return;}

    var url = 'http://api.geonames.org/childrenJSON?lang='+language+'&geonameId='+geonameid+'&username=abdulnaser_mohsen'

    $.ajax
      ({
        type: 'GET', 
        url: url,
        dataType: 'json',  
        data: {},
        success: function (data) 
        {
          //console.log(data);
          //console.log(data.geonames);
          var results = [];
          
          $(data.geonames).each(function(i, item) 
          {
            //console.log(item.geonameId);
            //console.log(i);
            //console.log(data.geonames[i].countryName);
            results.push([data.geonames[i].name,item.geonameId]);
            results.sort();
            //console.log(results);
          }); 

          $(results).each(function(i, item) 
          {
              //console.log(item[0]);
              //console.log(item[1]);
              $('#stateId').append
              ('<option value='+ item[1] +'>'+ item[0] +'</option>');
          });
			
			try 
			{
				$("#stateId").msDropdown().data("dd").destroy();
				$("#stateId").msDropDown();
			} 
			catch(e) 
			{
				alert(e.message);
			}
          //console.log("done");
        
        },
        error:function(data)
        { 
          console.log(data);
        }
      });
  
  });


  $(document).on( "change","#stateId", function()
  {
	$("input[name='state']").val($("#stateId").children("option:selected").text());
	
    $('#cityId').html('<option value=0>Select City</option>');
    $('#cityId').parent().parent().removeClass('true-validate');
    
    var language= $("html").attr("lang");
    //console.log(language);
    
    var geonameid= $(this).val();
    //console.log(geonameid);
    if(geonameid == 0){return;}

    var url = 'http://api.geonames.org/childrenJSON?lang='+language+'&geonameId='+geonameid+'&username=abdulnaser_mohsen'

    $.ajax
      ({
        type: 'GET', 
        url: url,
        dataType: 'json',
        data: {},
        success: function (data) 
        {
          //console.log(data);
          //console.log(data.geonames);
          var results = [];
          
          $(data.geonames).each(function(i, item) 
          {
            //console.log(item.geonameId);
            //console.log(i);
            //console.log(data.geonames[i].countryName);
            results.push([data.geonames[i].name,item.geonameId]);
            results.sort();
            //console.log(results);
          }); 

          $(results).each(function(i, item) 
          {
              //console.log(item[0]);
              //console.log(item[1]);
              $('#cityId').append
              ('<option value='+ item[1] +'>'+ item[0] +'</option>').sort();
          });
			try 
			{
				$("#cityId").msDropdown().data("dd").destroy();
				$("#cityId").msDropDown();
			} 
			catch(e) 
			{
				alert(e.message);
			}
          //console.log("done");
        
        },
        error:function(data)
        { 
          console.log(data);
        }
      });
  
  });
  
  $(document).on( "change","#cityId", function()
  {
	$("input[name='city']").val($("#cityId").children("option:selected").text());
  });
	

});
  