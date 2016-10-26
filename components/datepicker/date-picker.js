
app.directive('datepicker', function ($parse) {
  return function (scope, element, attrs, controller) {
    var ngModel = $parse(attrs.ngModel);
    $(function(){
      element.datepicker({
        minDate : 0,
         onSelect:function (dateText, inst) {
            scope.$apply(function(scope){
                // Change binded variable
                ngModel.assign(scope, dateText);
            });
         }
      });
    });
  }
});