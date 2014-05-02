var cp = require('child_process'),
	exec = cp.exec,
	perms = require('perms');

module.exports = function(){
	var helper = {
		buildModTarget: function(mod){
			var returnMod = false,
				modLen = String(mod).length;
			if(typeof mod == 'string' && mod.length == 9){
				returnMod = perms.toMode(mod);
				// check if mode resolved in 0000 due by default & not intentional
				if(mod!='---------' && returnMod == '0000'){
					returnMod = false;
				}
			}else if(!isNaN(parseInt(mod))){
				if(modLen >= 3 && modLen <=4){
					returnMod = '';
					if(modLen == 3){
						returnMod = '0';
					}
					returnMod = returnMod+String(mod);
				}
			}
			return returnMod;
		},
		buildOwnTarget: function(targets){
			if(typeof targets == 'object'){
				if(targets.user != undefined){
					var user = targets.user;
					if(targets.group != undefined){
						user = String(user)+":"+String(targets.group)
					}
					return user;
				}else{
					console.log('bad object');
					return false;
				}
			}else if(typeof targets == 'string'){
				return targets;
			}else{
				console.log('default');
				return false;
			}
		},
		chmodFn: function(path,mod,recursive,callback){
			var mod = this.buildModTarget(mod),
				r = '';
			if(recursive==true){
				r = ' -R';
			}
			if(mod == false){
				callback('Invalid mod provided');
			}else{
				exec('chmod'+r+' '+String(mod)+' '+String(path),function(error,stdout,stderr){
					if(error){
						callback(stderr);
					}else{
						callback();
					}
				});
			}
		},
		chownFn: function(path,targets,recursive,callback){
			var target = this.buildOwnTarget(targets),
				r = '';
			if(recursive==true){
				r = ' -R';
			}
			if(target == false){
				callback('Invalid user/group combination provided');
			}else{
				exec('chown'+r+' '+String(target)+' '+String(path),function(error,stdout,stderr){
					if(error){
						callback(stderr);
					}else{
						callback();
					}
				});
			}
		}
	};

	return {
		chmod: function(path,mod,callback){
			helper.chmodFn(path,mod,false,callback);
		},
		chmodr: function(path,mod,callback){
			helper.chmodFn(path,mod,true,callback);
		},
		chown: function(path,mod,callback){
			helper.chownFn(path,mod,false,callback);
		},
		chownr: function(path,mod,callback){
			helper.chownFn(path,mod,true,callback);
		}
	}
}