ARG NODE_MAJOR_VERSION="14"

FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${NODE_MAJOR_VERSION}

ARG BENTHOS_VERSION
ARG BENTHOS_SRC="https://github.com/jeffail/benthos/releases/download"

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
