# Make.ps1 - PowerShell script to simulate Makefile commands for Windows
# Usage: .\make.ps1 <command>

param(
    [Parameter(Position=0)]
    [string]$Command = "help"
)

function Show-Help {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "                     Contact CRM - PowerShell Commands                      " -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "General Commands:" -ForegroundColor Yellow
    Write-Host "  .\make.ps1 help              Display this help message" -ForegroundColor Green
    Write-Host "  .\make.ps1 info              Show project information" -ForegroundColor Green
    Write-Host "  .\make.ps1 status            Show running Docker containers" -ForegroundColor Green
    Write-Host ""
    Write-Host "Development Commands:" -ForegroundColor Yellow
    Write-Host "  .\make.ps1 install           Install npm dependencies" -ForegroundColor Green
    Write-Host "  .\make.ps1 dev               Start development server (port 4200)" -ForegroundColor Green
    Write-Host "  .\make.ps1 build             Build for production" -ForegroundColor Green
    Write-Host "  .\make.ps1 watch             Build in watch mode" -ForegroundColor Green
    Write-Host ""
    Write-Host "Testing & Quality:" -ForegroundColor Yellow
    Write-Host "  .\make.ps1 test              Run unit tests" -ForegroundColor Green
    Write-Host "  .\make.ps1 lint              Run ESLint" -ForegroundColor Green
    Write-Host "  .\make.ps1 format            Format code with Prettier" -ForegroundColor Green
    Write-Host ""
    Write-Host "Docker - Production:" -ForegroundColor Yellow
    Write-Host "  .\make.ps1 docker-build      Build Docker image" -ForegroundColor Green
    Write-Host "  .\make.ps1 docker-run        Run production container (port 8080)" -ForegroundColor Green
    Write-Host "  .\make.ps1 docker-stop       Stop container" -ForegroundColor Green
    Write-Host "  .\make.ps1 docker-restart    Restart container" -ForegroundColor Green
    Write-Host "  .\make.ps1 docker-logs       View container logs" -ForegroundColor Green
    Write-Host "  .\make.ps1 docker-clean      Remove containers and images" -ForegroundColor Green
    Write-Host ""
    Write-Host "Docker - Development:" -ForegroundColor Yellow
    Write-Host "  .\make.ps1 docker-dev        Run development container (port 4200)" -ForegroundColor Green
    Write-Host "  .\make.ps1 docker-dev-stop   Stop development container" -ForegroundColor Green
    Write-Host ""
    Write-Host "Deployment:" -ForegroundColor Yellow
    Write-Host "  .\make.ps1 deploy            Full deployment pipeline" -ForegroundColor Green
    Write-Host "  .\make.ps1 quick-deploy      Quick build and run" -ForegroundColor Green
    Write-Host ""
    Write-Host "Cleanup:" -ForegroundColor Yellow
    Write-Host "  .\make.ps1 clean             Remove build artifacts and node_modules" -ForegroundColor Green
    Write-Host "  .\make.ps1 reset             Full reset (clean + install)" -ForegroundColor Green
    Write-Host ""
}

function Show-Info {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "                         Contact CRM Information                          " -ForegroundColor Cyan
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
    Write-Host "Project:          Contact CRM" -ForegroundColor Yellow
    Write-Host "Framework:        Angular 20" -ForegroundColor Yellow

    $nodeVersion = node --version 2>$null
    Write-Host "Node version:     $nodeVersion" -ForegroundColor Yellow

    $npmVersion = npm --version 2>$null
    Write-Host "NPM version:      $npmVersion" -ForegroundColor Yellow

    $dockerVersion = docker --version 2>$null
    if ($dockerVersion) {
        $dockerVersion = ($dockerVersion -split ' ')[2] -replace ',',''
        Write-Host "Docker version:   $dockerVersion" -ForegroundColor Yellow
    } else {
        Write-Host "Docker version:   Not installed" -ForegroundColor Yellow
    }

    Write-Host "Dev Port:         4200" -ForegroundColor Yellow
    Write-Host "Prod Port:        8080" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
}

switch ($Command) {
    "help" {
        Show-Help
    }
    "info" {
        Show-Info
    }
    "status" {
        Write-Host "Docker containers status:" -ForegroundColor Cyan
        docker ps -a --filter "name=contact-crm" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    }
    "install" {
        Write-Host "Installing dependencies..." -ForegroundColor Cyan
        npm install
        Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
    }
    "dev" {
        Write-Host "Starting development server..." -ForegroundColor Cyan
        npm start
    }
    "build" {
        Write-Host "Building application..." -ForegroundColor Cyan
        npm run build
        Write-Host "✓ Build completed successfully!" -ForegroundColor Green
    }
    "watch" {
        Write-Host "Starting watch mode..." -ForegroundColor Cyan
        npm run watch
    }
    "test" {
        Write-Host "Running unit tests..." -ForegroundColor Cyan
        npm test
    }
    "test-headless" {
        Write-Host "Running unit tests (headless)..." -ForegroundColor Cyan
        npm test -- --browsers=ChromeHeadless --watch=false
    }
    "lint" {
        Write-Host "Running linter..." -ForegroundColor Cyan
        npx eslint .
        Write-Host "✓ Linting completed!" -ForegroundColor Green
    }
    "format" {
        Write-Host "Formatting code..." -ForegroundColor Cyan
        npx prettier --write .
        Write-Host "✓ Code formatted successfully!" -ForegroundColor Green
    }
    "format-check" {
        Write-Host "Checking code formatting..." -ForegroundColor Cyan
        npx prettier --check .
    }
    "docker-build" {
        Write-Host "Building Docker image..." -ForegroundColor Cyan
        docker build -t contact-crm .
        Write-Host "✓ Docker image built successfully!" -ForegroundColor Green
    }
    "docker-run" {
        Write-Host "Starting Docker container..." -ForegroundColor Cyan
        docker-compose up -d contact-crm
        Write-Host "✓ Application is running at http://localhost:8080" -ForegroundColor Green
    }
    "docker-stop" {
        Write-Host "Stopping Docker container..." -ForegroundColor Cyan
        docker-compose down
        Write-Host "✓ Docker container stopped!" -ForegroundColor Green
    }
    "docker-restart" {
        Write-Host "Restarting Docker container..." -ForegroundColor Cyan
        docker-compose down
        docker-compose up -d contact-crm
        Write-Host "✓ Docker container restarted!" -ForegroundColor Green
    }
    "docker-logs" {
        Write-Host "Docker container logs:" -ForegroundColor Cyan
        docker-compose logs -f contact-crm
    }
    "docker-clean" {
        Write-Host "Cleaning Docker containers and images..." -ForegroundColor Red
        docker-compose down -v
        docker rmi contact-crm 2>$null
        Write-Host "✓ Docker cleanup completed!" -ForegroundColor Green
    }
    "docker-dev" {
        Write-Host "Starting Docker development container..." -ForegroundColor Cyan
        docker-compose --profile dev up -d contact-crm-dev
        Write-Host "✓ Development server is running at http://localhost:4200" -ForegroundColor Green
    }
    "docker-dev-stop" {
        Write-Host "Stopping Docker development container..." -ForegroundColor Cyan
        docker-compose --profile dev down
        Write-Host "✓ Development container stopped!" -ForegroundColor Green
    }
    "deploy" {
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
        Write-Host "Starting full deployment pipeline..." -ForegroundColor Cyan

        Write-Host "Step 1/4: Cleaning..." -ForegroundColor Yellow
        if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
        if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
        if (Test-Path ".angular") { Remove-Item -Recurse -Force ".angular" }

        Write-Host "Step 2/4: Installing dependencies..." -ForegroundColor Yellow
        npm install

        Write-Host "Step 3/4: Building application..." -ForegroundColor Yellow
        npm run build

        Write-Host "Step 4/4: Building Docker image..." -ForegroundColor Yellow
        docker build -t contact-crm .

        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
        Write-Host "✓ Deployment pipeline completed successfully!" -ForegroundColor Green
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "  1. Run '.\make.ps1 docker-run' to start the application" -ForegroundColor Cyan
        Write-Host "  2. Open http://localhost:8080 in your browser" -ForegroundColor Cyan
    }
    "quick-deploy" {
        Write-Host "Quick deployment..." -ForegroundColor Cyan
        docker build -t contact-crm .
        docker-compose up -d contact-crm
        Write-Host "✓ Quick deployment completed!" -ForegroundColor Green
        Write-Host "Application is running at http://localhost:8080" -ForegroundColor Yellow
    }
    "clean" {
        Write-Host "Cleaning build artifacts..." -ForegroundColor Red
        if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
        if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
        if (Test-Path ".angular") { Remove-Item -Recurse -Force ".angular" }
        Write-Host "✓ Cleanup completed!" -ForegroundColor Green
    }
    "clean-cache" {
        Write-Host "Cleaning npm cache..." -ForegroundColor Red
        npm cache clean --force
        Write-Host "✓ Cache cleaned!" -ForegroundColor Green
    }
    "reset" {
        Write-Host "Resetting project..." -ForegroundColor Cyan
        if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
        if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
        if (Test-Path ".angular") { Remove-Item -Recurse -Force ".angular" }
        npm install
        Write-Host "✓ Project reset completed!" -ForegroundColor Green
    }
    "start" {
        Write-Host "Starting Docker container..." -ForegroundColor Cyan
        docker-compose up -d contact-crm
        Write-Host "✓ Application is running at http://localhost:8080" -ForegroundColor Green
    }
    "stop" {
        Write-Host "Stopping Docker container..." -ForegroundColor Cyan
        docker-compose down
        Write-Host "✓ Docker container stopped!" -ForegroundColor Green
    }
    "restart" {
        Write-Host "Restarting Docker container..." -ForegroundColor Cyan
        docker-compose down
        docker-compose up -d contact-crm
        Write-Host "✓ Docker container restarted!" -ForegroundColor Green
    }
    "logs" {
        Write-Host "Docker container logs:" -ForegroundColor Cyan
        docker-compose logs -f contact-crm
    }
    default {
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Write-Host "Run '.\make.ps1 help' to see available commands" -ForegroundColor Yellow
    }
}
