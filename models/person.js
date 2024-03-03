const mongoose = require('mongoose');

// define the person schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required: true
    }
});

// create person model
// NOTE: In Mongoose, if you create a model without explicitly specifying a collection name, Mongoose will pluralize the name of the model to determine the collection name. In your case, since your model is named "Person", Mongoose will pluralize it to "people" and use that as the collection name by default. This is a common convention in MongoDB and Mongoose for naming collections.
// If you want to explicitly specify a different collection name, you can do so by passing the desired collection name as the third argument when creating the model using mongoose.model(). 
// For example: "const Person = mongoose.model('Person', personSchema, 'my_custom_collection_name');"
// Also, NOTE that: the below code is a way to generate the model(blueprint of Collection) 
// And the parameters are ('EachDocumentName' -> 'Person', DocumentSchema -> personSchema, 'CollectionName' -> 'YourCustomCollectionName')
const Person  = mongoose.model('Person', personSchema);

module.exports = Person;