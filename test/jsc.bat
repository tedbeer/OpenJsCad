@echo off
SET JSC_HOME=D:\Dev\jscoverage-0.5
SET JSCAD_HOME=D:\Dev\3D-printer\OpenScad\MyGitOpenJsCad
%JSC_HOME%\jscoverage-server.exe --document-root=%JSCAD_HOME% --encoding=UTF-8 --no-instrument=test/lib --port=555 --report-dir=%JSCAD_HOME%\test\report
