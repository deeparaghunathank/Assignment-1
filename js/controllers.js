var myApp = angular.module("myApp",[]);

myApp.controller('myCtrl', function($scope, $http, $rootScope) {
    $scope.posts; //variable to store json data
    $scope.cart = []; // variable to store items added to cart
    $scope.outerContainerClass = "products-list-container";
    
    $scope.TotalNoOfItems = 0;
    $scope.TotalCostOfItems = 0;
    if (!$rootScope.postSave) {
        //method to extract the data from the posts.json file.
        $http({method: 'GET', url: 'js/posts.json'}).success(function(data)
        {
            $scope.posts = data; //response data 
        });
    }
    else{
        $scope.posts = localStorage.getItem("posts"); //set data from the localstorage
    }
    
    if($rootScope.cartSave){
        $scope.cart = $rootScope.cartSave; //set cart data from the localStorage
    }
    
    //method called when user clicks on the add cart button.
    $scope.addItemToCart = function(item){
        item.quantity ++;
        $scope.cart.push(item);
        $scope.TotalNoOfItems ++;
        $scope.TotalCostOfItems += item.cost;        
    };
    
    $scope.loadCartClass = function(){
        $scope.outerContainerClass = "products-list-container-shrink";
    };
    
    $scope.decreaseQuantity = function(item){
        item.quantity--;
        if(item.quantity == 0){
            $scope.removeItemFromCart(item);
        }else{
            $scope.TotalNoOfItems --;
            $scope.TotalCostOfItems -= item.cost;
        }
    };
    
    $scope.removeItemFromCart = function(item){
        var tempObj;
        for(var i=0;i<$scope.cart.length;i++){
                if(item.productName == $scope.cart[i].productName){
                    tempObj = $scope.cart.splice(i,1);
                    break;
                }
            }
        $scope.TotalNoOfItems -= item.quantity;
        $scope.TotalCostOfItems -= (item.cost * item.quantity);  
        item.quantity = 0;
        if(!$scope.cart.length){
            $scope.outerContainerClass = "products-list-container";
        }
    };
    
    $scope.increaseQuantity = function(item){
        item.quantity++;
        $scope.TotalNoOfItems ++;
        $scope.TotalCostOfItems += item.cost;
    };
    
    $scope.$on('$destroy', function() {
        $rootScope.postSave = $scope.posts;
        $rootScope.cartSave = $scope.cart;
    });
    
});