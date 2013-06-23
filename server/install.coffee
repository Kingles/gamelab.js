
util = require('util')
sys = require('sys')
exec = require('child_process').exec;
fs = require('fs')


puts_console = (error, stdout, stderr, callback) -> 
	sys.puts(stdout)
	callback

puts = (obj) ->
	util.puts(obj)

center = (string,delim,times) ->
    a = (delim for i in [0..times/2])
    b = (delim for i in [0..times/2])
    puts(a.join("")+string+b.join(""))

npm_install = (module, global, callback) ->
	if fs.exists("#{__dirname}/node_modules")
		puts("module #{module} is already installed locally! Check the '#{__dirname}/node_modules' folder if you have issues")
	else if fs.exists("#{process.cwd}/node_modules")
		puts("module #{module} is already installed locally! Check the '#{process.cwd}/node_modules' folder if you have issues")
	else
		puts("made it to the installer..")
		global = "" if global == null
		center("Installing #{module}","!",10)
		exec("npm install #{module} #{global}")
		callback if callback


center("Installing NPM Modules!","!",10)

modules = {"coffee-script": true, "iced-coffee-script": true, "requirejs": false, "socket.io": false, "watch": false}

install_list = (list,index) ->
	puts list
	puts index
	npm_install(Object.keys(list)[index], list[index], install_list(list, index+1) ) if index >= Object.keys(list).length


install_list(modules, 0)


center("Done","-",10)
puts( """
 README
 
 If you have an 'EROFS' error on a writable fs,
 you need to tell VirtualBox to allow Symlinks on shared directories.
 See https://www.virtualbox.org/ticket/10085#comment:12 for details

 Installation Complete! Have a great day and happy hacking! - Gamelab""")
