(function($){
  $(function(){
    $('.button-collapse').sideNav();
  });
})(jQuery);

String.prototype.upCaseFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
