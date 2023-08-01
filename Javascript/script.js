const person = {   name: 'Priya' };
var container = document.getElementById("div-element");
var paragraph = document.getElementById("p-element");
var text = document.getElementById("heading");
const array =[6,5,4,3,2,1];

//Dom Manipulation
paragraph.innerHTML = "This is a new paragraph";
container.appendChild(paragraph);
container.style.color = "#053eee";

console.log("Welcome to the great karikalan magic show \n", scopeFunction());

person.name = 'Dharshini' 
console.log(person.name)

function scopeFunction(){
    let myName = "Priya";
    this.value = 0;
    

    //Time out
    setTimeout(()=> {
        this.value++;
        console.log(this.value);
    },5000)

    console.log(myName);
}

//Error line no code ru after it
// console.log(myName);

//Arrow Function
const getPerson = () => ({name: "Surya", age: 24});
const arrowFunction = x =>{return x + 9 * 2};

console.log(arrowFunction(4));
console.log(getPerson());

function thisReference(){
    this.myVar = 0;
    var that = this; 
    setTimeout(
      function() { 
        that.myVar++;
        console.log(that.myVar);

        console.log(this.myVar);
     },0);
}

console.log(thisReference());

//Function and Dom manipulation
function display(){
    text.innerHTML = "Click on the button to submit";
}

//Arrays
console.log(array[0]);
console.log(array[2]);

array.push(4);
array.push(9);

array.unshift(8);
console.log(array);

array.splice(2,1);
console.log(array);

array.sort();

const newArray = array.concat([9,8]);
console.log(newArray);

//Strings
var s = "priya";
var s1 = "dharshini";
console.log(s.length);
console.log(s.indexOf("iya"));
console.log(s.toUpperCase());
console.log(s.concat(s1));
console.log(s.split("a"));
console.log(s.replace("a","e"))

//Loop
for(const value of array){
    console.log("value:" + value);
}

//Conditional Statement
var x = 5;

if( x < 5){
    console.log("x is less than 5");
}else{
    console.log("x is more than 5 or equal");
}

while(x <50){
    x*=2;
    // alert(x);

}

//Objects 
var student = {
    firstName: "Jane",
    lastName: "Doe",
    age: 18,
    height: 170,
    fullName : function(){
        return this.firstName + " " + this.lastName;
    },
};

student.age = 19;
student["age"]++;
var fullName = student.fullName();
console.log(fullName);

console.log(parseFloat(1.9874));

//Json
var str = '{"names":[' + '{"first":"Hakuna","lastN":"Matata" },' + '{"first":"Jane","lastN":"Doe" },' +'{"first":"Air","last":"Jordan" }]}';
var obj = JSON.parse(str);         
console.log(obj.names[1].first);   

str = { "name":"Jane", "age":18, "city":"Chicago" };
obj = JSON.stringify(str);                
console.log(obj);

// Promises
function sum(a,b){
    return new Promise(function (resolve, reject){
        setTimeout(function(){
            if(typeof a !== "number" || typeof b !== "number"){
                return reject(new TypeError("Inputs must be numbers"));
            }
            resolve(a+b);
        }, 1000);
    });
}

var myPromise = sum(10,5);
myPromise.then(function(result){
    console.log("10 + 5", result);
    return sum(null, "foo");
}).then(function(){

}).catch(function (err){
    console.error(err);
});

//Exception Handling
var x = 'edwewe';
try{
    if(x == "") throw "empty";
    if(isNaN(x)) throw "not a number";
    x = Number(x);
    if(x > 10) throw "too high";
}catch(err){
    console.log("Input is "+ err);
}finally{
    console.log("</br /Done");
}

var exp = "Priya2342414";
const re = /\d/;
console.log(exp.replace(re,"ed"));

