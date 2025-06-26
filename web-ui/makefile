namespace=ReactActionBiolerplate
Version=`git describe --tag  --abbrev=0`
build_time=`date +%FT%T%z`
commit_hash=`git rev-parse --short HEAD`
PORT = 5173
PID = $(shell lsof -t -i :$(PORT))


#biome 暂不支持 cssinjs
format-cssinjs:
	styled-formatter "src/**/**.jsx" --fix
format-json:
	json-sort src/**/*.json --insert-final-newline true --autofix

run-web:
	pnpm run dev

.PHONY: docker-run
runAtDocker:
	docker compose -f compose.yaml up -d --build --remove-orphans

biome:
	pnpm run biome

prune:
	pnpm prune

reinstall:
	@rm -rf pnpm-local.yaml
	@rm -rf node_modules
	pnpm install

stop:
	@if [ -n "$(PID)" ]; then \
		echo "Killing process with PID $(PID) that is using port $(PORT)..."; \
		kill -9 $(PID); \
	else \
		echo "No process found occupying port $(PORT)."; \
	fi


# base cli
formatSetup:
	pnpm add -g @tillig/json-sort-cli
	pnpm add  -g styled-formatter

.PHONY: preCommitSetup
preCommitSetup: uvSetup
	@pnpm install @biomejs/biome@1.9.4
	@uv venv
	@uv pip install pre-commit
	@pre-commit install

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
			exit 1; \
		fi; \
	fi