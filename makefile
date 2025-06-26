namespace=McDonald
build_time=`date +%FT%T%z`
commit_hash=`git rev-parse --short HEAD`

run-mcdonald:
	cd ./api/mcdonald && \
	go mod tidy && \
	go run ./src/cmd/main.go  -p  8080

run-mcdonald-web:
	$(MAKE) -C web-ui run-web

linter:
	@golangci-lint run -c .golangci.yaml  --allow-parallel-runners --fix \
	api/mcdonald/...
	goimports -l -w .

swag-mcdonald:
	swag init --dir api/mcdonald --parseDependency --parseInternal -g src/cmd/main.go
	docker stop mcdonald-swagger-service &>/dev/null || true
	docker rm mcdonald-swagger-service &>/dev/null || true
	docker run -d \
		-p "8888:8080" \
		-e SWAGGER_JSON=/opt/swagger/swagger.yaml \
		-v ./docs:/opt/swagger \
		--name mcdonald-swagger-service \
		swaggerapi/swagger-ui:latest
uvSetup:
	@if uv --version &> /dev/null; then \
		echo "uv is already installed."; \
	else \
		echo "uv not found. Installing..."; \
		export https_proxy="http://127.0.0.1:7890" http_proxy="http://127.0.0.1:7890" all_proxy="socks5://127.0.0.1:7890"; \
		curl -LsSf https://astral.sh/uv/install.sh | sh; \
		if uv --version &> /dev/null; then \
			echo "uv installed successfully."; \
		else \
			echo "Failed to install uv."; \
			 1; \
		fi; \
	fi

preCommitSetup: uvSetup
	@echo "Installing pre-commit hooks and tools..."
	chmod +x check-semver.sh
	@go install github.com/golangci/golangci-lint/v2/cmd/golangci-lint@v2.0.2
	@go install golang.org/x/tools/cmd/goimports@latest
	@go install github.com/swaggo/swag/cmd/swag@latest
	@go install github.com/google/yamlfmt/cmd/yamlfmt@latest
	@uv venv
	@uv pip install pre-commit
	@pre-commit clean
	@pre-commit install --hook-type pre-commit --hook-type pre-push
	@uv tool install commitizen
	@echo "Pre-commit setup completed."
	@pnpm install @biomejs/biome@1.9.4
