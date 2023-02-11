const { request, expect } = require("./config");

describe("POST /authentications", function () {
  it("Success login ", async function () {
    const response = await request.post("/authentications")
  
      .send({ 
          email: "ghalatest@gmail.com",
          password: "Ghala2022"
       
           
  })
    expect(response.status).to.eql(201);
    var data = response.body.datac
    expect(data.accessToken).to.be.a('string')
   token = response.body.data.accessToken;
   refreshToken = response.body.data.refreshToken;
    });
  });
  describe("POST /authentications", function () {
    it("Fail login ", async function () {
      const response = await request.post("/authentications")
    
        .send({ 
            email: "",
            password: ""
         
             
    })
      expect(response.status).to.eql(400);
      const data = response.body
      expect(data.status).to.eql('fail')
      expect(data.message).to.eql('\"email\" is not allowed to be empty')

      });
    });

describe("POST /units", function () {
    it("Success Units - Add Unit ", async function () {
      const response = await request.post("/units")
        .set("Authorization", `Bearer ${token}`)
        .send({ 
        name: "Gula", 
        description: "Manis"
    });
  
      expect(response.status).to.eql(201);
  
      const body = response.body;
      expect(body.status).to.eql('success');
      expect(body.message).to.eql("Unit berhasil ditambahkan");
      
    
      const dataUnit = response.body.data;
      const isValid = isUUID(dataUnit.unitId);
      expect(isValid).to.be.true;
      expect(dataUnit.name).to.eql("Gula");
      uuid = response.body.data.unitId
    });
});
function isUUID(str) {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(str);
}
describe("POST /units", function () {
  it("400 - Bad Request ", async function () {
    const response = await request.post("/units")
      .set("Authorization", `Bearer ${token}`)
      .send({ 
      name: "", 
      description: ""
  });

    expect(response.status).to.eql(400);

    const body = response.body;
    expect(body.status).to.eql('fail');
    expect(body.message).to.eql("name is required, description is optional");
  });
});
describe("GET /units/${uuid}", function () {
  it("Success Units - Get Unit Detail ", async function () {
    const response = await request.get(`/units/${uuid}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ 
       
  });

    expect(response.status).to.eql(200);
    const body = response.body;
    expect(body.status).to.eql('success');
    const data = response.body.data.unit;
    expect(data.name).to.eql("Gula");
    expect(data.description).to.eql("Manis");
  });
});
describe("GET /units?q=Gula&page=1", function () {
    it("Success Units - Get Unit List ", async function () {
      const response = await request.get("/units?q=Gula&page=1")
        .set("Authorization", `Bearer ${token}`)
        .send({ 
         
    });
  
      expect(response.status).to.eql(200);
      const body = response.body;
      expect(body.status).to.eql('success');
      const unit = response.body.data.units[0];
      const isValid = isUUID(unit.id);
      expect(isValid).to.be.true;
      expect(unit.name).to.eql('Gula');
      expect(unit.description).to.eql('Manis');
      const meta = response.body.data.meta;
      expect(meta.totalPages).to.be.at.least(1);
      expect(meta.total).to.be.at.least(1);
      expect(meta.page).to.eql("1");
    });
  });
  function isUUID(str) {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidPattern.test(str);
  }
  describe("PUT /units/${uuid}", function () {
    it("Success Units - Update Unit ", async function () {
      const response = await request.put(`/units/${uuid}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ 
          
            name: "GulaUpdated",
            description: "Ga Manis"
        
    });
  
      expect(response.status).to.eql(200);
      const body = response.body;
      expect(body.status).to.eql('success');
      const data = response.body.data;
      expect(data.name).to.eql("GulaUpdated");
    });
  });
  describe("DELETE /units/${uuid}", function () {
    it("Success Units - Delete Unit ", async function () {
      const response = await request.delete(`/units/${uuid}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ 
    });
  
      expect(response.status).to.eql(200);
      const body = response.body;
      expect(body.status).to.eql('success');
    });
  });
  describe("Delete /authentications", function () {
    it("Success Delete ", async function () {
      const response = await request.delete("/authentications")
      .send({ 
        
        refreshToken:refreshToken

             
    });
  
      expect(response.status).to.eql(200);
      const data = response.body
      expect(data.status).to.eql('success');
      expect(data.message).to.eql('Refresh token berhasil dihapus');
      });
    });