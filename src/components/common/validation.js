module.exports = {
  checkEmail: function(text){
    let re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    if(re.test(text)){
      return { success: true };
    }else{
      return { success: false, message: 'Not a valid email address' };
    }
  },

  checkPassword: function(text){
    if(text.length > 0){
      return { success: true };
    }else{
      return { success: false, message: 'Not a valid password' };
    }
  }
};
