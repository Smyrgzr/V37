@echo off
REM Letwash - GitHub Push Script (Windows)
REM Bu dosyayı çalıştırmadan önce GitHub'da repository oluştur!

echo.
echo ==========================================
echo    Letwash GitHub Push Script
echo ==========================================
echo.

set /p GITHUB_USERNAME="GitHub kullanici adin: "
set /p REPO_NAME="Repository adi (varsayilan: letwash): "
if "%REPO_NAME%"=="" set REPO_NAME=letwash

echo.
echo [1/6] Git repository baslatiliyor...
git init

echo.
echo [2/6] Dosyalar ekleniyor...
git add .

echo.
echo [3/6] Ilk commit yapiliyor...
git commit -m "Initial commit: Letwash platform"

echo.
echo [4/6] Main branch olusturuluyor...
git branch -M main

echo.
echo [5/6] GitHub repository baglaniyor...
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo.
echo [6/6] GitHub'a push ediliyor...
echo UYARI: GitHub kullanici adi ve sifre/token sorulacak!
echo.
git push -u origin main

echo.
echo ==========================================
echo    TAMAMLANDI!
echo ==========================================
echo.
echo GitHub repository: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
pause
