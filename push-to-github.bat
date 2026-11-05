@echo off
echo ============================================================
echo   Red Blood Arena - Pushing to GitHub (Sohail-hack/Red-Blood)
echo ============================================================
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Code successfully pushed to https://github.com/Sohail-hack/Red-Blood !
) else (
    echo [ERROR] Push failed. Make sure you created the 'Red-Blood' repository on GitHub first:
    echo https://github.com/new
)
echo.
pause
