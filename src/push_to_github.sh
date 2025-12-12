#!/bin/bash

# Letwash - GitHub Push Script
# Bu dosyayı çalıştırmadan önce GitHub'da repository oluştur!

echo "🚀 Letwash GitHub Push Script"
echo "================================"
echo ""

# Kullanıcıdan GitHub bilgilerini al
read -p "GitHub kullanıcı adın: " GITHUB_USERNAME
read -p "Repository adı (varsayılan: letwash): " REPO_NAME
REPO_NAME=${REPO_NAME:-letwash}

echo ""
echo "📦 Git repository başlatılıyor..."
git init

echo ""
echo "📁 Dosyalar ekleniyor..."
git add .

echo ""
echo "💾 İlk commit yapılıyor..."
git commit -m "Initial commit: Letwash platform with SSO, subscriptions, and business modules

- Authentication: Email/Password + SSO (Google, Apple, Microsoft)
- Business Modules: 6 different models
- Subscription Plans: Starter, Professional, Enterprise
- Frontend: React + TypeScript + Tailwind CSS v4
- Backend: Node.js + Express + Prisma + PostgreSQL"

echo ""
echo "🌿 Main branch oluşturuluyor..."
git branch -M main

echo ""
echo "🔗 GitHub repository bağlanıyor..."
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git

echo ""
echo "🚀 GitHub'a push ediliyor..."
echo "⚠️  GitHub kullanıcı adı ve şifre/token sorulacak!"
echo ""
git push -u origin main

echo ""
echo "✅ TAMAMLANDI!"
echo "GitHub repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""
