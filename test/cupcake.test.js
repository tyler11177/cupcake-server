const request = require('supertest');
const app = require('../api/src/api'); 
const BASE_URL = '/v2/cupcake';
let newlyCreatedCupcakeId;
// Test suite for Cupcakes
describe('Cupcakes API', () => {
    
    const newCupcake = {
        name: 'Red Velvet',
        description: 'A delicious red velvet cupcake',
        price: 2.99,
        ingredients: ['flour', 'sugar', 'cocoa', 'cream cheese']
    };

    describe('POST /cupcakes', () => {
        it('should create a new cupcake', async () => {
            const response = await request(app)
                .post(BASE_URL)
                .send({body : newCupcake});
            newlyCreatedCupcakeId = response.body.id;
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(newCupcake.name);
            expect(response.body.description).toBe(newCupcake.description);
            expect(response.body.price).toBe(newCupcake.price);
            expect(response.body.ingredients).toEqual(expect.arrayContaining(newCupcake.ingredients));    
        });
    });

    // Test for Getting a Single Cupcake
    it('should retrieve a specific cupcake by id', async () => {
        const response = await request(app).get(`${BASE_URL}/${newlyCreatedCupcakeId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newCupcake.name);
        expect(response.body.description).toBe(newCupcake.description);
        expect(response.body.price).toBe(newCupcake.price);
        expect(response.body.ingredients).toEqual(expect.arrayContaining(newCupcake.ingredients));
    });

    // Test for Modifying a Single Cupcake
    describe('PUT /cupcakes', () => {
        modifiedCupcake = {
            price : 5.00,
            name: "Fancy New Name",
            description : "A fancy new cupcake",
            ingredients: ['milk', 'love']
        };
        it('should modify an existing cupcake', async () => {
            const response = await request(app)
                .put(`${BASE_URL}/${newlyCreatedCupcakeId}`)
                .send({body : modifiedCupcake});
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(modifiedCupcake.name);
            expect(response.body.description).toBe(modifiedCupcake.description);
            expect(response.body.price).toBe(modifiedCupcake.price);
            expect(response.body.ingredients).toEqual(expect.arrayContaining(modifiedCupcake.ingredients));    
        });
    });

    

    // Test for Listing All Cupcakes
    it('should list all cupcakes', async () => {
        const response = await request(app).get(BASE_URL);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    // Test for Deleting a Single Cupcake
    it('should delete a specific cupcake by id', async () => {
        const response = await request(app).delete(`${BASE_URL}/${newlyCreatedCupcakeId}`);
        expect(response.statusCode).toBe(200);
    });
});

