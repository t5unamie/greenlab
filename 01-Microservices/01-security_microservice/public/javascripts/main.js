$('.remove-doc').on('click', function() {
      var taskid = $(this).attr('data-id');
      $.ajax({
         method: "POST",
         url: "/delete",
         data: {"taskid": taskid },
         success: function(result) {
            if( result.success == true ) {
               if(!alert("Entry deleted")){window.location.reload();}
            } else {
               if(!alert("Entry most likly no longer exists")){window.location.reload();}      
            }
         }
      })
   });