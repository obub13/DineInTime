const database = 'DineInTime';

// The current database to use.
use(database);

// Create a new collection.
db.createCollection("users");

// Insert values to collection
db.users.insertMany([
	{email: "jane@example.com", phone: "051-1111111", username: "jane_doe", 
	image: "https://example.com/jane.jpg", password: "jane123", verify: "jane123"},  
	{email: "john@example.com", phone: "052-2222222", username: "john_doe", 
	image: "https://example.com/john.jpg", password: "john123", verify: "john123"},  
	{email: "alice@example.com", phone: "053-3333333", username: "alice_smith",
	image: "https://example.com/alice.jpg", password: "alice123", verify: "alice123"},
	{email: "bob@example.com", phone: "054-4444444", username: "bob_jones",
    image: "https://example.com/bob.jpg", password: "bob123", verify: "bob123"},
	{email: "jim@example.com", phone: "055-5555555", username: "jim_wilson", 
	image: "https://example.com/jim.jpg", password: "jim123", verify: "jim123"}
]);
