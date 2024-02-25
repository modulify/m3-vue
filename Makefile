TARGET_HEADER=@echo -e '===== \e[34m' $@ '\e[0m'
YARN=@docker-compose run --rm node yarn

.PHONY: .yarnrc.yml
.yarnrc.yml: ## Creates yarn configuration
	@cp .yarnrc.yml.dist .yarnrc.yml

.PHONY: .pnp.cjs
.pnp.cjs: package.json yarn.lock ## Installs dependencies
	$(TARGET_HEADER)
	$(YARN) install
	@touch .pnp.cjs || true

.PHONY: build
build: .pnp.cjs ## Creates a dist catalogue with library build
	$(TARGET_HEADER)
	$(YARN) build

.PHONY: husky
husky: .pnp.cjs ## Adds husky git hooks with commit content checks
	@docker-compose run --rm node npx husky init

.PHONY: eslint
eslint: .pnp.cjs ## Runs eslint
	$(TARGET_HEADER)
	$(YARN) lint

.PHONY: test
test: .pnp.cjs ## Runs autotests
	$(TARGET_HEADER)
	$(YARN) test

.PHONY: test-coverage
test-coverage: .pnp.cjs ## Runs autotests with --coverage
	$(TARGET_HEADER)
ifdef reporter
	$(YARN) test --coverage --coverageReporters=$(reporter)
else
	$(YARN) test --coverage --coverageReporters=text
endif

.PHONY: release
release: ## Bumps version and creates tag
	$(TARGET_HEADER)
ifdef as
	$(YARN) release:$(as)
else
	$(YARN) release
endif

.PHONY: help
help: ## Calls recipes list
	@cat $(MAKEFILE_LIST) | grep -e "^[-a-zA-Z_\.]*: *.*## *" | awk '\
            BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Colors
$(call computable,CC_BLACK,$(shell tput -Txterm setaf 0 2>/dev/null))
$(call computable,CC_RED,$(shell tput -Txterm setaf 1 2>/dev/null))
$(call computable,CC_GREEN,$(shell tput -Txterm setaf 2 2>/dev/null))
$(call computable,CC_YELLOW,$(shell tput -Txterm setaf 3 2>/dev/null))
$(call computable,CC_BLUE,$(shell tput -Txterm setaf 4 2>/dev/null))
$(call computable,CC_MAGENTA,$(shell tput -Txterm setaf 5 2>/dev/null))
$(call computable,CC_CYAN,$(shell tput -Txterm setaf 6 2>/dev/null))
$(call computable,CC_WHITE,$(shell tput -Txterm setaf 7 2>/dev/null))
$(call computable,CC_END,$(shell tput -Txterm sgr0 2>/dev/null))