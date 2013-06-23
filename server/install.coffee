util = require 'util'
sys = require 'sys'
fs = require 'fs'
os = require 'os'
exec = require('child_process').exec

puts_console = (error, stdout, stderr, callback) => 
	sys.puts stdout
	callback

puts = (obj) =>
	util.puts obj

puts """ Hello there stranger, you seem to be using Windows to run this here highly optimized server platform. This is not reccomended or supported at this time!
if you'd like to run GameLab, please visit VirtualBox.com, virtualize a Linux distribution, and install this package again! We'll be waiting patiently until you do :)
""" if os.platform() is "win32"

center = (string,delim,times) =>
    a = (delim for i in [0..times/2])
    b = (delim for i in [0..times/2])
    puts(a.join("")+string+b.join(""))

npm_install = (module, global, callback) =>
	if fs.exists "#{__dirname}/node_modules"
		puts "module #{module} is already installed locally! Check the '#{__dirname}/node_modules' folder if you have issues"
	else if fs.exists "#{process.cwd}/node_modules"
		puts "module #{module} is already installed locally! Check the '#{process.cwd}/node_modules' folder if you have issues"
	else
		switch global
			when null
				global = ""
			when true
				global = "-g"
			when false
				global = ""
			else 
				global = ""
		center "Installing #{module}", "!", 10
		exec "npm install #{module} #{global}", (stdout, stderr, error) => 
			sys.print stdout
			sys.print stderr
			console.log error if error
			callback()

center "Installing NPM Modules!", "!", 10

modules = 
	"coffee-script": true
	"iced-coffee-script": true
	"requirejs": false
	"socket.io": false
	"watch": false

install_list = (list,index) =>
	if index < Object.keys(list).length
		npm_install Object.keys(list)[index], list[index], () =>
			install_list list, index+1
	if index == Object.keys(list).length
		we_done_now()

we_done_now = () =>
	center "Done", "-", 10
	puts """
	 README
	 
	 If you have an 'EROFS' error on a writable fs,
	 you need to tell VirtualBox to allow Symlinks on shared directories.
	 See https://www.virtualbox.org/ticket/10085#comment:12 for details

	 Installation Complete! Have a great day and happy hacking! - Gamelab"""


install_list modules, 0