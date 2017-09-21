@echo off
echo.
taskkill /IM cmd.exe /FI "WINDOWTITLE eq npm"
cls
set NodePackagesPath=C:\Program Files\nodejs

set Path=%NodePackagesPath%\node_modules\.bin;%PATH%
set Path=%NodePackagesPath%;%PATH%

set NODE_PATH=%NodePackagesPath%\node_modules;%NODE_PATH%
set NODE_ENV=debug
set PORT=80
set DB_HOST=cadmas.cegpb2uou7a1.eu-west-1.rds.amazonaws.com
set DB_USER=server_user
set DB_PASSWORD=eua100DPME
set DB_PORT=3306
set DB_DB=cadmas



npm run dev
pause