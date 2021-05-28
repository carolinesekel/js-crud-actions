let assert = require('assert');
let expect = require('chai').expect;
let should = require('chai').should();
let chai = require('chai');
chai.should();
let sinon = require('sinon');
let httpMocks = require('node-mocks-http');
var express = require("express");
var router = express.Router();
const qs = require("qs");

//THE PLAN
//mock database
//call search functionality 
//expect ...

//copy of producta database, separate from actual dtabase for testing 
 let db = {
    "products": [
      {
        "name": "Essential Backpack",
        "price": 259.99,
        "quantity": 5,
        "color": "orange",
        "id": "0124081a-4daa-425a-bb40-d5c016893fe3",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Risus quis varius quam quisque. Quis risus sed vulputate odio. Ultrices eros in cursus turpis. Est velit egestas dui id ornare arcu. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Dictumst quisque sagittis purus sit amet volutpat. Sed libero enim sed faucibus turpis in eu. Dui vivamus arcu felis bibendum ut tristique et egestas."
      },
      {
        "name": "beanie",
        "price": "12.99",
        "quantity": "45",
        "description": "keeps ur noggin warm",
        "color": "blue",
        "id": "338d1f57-9b78-4b4a-9a3f-534c850f116c"
      },
      {
        "name": "sandals",
        "price": "12.99",
        "quantity": "2",
        "description": "swag feet covers",
        "color": "orange",
        "id": "338d1f57-9b78-5b4a-5a3f-534c850f116c"
      }
    ]
  }

//search functionality from products.js, copied here and wrappted in a function 
//separated the actual search functionality from inside the router.route...
//needed to mock the router a different way? 
//how would we have mocked the router.route, because I doubt just commenting the lines out was the right thing to do 
//how would we have accessed this code from the ther file if it was not exported as a module or anything? 
//or is that something we would have had to refactor 

//req and res are mocked inside the test
  function getResult(req, res){
    //check if inside the function 
    //console.log("we're in");

    //router.route("/products/search").get((req, res) => {

      //keywords is set inside the mock, hardcoded with what we want to test in each case
      const keywords = req.query.keywords.split(" ");
      //console.log(keywords);
      /*this line was changed to just access the mock databse object above, using correct mocking 
      of router might have allowed us to keep this line the same*/
      const result = db["products"].filter((_) => {
        const fullText = _.description + _.name + _.color;
        //console.log(fullText);
        return keywords.every((_) => fullText.indexOf(_) !== -1);
      });
      
      res.send(result);

    //}
    //);
  }

describe("Search functionality", function(){

    it("Should return product when the product name does exist",function(){
      let req = httpMocks.createRequest();
      req.query.keywords = "Essential";
      let res = httpMocks.createResponse(); 
      //getResult.bind(req, res);
      getResult(req, res); 
      //console.log('Result:');
      //console.log(result._getData());
      let returnedProductList = res._getData();
      //console.log(returnedProductList);
      //breaks
      //expect(hope[0]).to.include({'name': 'Essentials Backpacks'});
      expect(returnedProductList[0]).to.include({'name': 'Essential Backpack'});
    });
      


    it("Should return nothing when the product name does not exist", function(){
      let req = httpMocks.createRequest();
      req.query.keywords = "cat";
      let res = httpMocks.createResponse(); 
      //getResult.bind(req, res);
      getResult(req, res); 
      //console.log('Result:');
      //console.log(result._getData());
      let returnedProductList = res._getData();
      //console.log(returnedProductList);
      //breaks
      //expect(hope[0]).to.include({'name': 'Essentials Backpacks'});
      expect(returnedProductList[0]).to.include({});

    })
    it("Should return matching products when just color is given", function(){
      let req = httpMocks.createRequest();
      req.query.keywords = "orange";
      let res = httpMocks.createResponse(); 
      //getResult.bind(req, res);
      getResult(req, res); 
      //console.log('Result:');
      //console.log(result._getData());
      let returnedProductList = res._getData();
     // console.log(returnedProductList);
      //breaks
      expect(returnedProductList[0]).to.include({'name': 'Essential Backpack'});
      expect(returnedProductList[1]).to.include({'name': 'sandals'});

    })
    it("Should return matching products when just price is given", function(){
      this.skip();
      expect(true).to.be.false;

    })
    it("Should return nothing when no producuts match provided color", function(){
      this.skip();

    })
    it("Should return nothing when no producuts match provided price", function(){
      this.skip();

    })
    it("Should return everything when no search parameters are given", function(){
      this.skip();

    })

})