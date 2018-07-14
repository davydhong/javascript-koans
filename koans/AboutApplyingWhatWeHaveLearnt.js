var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];
    
    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }
    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

        var productsICanEat = _.filter(products, function(obj){
          return obj.containsNuts === false && !_.contains(obj.ingredients, "mushrooms");
        });
      
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum3 = function(num){
      if (num === 0){
        return 0;
      } else if (num % 5 === 0 || num % 3 === 0){
        return num + sum3(num-1);
      } else {
        return sum3(num-1);
      }
    };    
    // console.log(sum3(15));


    /* try chaining range() and reduce() */
    var sum2 = _.reduce(_.range(1,1000,1), function(memo, num){
      if (num%5===0 ||  num %3 ===0){
        return memo + num;
      } else {
        return memo;
      }
    },0)
    console.log(sum2);
    
    expect(233168).toBe(sum3(1000-1));
    expect(233168).toBe(sum2);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
            // console.log(ingredientCount[products[i].ingredients[j]] );   
        }
    }
    // console.log(products);
    // console.log(ingredientCount);
    
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount= _.chain(products)
      .map(function(pizza){return pizza.ingredients})
      .flatten()
      .reduce (function (counts, ing) { 
        counts[ing] = (counts[ing] || 0) + 1;
        return counts; },{})
      .value();

    
    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    // var bigPrime = function (n){
    //   for (var i = 2; i < n; i++){
    //     if (n%i == 0){
    //       return bigPrime(n-1);
    //     }
    //   }
    //   return n;
    // }
    var primes = [];
    var bigPrime2 = function (n){
      // console.log(n);
      // console.log(primes);
      if (n == 1){
        return primes;
      } else {
      for (var i = 2; i < n; i++){ 
        if (n%i == 0){
          primes.push(i);
          n /= i;
          return bigPrime2(n);
          } 
        }
      primes.push(n);
      return primes;
      }
    }
    // console.log(bigPrime2(100));
    expect(bigPrime2(100).slice(-1)[0]).toBe(5)
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
      var result = [];
        for (var i =999 ; i >= 900; i--){
          for ( var j = 999 ; j >= 900 ; j--){
              var prod = i*j;
                if (prod === parseInt( prod.toString().split("").reverse().join("") ) ){
                  // console.log("hi");
                  result.push(i*j);
                }
          }
        }
      
        function sort(arr){
          for (var i =0 ; i < arr.length-1; i++){
            if ( arr[i] > arr[i+1] ){
               arr = arr.slice(0,Math.max(i,0)).concat(arr[i+1]).concat(arr[i]).concat(arr.slice(i+2, arr.length));
            return sort(arr);             
            }
          }
          return arr;
        }
        var sorted = sort(result);
        var answer = _.unique(sorted).slice(-3)
      // console.log(answer);
      // expect(answer.toString()).toBe('[886688, 888888, 906609]');
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    var oneToTwenty = function(n){
      for (var i = 3 ; i < 20 ; i++){
        if (n % i !== 0){
          // console.log(n + " : " + i);
          
          return oneToTwenty(n*i);
        }
      }
      return n;
    }
    var answer = oneToTwenty(20);
    
    expect(answer).toBe(1396755360);
  });
  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var SSqVSqS = function (n1, n2){
      var SSq = n1**2 + n2**2; //sum of the squares
      var SqS = (n1+n2)**2;//squares of the sums
      
      
      return  SSq - SqS  ;
    }
    var answer = SSqVSqS(13,10);
    expect(answer).toBe(-260);
  });

  it("should find the 10001st prime", function () {
    

  
  function findNextPrime(n){
    var num = n+1;
    var foundPrime = false;
    while (foundPrime == false){
      var foundPrime = true;
      for(var i = 2; i < num ; i ++){
        if (num % i == 0){
          num++;
          foundPrime = false;
        }
      }
    if (foundPrime = true){
      return num;
    }
    }
  }
  
  function findNTHPrime(th){
    var counter = 0;
    n=1
    while (counter < th){
      n = findNextPrime(n)
      counter ++;
    }
    return n
  }
    // console.log(findNTHPrime(10001));
    var answer = findNTHPrime(10001);
    expect(answer).toBe(54697);
  });
  
});
