const User = require("../models/User")

const checkuserlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       console.log(input)
       const user = await User.findOne(input)
       response.json(user)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
      
     }
   };


   const insertuser = async (request, response) => {  //to insert jobseeker
    try 
    {
      const input = request.body;
      const user = new User(input);
      await user.save();
      response.send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
      
    }
  };
  const updateuserprofile = async (request, response) => 
  {
    try 
    {
      const input = request.body;
      const email = input.email; 
      const user = await User.findOne({ email });
      if (!user) 
      {
        response.status(200).send('User not found with the provided email id');
      }
      for (const key in input) 
      {
        if (key !== 'email' && input[key]) {
          user[key] = input[key];
        }
      }
      await user.save();
      response.status(200).send('User Profile Updated Successfully');
    } 
    catch (e) 
    {
      response.status(500).send(e.message);
    }
  };
  const userprofile = async (request, response) => 
  {
     try 
     {
       const email = request.params.email
       const user = await User.findOne({email})
       if(user)
       {
         response.json(user)
       }
       else
       {
         return response.status(200).send('User not found with the provided email id');
       }
       
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };


  module.exports = {checkuserlogin,insertuser,updateuserprofile,userprofile}