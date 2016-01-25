$(document).ready(function () {
  $.ajax({url: "/info" }).done(function(response) {
      console.log(response);
  });
});
