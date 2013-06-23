fs = require 'fs'
path = require 'path'
exec = require('child_process').exec

args = process.argv

#mkdir_p implementation from: https://gist.github.com/bpedro/742162
mkdir_p = (to_split="hello.coffee", cb, pos=0) ->

	tree = to_split.split('/')

	if pos is tree.length
		return cb null, to_split

	dir = tree.slice(0, pos+1).join '/'

	next = ->
		mkdir_p to_split, cb, pos+1

	if tree[pos] is ''
		next()
	else
		fs.exists dir, (exists) ->
			if exists then next()
			else
				fs.mkdir dir, (err) ->
					if err then cb err
					else next()

#CP Functionality from: http://stackoverflow.com/a/14387791
#Converted to Coffee by KingsRansom

cp = (source, target, cb) =>
  cbCalled = false;

  rd = fs.createReadStream source
  rd.on "error", (err) ->
    done err
  
  wr = fs.createWriteStream target
  wr.on "error", (err) ->
    done err

  wr.on "close", (ex) ->
    done()

  rd.pipe wr

  done = (err) ->
    if !cbCalled
      cb err
      cbCalled = true
    

ice = (toIce) =>
	toIce = toIce.split(".coffee")[0]
	exec "iced -c #{toIce}.coffee", (stdout, stderr, error) => 
				sys.print stdout
				sys.print stderr
				console.log error if error


PROJECT     = args[2]
SCRIPTDIR   = fs.realpathSync args[1]
GAMELABDIR  = "#{path.dirname(SCRIPTDIR)}/.."

mkdir_p(PROJECT)

PROJECTDIR  = fs.realpathSync PROJECT

process.chdir PROJECTDIR
fs.mkdir "shared"
fs.mkdir "client"
fs.mkdir "server"

cp "GAMELABDIR/.gitignore","./.gitignore"
fs.symlinkSync "#{GAMELABDIR}","gamelab.js",'dir'
process.chdir "client"
fs.mkdir "scenes"
fs.mkdir "classes"
fs.symlinkSync "#{GAMELABDIR}/client","gamelabClient",'dir'
fs.symlinkSync "#{GAMELABDIR}/shared","gamelabShared",'dir'
cp "#{GAMELABDIR}/server/example/clientCore.coffee","core.coffee"
ice "core"
cp "#{GAMELABDIR}/client/index.html","index.html"
process.chdir "scenes"
cp "#{GAMELABDIR}/server/example/scene.coffee","example.coffee"
ice "example"
process.chdir "../server"
fs.mkdir "classes"
cp "#{GAMELABDIR}/server/init.js","init.js"
cp "#{GAMELABDIR}/server/example/settings.coffee","settings.coffee"
cp "#{GAMELABDIR}/server/example/serverCore.coffee","core.coffee"
ice("core")
process.chdir "../.."






