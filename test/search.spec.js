let assert = require('assert');
let expect = require('chai').expect;
let should = require('chai').should();
let chai = require('chai');
chai.should();
let sinon = require('sinon');
let httpMocks = require('node-mocks-http');

//THE PLAN
//mock database
//call search functionality 
//expect ...

/*describe("See if mocha works", function(){
    it("should log hi", function (){
        console.log("hi");
    })
})*/

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
      }
    ]
  }

  let getResult = function(){
    router.route("/products/search").get((req, res) => {
      const keywords = req.query.keywords.split(" ");
      const result = db.get("products").filter((_) => {
        const fullText = _.description + _.name + _.color;
  
        return keywords.every((_) => fullText.indexOf(_) !== -1);
      });
  
      res.send(result);
    });
  }
  //in the it(should) 
  //let result = getResult(req, res);
  //assert result to what we want
  

describe("Search functionality", function(){
    

    /*it("Should return true", function(){
        
        expect(mockDB.products[0]).to.have.property("color");
    })*/
    it("Should return product when the product name does exist",function(){
      //this.skip();

      let req = httpMocks.createRequest({
        query: {
          keywords:'Essential'
        }
      }
      );
      let res = httpMocks.createResponse(); 
      let result = getResult();
      
    });
      


    it("Should return nothing when the product Id does not exist", function(){
      this.skip();

    })
    it("Should return matching products when just color is given", function(){
      this.skip();

    })
    it("Should return matching products when just price is given", function(){
      this.skip();

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