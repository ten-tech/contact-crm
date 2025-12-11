.PHONY: help install dev build test lint format clean docker-build docker-run docker-stop docker-dev docker-clean deploy

# Default target
.DEFAULT_GOAL := help

# Variables
DOCKER_IMAGE_NAME = contact-crm
DOCKER_CONTAINER_NAME = contact-crm
DOCKER_PORT = 8080
DEV_PORT = 4200

# Colors for output
CYAN = \033[0;36m
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

##@ General

help: ## Display this help message
	@echo "$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(CYAN)                     Contact CRM - Makefile Commands                      $(NC)"
	@echo "$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  $(GREEN)%-18s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(YELLOW)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""

##@ Development

install: ## Install dependencies
	@echo "$(CYAN)Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed successfully!$(NC)"

dev: ## Start development server
	@echo "$(CYAN)Starting development server...$(NC)"
	npm start

build: ## Build the application for production
	@echo "$(CYAN)Building application...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Build completed successfully!$(NC)"

watch: ## Build the application in watch mode
	@echo "$(CYAN)Starting watch mode...$(NC)"
	npm run watch

serve-prod: build ## Build and serve production build locally
	@echo "$(CYAN)Serving production build...$(NC)"
	npx http-server dist/contact-crm/browser -p 8080 -c-1

##@ Testing & Quality

test: ## Run unit tests
	@echo "$(CYAN)Running unit tests...$(NC)"
	npm test

test-headless: ## Run unit tests in headless mode
	@echo "$(CYAN)Running unit tests (headless)...$(NC)"
	npm test -- --browsers=ChromeHeadless --watch=false

lint: ## Run linter
	@echo "$(CYAN)Running linter...$(NC)"
	npx eslint .
	@echo "$(GREEN)✓ Linting completed!$(NC)"

format: ## Format code with Prettier
	@echo "$(CYAN)Formatting code...$(NC)"
	npx prettier --write .
	@echo "$(GREEN)✓ Code formatted successfully!$(NC)"

format-check: ## Check code formatting
	@echo "$(CYAN)Checking code formatting...$(NC)"
	npx prettier --check .

##@ Docker - Production

docker-build: ## Build Docker image
	@echo "$(CYAN)Building Docker image...$(NC)"
	docker build -t $(DOCKER_IMAGE_NAME) .
	@echo "$(GREEN)✓ Docker image built successfully!$(NC)"

docker-run: ## Run Docker container (production)
	@echo "$(CYAN)Starting Docker container...$(NC)"
	docker-compose up -d contact-crm
	@echo "$(GREEN)✓ Application is running at http://localhost:$(DOCKER_PORT)$(NC)"

docker-stop: ## Stop Docker container
	@echo "$(CYAN)Stopping Docker container...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Docker container stopped!$(NC)"

docker-logs: ## Show Docker container logs
	@echo "$(CYAN)Docker container logs:$(NC)"
	docker-compose logs -f contact-crm

docker-restart: docker-stop docker-run ## Restart Docker container

docker-clean: ## Remove Docker containers and images
	@echo "$(RED)Cleaning Docker containers and images...$(NC)"
	docker-compose down -v
	docker rmi $(DOCKER_IMAGE_NAME) 2>/dev/null || true
	@echo "$(GREEN)✓ Docker cleanup completed!$(NC)"

##@ Docker - Development

docker-dev: ## Run Docker container in development mode
	@echo "$(CYAN)Starting Docker development container...$(NC)"
	docker-compose --profile dev up -d contact-crm-dev
	@echo "$(GREEN)✓ Development server is running at http://localhost:$(DEV_PORT)$(NC)"

docker-dev-stop: ## Stop Docker development container
	@echo "$(CYAN)Stopping Docker development container...$(NC)"
	docker-compose --profile dev down
	@echo "$(GREEN)✓ Development container stopped!$(NC)"

docker-dev-logs: ## Show Docker development container logs
	@echo "$(CYAN)Docker development container logs:$(NC)"
	docker-compose --profile dev logs -f contact-crm-dev

##@ Deployment

deploy: clean install build docker-build ## Full deployment pipeline
	@echo "$(GREEN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(GREEN)✓ Deployment pipeline completed successfully!$(NC)"
	@echo "$(GREEN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(YELLOW)Next steps:$(NC)"
	@echo "  1. Run '$(CYAN)make docker-run$(NC)' to start the application"
	@echo "  2. Open http://localhost:$(DOCKER_PORT) in your browser"

quick-deploy: docker-build docker-run ## Quick deployment (build + run)
	@echo "$(GREEN)✓ Quick deployment completed!$(NC)"
	@echo "$(YELLOW)Application is running at http://localhost:$(DOCKER_PORT)$(NC)"

##@ Cleanup

clean: ## Clean build artifacts and dependencies
	@echo "$(RED)Cleaning build artifacts...$(NC)"
	rm -rf dist node_modules .angular
	@echo "$(GREEN)✓ Cleanup completed!$(NC)"

clean-cache: ## Clean npm cache
	@echo "$(RED)Cleaning npm cache...$(NC)"
	npm cache clean --force
	@echo "$(GREEN)✓ Cache cleaned!$(NC)"

reset: clean install ## Full reset (clean + install)
	@echo "$(GREEN)✓ Project reset completed!$(NC)"

##@ Information

info: ## Display project information
	@echo "$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(CYAN)                         Contact CRM Information                          $(NC)"
	@echo "$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"
	@echo "$(YELLOW)Project:$(NC)          Contact CRM"
	@echo "$(YELLOW)Framework:$(NC)        Angular 20"
	@echo "$(YELLOW)Node version:$(NC)     $(shell node --version 2>/dev/null || echo 'Not installed')"
	@echo "$(YELLOW)NPM version:$(NC)      $(shell npm --version 2>/dev/null || echo 'Not installed')"
	@echo "$(YELLOW)Docker version:$(NC)   $(shell docker --version 2>/dev/null | cut -d' ' -f3 | cut -d',' -f1 || echo 'Not installed')"
	@echo "$(YELLOW)Dev Port:$(NC)         $(DEV_PORT)"
	@echo "$(YELLOW)Prod Port:$(NC)        $(DOCKER_PORT)"
	@echo "$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(NC)"

status: ## Show running Docker containers
	@echo "$(CYAN)Docker containers status:$(NC)"
	@docker ps -a --filter "name=contact-crm" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" || echo "No containers found"

##@ Quick Actions

start: docker-run ## Quick start (alias for docker-run)

stop: docker-stop ## Quick stop (alias for docker-stop)

restart: docker-restart ## Quick restart (alias for docker-restart)

logs: docker-logs ## Quick logs (alias for docker-logs)
