set jpgsettings={"quality":95,"separate_chroma_quality":true,"chroma_quality":80}
set resize900={"enabled":true,"width":900}
set resize740={"enabled":true,"width":740}
set resize540={"enabled":true,"width":540}
set resize450={"enabled":true,"width":450}
set resize370={"enabled":true,"width":370}
set resize270={"enabled":true,"width":270}


echo —жатие базовых фоток
:: ѕопадают в папку .compressed, чтобы случайно не испортить существующие рабочие
for /f tokens^=* %%i in ('where ./.uncompressed:*.jpg')do cmd /C squoosh-cli -d .compressed --mozjpeg %jpgsetings% %%~fi

echo набор на 900px

for /f tokens^=* %%i in ('where ./.uncompressed:project*.jpg')do cmd /C squoosh-cli -d 900 --resize %resize900% --mozjpeg %jpgsettings% %%~fi
for /f tokens^=* %%i in ('where ./.uncompressed:member*.jpg')do cmd /C squoosh-cli -d 900 --resize %resize900% --mozjpeg %jpgsettings% %%~fi

echo набор на 740px

for /f tokens^=* %%i in ('where ./.uncompressed:about*.jpg')do cmd /C squoosh-cli -d 740 --resize %resize740% --mozjpeg %jpgsettings% %%~fi

echo набор на 540px

for /f tokens^=* %%i in ('where ./.uncompressed:member*.jpg')do cmd /C squoosh-cli -d 540 --resize %resize540% --mozjpeg %jpgsettings% %%~fi

echo набор на 450px

for /f tokens^=* %%i in ('where ./.uncompressed:project*.jpg')do cmd /C squoosh-cli -d 450 --resize %resize450% --mozjpeg %jpgsettings% %%~fi
for /f tokens^=* %%i in ('where ./.uncompressed:member*.jpg')do cmd /C squoosh-cli -d 450 --resize %resize450% --mozjpeg %jpgsettings% %%~fi

echo набор на 370px

for /f tokens^=* %%i in ('where ./.uncompressed:about*.jpg')do cmd /C squoosh-cli -d 370 --resize %resize370% --mozjpeg %jpgsettings% %%~fi

echo набор на 270px

for /f tokens^=* %%i in ('where ./.uncompressed:member*.jpg')do cmd /C squoosh-cli -d 270 --resize %resize270% --mozjpeg %jpgsettings% %%~fi
