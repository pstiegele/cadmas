@echo off
echo.

set NodePackagesPath=C:\Program Files\nodejs

set Path=%NodePackagesPath%\node_modules\.bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=debug
set PORT=80



node app.js
pause