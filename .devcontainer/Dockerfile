ARG VARIANT="16"

FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

ARG BENTHOS_VERSION="4.1.0"
ARG BENTHOS_SRC="https://github.com/benthosdev/benthos/releases/download"

RUN mkdir -p tmp/benthos \
 && benthos_url="${BENTHOS_SRC}/v${BENTHOS_VERSION}" \
 && benthos_archive="benthos_${BENTHOS_VERSION}_linux_amd64.tar.gz" \
 && curl -fsSL --create-dirs -o "tmp/benthos/${benthos_archive}" \
      "${benthos_url}/${benthos_archive}" \
 && curl -fsSL -o tmp/benthos/benthos_checksums.txt \
      "${benthos_url}/benthos_${BENTHOS_VERSION}_checksums.txt" \
 && cd tmp/benthos \
 && ls \
 && sha256sum --strict --ignore-missing --check benthos_checksums.txt \
 && tar -xzf "${benthos_archive}" \
 && mkdir -p bin \
 && mv benthos /usr/local/bin \
 && rm -rf tmp/benthos

USER node
WORKDIR /home/node

RUN mkdir -p .config/git \
 && echo ".vscode/*" >> .config/git/ignore \
 && echo "*.code-workspace" >> .config/git/ignore \
 && echo ".history/" >> .config/git/ignore
