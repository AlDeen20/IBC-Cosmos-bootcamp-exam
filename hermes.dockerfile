FROM rust:1.74.0-bookworm AS builder

RUN cargo install ibc-relayer-cli@1.7.3 --bin hermes --locked
RUN apt-get update
RUN apt-get install curl
RUN mkdir ~/.hermes
RUN curl https://gist.githubusercontent.com/rootulp/77afe5863ddd4c69269a2a24ed80e491/raw/b4109502e2b2b374458c5948cd882f8dca0c53ac/config.toml -o /root/.hermes/config.toml

FROM debian:bookworm

# Reference why this is needed:
# https://github.com/rust-lang/docker-rust/blob/master/1.74.0/bookworm/Dockerfile#L1
# https://hub.docker.com/layers/library/buildpack-deps/bookworm/images/sha256-c4da21269c82dae963c0c4b4957f726cf84a2ade4bd7a39e85470d2d48529aac?context=explore
RUN apt-get update; apt-get install -y --no-install-recommends ca-certificates ; rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/local/cargo/bin/hermes /usr/local/bin/hermes
RUN mkdir /root/.hermes
COPY --from=builder /root/.hermes/config.toml /root/.hermes/config.toml

ENTRYPOINT [ "hermes" ]