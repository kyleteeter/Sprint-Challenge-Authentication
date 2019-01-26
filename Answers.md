What is the purpose of using sessions?
Sessions allow the client to remember that a user is logged in and authorized to see certain pages. This makes it so that the user does not have to constantly log in to see each new protected page that is entered.

What does bcrypt do to help us store passwords in a secure manner.
Bcrypt is used to hash passwords in a one-way encryption. This means that the passwords are only ever saved to the database in the encrypted form so if someone hacks the data base if the password is still long enough it would take too long to actually hack the password.

What does bcrypt do to slow down attackers?
Since it is hashing the password and it also can have a login delay the hacker could use a computer program to try to run all of the variables but it would potentially take years. If we did not use something like bcrypt the password would be wide open for anyone with access to the database. 

What are the three parts of the JSON Web Token?
The 3 parts are Header, Payload, and  Signature. When the code is written out these are each seperated by a period. 