$( document ).ready(function() {
 
  // Populate locations select field on page load.
  getStoreLocations();
  
  function getStoreLocations() 
  {
       // Get the Click and Collect item from your store. 
       jQuery.getJSON('/products/click-and-collect.js', function(data) {  
       	
         	// We only need the variants.
         	var selectValues = data.variants;
         	
         	// Add each variant (location) to the select field. 
         	$.each(selectValues, function(id, variant) { 
              
                jQuery("#clickAndCollectVariantId")
                    .append($("<option></option>")
                    .attr("value", variant.id)
                    .text(variant.title)); 
            

            });
       
         	// Get the selected location ID.
            var variantid = $("#selectedClickAndCollectId").val();
         
            // Set the selected location in the select field.
            jQuery("#clickAndCollectVariantId").val(variantid);
       });
  }
  
  
  function removeClickAndCollectItem()
  {
     if($("#selectedClickAndCollectId").val() != '') {
       
        var item = {};
        item[$("#selectedClickAndCollectId").val()] = 0;
          
        $.ajax({
            url: "/cart/update.js",
            type: 'POST',
            data: { "updates": item },
            complete: function(msg){ 
                if($("#selectedClickAndCollectId").val() == "none") {
                    window.location.replace("/cart");
                }	
            }
        });
       
      }
  }

  $("#saveClickAndCollectLocation").on("click", function() {
	  
      // Remove the existing Click & Collect item from the basket.
      removeClickAndCollectItem();
    
      var clickAndCollectVariantId = $("#clickAndCollectVariantId option:selected").val();
    
      if(clickAndCollectVariantId != "") {

          var item = {
            quantity: 1,
            id: clickAndCollectVariantId
          }

          $.ajax({
              url: "/cart/add.js",
              type: 'POST',
              data: item,
              complete: function(msg){ 
                  window.location.replace("/cart");
              }
          });
        
      }
    
      return false;
      
  });
});
