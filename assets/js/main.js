$(function(){

	//$('#tmpdump').text('stuff');

	var GithubUsername, GithubToken;

	//user auth -- oauth only with personal token
	//$('#cloneit').on('click', function(){
	
		$('#authUser').submit(function(e){
		e.preventDefault();
		
		GithubUsername = $('#gitusername').val();
		GithubToken = $('#gitpassword').val();
		GithubDir = $('#gitdir').val();
		//tmp
		GithubRepo(GithubDir);
		
		return false;
	
		});	
	
	
	//});
	
	
	var GithubLogin = function(PersonalAccessToken){
	
		var github = new Github({
		
			token: PersonalAccessToken,
			auth: 'oauth'
			
		
		});
		
		return github;
	
	}
	
	var GithubRepo = function(repofilepath){
	
		var path = repofilepath.split("/");
		var _repo = path[0];
		//alert(_repo);	
		//alert(_path);
		
		var _github = GithubLogin(GithubToken);
		var repo = _github.getRepo(GithubUsername, _repo);
		
		/*
		repo.write('master', 'githubjs.js', function(err, data){
		
			$('#tmpdump').text(err);
			$('#tmpdump').text(data);
		
		});
		*/
		
		//tell githubjs the path to write to
		var dirlen = path.length;
		var _path = '';
		var githubjs = $('#cloneurl').val();
		
		for(var i=1;i < dirlen;i++){
		
			if(i === (dirlen - 1)){
			
				_path += path[i];
			
			} else {
			
				_path += path[i] + "/";	
				
			}
		
		}		
		
		//go get info and clone it
		$.ajax({
		
			url: githubjs,
			dataType: 'jsonp',
		
		}).success(function(data){
		
			var content = data;
			
			repo.write('master', _path, content, 'cloned with gitcloneit', function(err) {
    		
				$('#tmpdump').text(err);
				$('#tmpdump').text(content);
  		
			});		
		
		
		
		}).error(function(){
		
			$('#tmpdump').text('something went wrong.');
		
		});
	
	}



});
