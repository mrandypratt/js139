let Account = (() => {
  return () => {
    function generateRandomDisplayName() {
      const CHARS = "abcdefghijklmnopqrstuvwxyz1234567890";
      const DISPLAY_LENGTH = 16;
      let charIndex;
      let newDisplayName = "";
      for (let idx = 0; idx < DISPLAY_LENGTH; idx++) {
        charIndex = Math.floor(Math.random() * (CHARS.length - 1));
        newDisplayName += CHARS[charIndex];
      }
      return newDisplayName;
    }
    
    function isValidPassword(password) {
      return password === userPassword;
    }
    
    let userEmail;
    let userPassword;
    let userFirstName;
    let userLastName;
    
    return {
      init(email, password, firstName, lastName) {
        userEmail = email;
        userPassword = password;
        userFirstName = firstName;
        userLastName = lastName;
        this.displayName = generateRandomDisplayName();
        return this;
      },
      
      reanonymize(password) {
        if (password === userPassword) {
          this.displayName = generateRandomDisplayName();
          return true;
        }
        return "Invalid Password";
      },
      
      resetPassword(currentPassword, desiredPassword) {
        if(isValidPassword(currentPassword)) {
          userPassword = desiredPassword;
          return true;
        }
        return "Invalid Password";
      },
      
      firstName(password) {
        return (isValidPassword(password)) ? userFirstName : "Invalid Password";
      },
      
      lastName(password) {
        return (isValidPassword(password)) ? userLastName : "Invalid Password";
      },
      
      email(password) {
        return (isValidPassword(password)) ? userEmail : "Invalid Password";
      },
    };
  };
})();

console.log()
let fooBar = Object.create(Account()).init('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password'
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false

let bazQux = Object.create(Account()).init('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.email('abc'));                  // logs 'Invalid Password'