set jpgsettings={"quality":95,"separate_chroma_quality":true,"chroma_quality":80}
set resize900={"enabled":true,"width":900}
set resize740={"enabled":true,"width":740}
set resize450={"enabled":true,"width":450}
set resize370={"enabled":true,"width":370}
set resize270={"enabled":true,"width":270}
set resize540={"enabled":true,"width":540}


for /f tokens^=* %%i in ('where ./.uncompressed:member*.jpg')do cmd /C squoosh-cli -d 540 --resize %resize540% --mozjpeg %jpgsettings% %%~fi
