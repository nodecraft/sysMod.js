Installation
=============
    npm install sysmod

What does it do?
=============

sysUser is a simple wrapper for unix commands chown & chmod to make changes to system file permissions. The primary difference between this library and the methods in fs is that you can use usernames rather than the UID or GID. In order for this to work the calling program MUST be running as root or have permissions to the user commands in command line. This NPM module is still in early development and has only been tested on the listed operating systems:

 - CentOS 6

Coding Examples
=============
```javascript
    var sysMod = require('sysmod')();

    // set CHMOD
    sysMod.chmod('/home/custom/path','750',function(err,uid){
    	if(err){
    		console.log('ERROR',err);
    	}else{
    		console.log('Permission changed');
    	}
    });

    // set CHMOD Recursive
    sysMod.chmodr('/home/custom/path','750',function(err,uid){
        if(err){
            console.log('ERROR',err);
        }else{
            console.log('Permission changed');
        }
    });

    // set CHOWN
    sysMod.chown('/home/custom/path',{'user':'customUser','group':'customGroup'},function(err,uid){
        if(err){
            console.log('ERROR',err);
        }else{
            console.log('Permission changed');
        }
    });

    // set CHOWN Recursive (and omitting group)
    sysMod.chown('/home/custom/path','customUser',function(err,uid){
        if(err){
            console.log('ERROR',err);
        }else{
            console.log('Permission changed');
        }
    });
```
