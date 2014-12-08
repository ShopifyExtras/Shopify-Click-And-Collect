$( document ).ready(function() {
  
  $("#savePickupLocation").on("click", function() {
	         
      if($("#selectedStorePickupId").val() != '') {
        var item = {};
        item[$("#selectedStorePickupId").val()] = 0;
          
        // Remove existing item. 
        var response = jQuery.post('/cart/update.js', { "updates": item });

        // Remove existing_pickup_id. 
        $("#selectedStorePickupId").val("");
      } 
    
      if($("#storePickupVariantId option:selected").val() != "") {
          
          var item = {
              quantity: 1,
              id: $("#storePickupVariantId option:selected").val()
          }

          var response = jQuery.post('/cart/add.js', item);   
        
          console.log(response);
          alert("Pickup location set.");
        
      } 
      return false;
      
  });
});
