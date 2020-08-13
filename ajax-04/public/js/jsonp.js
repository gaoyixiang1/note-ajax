function jsonp(options){
    var script = document.createElement('script');
    var params = '';
    //attr是变量，.后面不能跟变量，因此用[]
    for(let attr in options.data){
        params+='&'+attr +'='+options.data[attr]
    }
    var fnName ='myJsonp'+ Math.random().toString().replace('.','');  
    window[fnName] = options.success
        script.src = options.url+'?callback='+fnName+params;
        document.body.appendChild(script);
        script.onload = function(){
            document.body.removeChild(script);
        }
  }