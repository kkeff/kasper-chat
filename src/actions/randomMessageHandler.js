export default function () {


  return {
    setNewTimer: function(){
      return setTimeout(function (){
        return {message: 'asdf', user: {name: 'hej', status: 'ONLINE'}}
      }, 3000);
    }
  }

}
